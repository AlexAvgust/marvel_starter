import { useEffect, useState, useRef, useMemo } from 'react';
// import setContent from '../../utils/setContent'
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const setContent = (process,Component,newItemLoading) => {
    switch(process) {
    case 'waiting': 
        return <Spinner/>
    case 'loading': 
        return newItemLoading ? <Component /> : <Spinner/>
    case 'confirmed':
        return <Component />
    case 'error' :
        return <ErrorMessage/>
    default:
        throw new Error('Unexpected process state')

    }
}
const CharList = (props) => {

    const [chars, setChars] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const { getAllCharacters, process, setProcess } = useMarvelService()


    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharsLoaded = (newChars) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true
        }
        setChars([...chars, ...newChars])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setCharEnded(ended)

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
                <CSSTransition key={el.id} timeout={500} classNames="char__item">
                    <li className="char__item"
                        tabIndex={0}
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
                    >

                        <img style={imgStyle}
                            src={el.thumbnail}
                            alt={el.name} />

                        <div className="char__name">
                            {el.name}
                        </div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <div className="char__list">
                <ul className="char__grid">
                    <TransitionGroup component={null}>
                        {items}
                    </TransitionGroup>


                </ul>

            </div>

        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderCharacters(chars), newItemLoading)
    }, [process])


    return (
        <div className="char__list">
            {elements}
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