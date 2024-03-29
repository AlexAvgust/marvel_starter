import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FindChar from "../findChar/FindChar";
import { Helmet } from "react-helmet";
const MainPage = () => {

    const [selectedChar, setSlectedChar] = useState(null)

    const onCharSelected = (id) => {
        setSlectedChar(id)
    }
    
    return (
        <>
        <Helmet>
            <meta name="description" />
            <title>Marvel information</title>
        </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content"> 
           
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
           <div>

                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <FindChar/>
                </ErrorBoundary>
           </div>
               
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage