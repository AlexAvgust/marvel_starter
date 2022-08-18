import React, { Component } from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
class CharList extends Component {


    marvelService = new MarvelService()
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }
    onCharsLoaded = (newChars) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true
        }


        this.setState(({ offset, chars }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))

    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }


    itemsRefs = [];

    myRef = (ref) => {

        this.itemsRefs.push(ref)
    }

    focusOnItem = (id) => {
        this.itemsRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemsRefs[id].classList.add('char__item_selected');

    }
    renderCharacters = ({ chars }) => {



        const items = chars.map((el, i) => {
            let imgStyle = { 'objectFit': 'cover' }
            if (el.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }


            return (
                <li tabIndex={0}
                    ref={this.myRef}
                    key={el.id}
                    onClick={() => {
                        this.props.onCharSelected(el.id)
                        this.focusOnItem(i)
                    }}
                    onKeyPress={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            this.props.onCharSelected(el.id)
                            this.focusOnItem(i)
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



    render() {
        const { chars, loading, error, newItemLoading, offset, charEnded } = this.state
        const items = this.renderCharacters({ chars })


        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? items : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}

                <ul className="char__grid">
                    {content}

                </ul>
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ display: charEnded ? 'none' : 'block' }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;