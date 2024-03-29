import { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';
const Page404 = lazy(() => import('../pages/Page404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SinglePage = lazy(() => import('../pages/SinglePage'))
const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader />
                <Suspense fallback={<Spinner />}>

                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path='comics/:id' element={<SinglePage  type='comic' />}  />
                        <Route path='characters/:id' element={<SinglePage type='character' />}  />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}


export default App;