import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMoviesBy } from '../../helpers';
import { getMoviesGenres } from '../../redux/actions/genres';
import { MOVIES_GENRES_RESET } from '../../redux/constants/genres';
import './css/movieList.scss';
import MovieItem from './MovieItem/MovieItem';

const MovieList = ({moviesData, page, type, by}) => {
    const [openGenres, setOpenGenres] = useState(false);
    const [openImportant, setOpenImportant] = useState(false);
    const dispatch = useDispatch();
    const getMoviesGenresData = useSelector(state => state.getMoviesGenres)
    const {moviesGenresData} = getMoviesGenresData;
    useEffect(() => {
        dispatch({type: MOVIES_GENRES_RESET});
    }, [type]);
    useEffect(() => {
        setOpenGenres(false);
        setOpenImportant(false);
        if(!moviesGenresData) {
            dispatch(getMoviesGenres({type}));
        }
    }, [moviesGenresData]);
    const searchInfo = (by) => {
        switch(by) {
            case 'top_rated':
                return 'Top Rated';
                break;
            case 'popular':
                return 'Popular';
                break;
            case 'upcoming':
            case 'on_the_air':
                return 'Upcoming';
                break;
            case setMoviesBy(by):
                return moviesGenresData && moviesGenresData.genres.filter((genre) => genre.id == by)[0].name;
            default:
                return 'top_rated'
        }
    }
    return (
        <div className="movie-list-holder">
            <div className="search-info">
            <div className="genres-search-holder">
                    <h3>Search By:</h3>
                    <div className="buttons-search-wrap">
                        <div className="genres-items-holder">
                            <button type="button" onClick={() => {
                                setOpenImportant(!openImportant);
                                setOpenGenres(false);
                            }}>
                                Important <i className="fas fa-chevron-down"></i>
                            </button>
                            <ul className="genres-items" style={{display: `${openImportant ? 'block' : 'none'}`}}>
                                <li key="top_rated">
                                    <Link to={`/search/${type}/top_rated?page=1`}>Top Rated</Link>
                                </li>
                                <li key="popular">
                                    <Link to={`/search/${type}/popular?page=1`}>Popular</Link>
                                </li>
                                <li key="upcoming">
                                    <Link to={`/search/${type}/${by === 'tv' ? 'on_the_air' : 'upcoming'}?page=1`}>Upcoming</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="genres-items-holder">
                            <button type="button" onClick={() => {
                                setOpenGenres(!openGenres);
                                setOpenImportant(false);
                            }}>
                                Genres <i className="fas fa-chevron-down"></i>
                            </button>
                            <ul className="genres-items" style={{display: `${openGenres ? 'block' : 'none'}`}}>
                                {
                                    moviesGenresData && (
                                        moviesGenresData.genres.map((genre) => (
                                            <li key={genre.id}>
                                                <Link to={`/search/${type}/${genre.id}?page=1`}>{genre.name}</Link>
                                            </li>
                                        ))
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <h3>
                    {searchInfo(by)}
                </h3>
            </div>
            <div className="list-wrap">
            {moviesData && (
                moviesData.results.map((movie) => (
                    <MovieItem type={type} movie={movie} key={movie.id} />
                ))
            )}
            </div>
            <div className="pagination-holder">
                { moviesData &&
                    <Link className={`pagination-num ${page == 1 ? 'disable' : ''}`} to={`/search/${type}/${setMoviesBy(by)}?page=${1}`}>
                        <i className="fas fa-chevron-left"></i>
                    </Link>
                }
                {
                    moviesData && (
                        [...Array(moviesData.total_pages).keys()].map((num, index) => {
                            if(num + 1 === 1) {
                                return (
                                    <Link key={num} className={`pagination-num ${page == num + 1 ? 'active' : ''}`} to={`/search/${type}/${setMoviesBy(by)}?page=${num + 1}`}>
                                        {num + 1}
                                    </Link>
                                )
                            } else if(num + 1 === moviesData.total_pages) {
                                return (
                                    <Link key={num} className={`pagination-num ${page == num + 1 ? 'active' : ''}`} to={`/search/${type}/${setMoviesBy(by)}?page=${num + 1}`}>
                                        {num + 1}
                                    </Link>
                                )
                            } else if ((num + 1 >= Number(page)) && (num + 1 <= Number(page) + 2)) {
                                return (
                                    <Link key={num} className={`pagination-num ${page == num + 1 ? 'active' : ''}`} to={`/search/${type}/${setMoviesBy(by)}?page=${num + 1}`}>
                                        {num + 1}
                                    </Link>
                                )
                            } else if ((num + 1 <= Number(page)) && (num + 1 >= Number(page) - 2)) {
                                return (
                                    <Link key={num} className={`pagination-num ${page == num + 1 ? 'active' : ''}`} to={`/search/${type}/${setMoviesBy(by)}?page=${num + 1}`}>
                                        {num + 1}
                                    </Link>
                                )
                            }
                        })
                    )
                }
                {
                    moviesData &&
                    <Link className={`pagination-num ${page == moviesData.total_pages ? 'disable' : ''}`} to={`/search/${type}/${setMoviesBy(by)}?page=${moviesData.total_pages}`}>
                        <i className="fas fa-chevron-right"></i>
                    </Link>
                }
            </div>
        </div>
    )
}

export default MovieList;
