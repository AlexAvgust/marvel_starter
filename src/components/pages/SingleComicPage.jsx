import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './singleComic.scss'
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComicPage = () => {
    const { loading, error, getComic, clearError } = useMarvelService()
    const { comicId } = useParams()
    const [item, setItem] = useState()

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(res => setItem(res))
    }
    const onComicLoaded = (arr) => {
        setItem(arr)
    }


    useEffect(() => {
        updateComic()

    }, [comicId])

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !item) ? <View comic={item}/> : null;
    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}

        </div>
    )
}
const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}
export default SingleComicPage;