import { useEffect, useState, useRef } from 'react';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
const CharList = (props) => {

    const [chars, setChars] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const {loading,error,getAllCharacters} = useMarvelService()


    useEffect(() => {
        onRequest(offset,true)
    }, [])

    const onRequest = (offset,initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }

    const onCharsLoaded = (newChars) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true
        }
        setChars(chars => [...chars, ...newChars])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)

    }



    const itemsRefs = useRef([]);



    const focusOnItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');

    }
    function renderCharacters(chars) {



        const items = chars.map((el, i) => {
            let imgStyle = { 'objectFit': 'cover' }
            if (el.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }


            return (
                <li tabIndex={0}
                    ref={el => itemsRefs.current[i] = el}
                    key={el.id}
                    onClick={() => {
                        props.onCharSelected(el.id)
                        focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            props.onCharSelected(el.id)
                            focusOnItem(i)
                        }
                    }}
                    className="char__item" >

                    <img style={imgStyle}
                        src={el.thumbnail}
                        alt={el.name} />

                    <div className="char__name">
                        {el.name}
                    </div>
                </li>

            )
        })
        return items
    }





    const items = renderCharacters(chars)


    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading && !newItemLoading ? <Spinner /> : null
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}

            <ul className="char__grid">
                {items}

            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ display: charEnded ? 'none' : 'block' }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}


export default CharList;