import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import MoviePage from './components/MoviePage/MoviePage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import MyMoviesList from './components/MyMoviesList/MyMoviesList';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SearchPage from './components/SearchPage/SearchPage';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import './css/index.scss';

const App = () => {
    return (
        <div className="app-wrap">
            <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/type/:type" element={<MoviesPage />} />
                    <Route path="/search/:type/:by" element={<SearchPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/details/:type/:movieId" element={<MoviePage />} />
                    <Route path="/my-list" element={<MyMoviesList />} />
                    <Route path="*" element={<Navigate to ="/" />} />
                </Routes>
            </main>
            <Footer />
            </Router>
        </div>
    )
}

export default App;
