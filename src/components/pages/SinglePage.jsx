import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './singleComic.scss'
import useMarvelService from '../../services/MarvelService';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleComicPage = (props) => {
    const { type } = props
    const { getComic, getCharacter, clearError, process, setProcess } = useMarvelService()
    const { id } = useParams()
    const [item, setItem] = useState()

    const updateData = () => {
        clearError()
        switch (type) {
            case 'comic':
                getComic(id)
                    .then(res => setItem(res))
                    .then(() => setProcess('confirmed'))
                break
            case 'character':
                getCharacter(id)
                    .then(res => setItem(res))
                    .then(() => setProcess('confirmed'))
                break
        }

    }

    useEffect(() => {
        updateData()

    }, [id])

    return (
        <div className="single-comic">
            {setContent(process, View, item, type)}

        </div>
    )
}

const View = ({ data, type }) => {
    const { title, name, description, homepage, pageCount, thumbnail, language, price } = data;

    return (
        <div className="single-comic">
            
            <Helmet>
                <meta name="description"
                    content="Page with our comics" />
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

                {language ? <p className="single-comic__de scr">Language: {language}</p> : null}

                <div className="single-comic__price">{price}</div>
            </div>
            {type === 'comic' ? <Link to="/comics" className="single-comic__back">Back to all</Link> :
                <Link to='/' className="single-comic__back">Back to all</Link>}
        </div>
    )
}
export default SingleComicPage;