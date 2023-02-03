import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './singleComic.scss'
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Helmet } from 'react-helmet';
const SingleComicPage = (props) => {
    const { type } = props
    console.log(type)
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService()
    const { id } = useParams()
    console.log(id)
    const [item, setItem] = useState()

    const updateData = () => {
        clearError()
        switch (type) {
            case 'comic':
                getComic(id)
                    .then(res => setItem(res))
                break
            case 'character':
                getCharacter(id)
                    .then(res => setItem(res))
                break
        }

    }


    useEffect(() => {
        updateData()

    }, [id])

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !item) ? <View props={item} type={type} /> : null;
    return (
        <div className="single-comic">
             
            {errorMessage}
            {spinner}
            {content}

        </div>
    )
}



const View = ({ props ,type  }) => {

    const { title, name,description, homepage, pageCount, thumbnail, language, price } = props;

    return (
        <div className="single-comic">
               <Helmet>
            <meta name="description" 
            content="Page with our comics"/>
            <title>{type === 'comic' ? title : name}</title>
        </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title ? title : name}</h2>

                <p className="single-comic__descr">{description}</p>

                {homepage ? <a className='button button__main' style={{ "marginTop": "30px" }} href={homepage}>
                    <div className='inner'>HOMEPAGE</div>
                    </a> :
                    <p className="single-comic__descr">{pageCount}</p>}

                {language ? <p className="single-comic__descr">Language: {language}</p> : null}
                 
                <div className="single-comic__price">{price}</div>
            </div>
            {type === 'comic' ? <Link to="/comics" className="single-comic__back">Back to all</Link> :
            <Link to='/' className="single-comic__back">Back to all</Link>}
        </div>
    )
}
export default SingleComicPage;