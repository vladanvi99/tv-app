import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../config';
import { USER_SIGN_OUT } from '../../redux/constants/user';
import './css/header.scss';

const Header = () => {
    const [myListDr, setMyListDr] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo} = userSignInInfo;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSignOut = () => {
        dispatch({type: USER_SIGN_OUT});
        localStorage.removeItem("userInfo");
        navigate('/');
    }
    return (
        <header>
            <Link to="/" className="app-logo">
                TV MOKA
            </Link>
            <nav className={`${openMenu ? 'nav-menu-open' : ''}`}>
                <ul className="nav-start">
                    <li>
                        <Link onClick={() => setOpenMenu(false)} to="/">Home</Link>
                    </li>
                    <li>
                        <Link onClick={() => setOpenMenu(false)} to="/type/movie">Movies</Link>
                    </li>
                    <li>
                        <Link onClick={() => setOpenMenu(false)} to="/type/tv">TV Shows</Link>
                    </li>
                    {userInfo && 
                        <li>
                            <Link onClick={() => setOpenMenu(false)} to="/my-list">My List</Link>
                        </li>
                    }
                </ul>
                <ul className="nav-end">
                    {userInfo &&
                        <li onClick={() => setMyListDr(!myListDr)} className={`dropdown-menu ${myListDr ? 'open-dropdown' : ''}`}>
                            <Link className="tab-down" to="#">
                                {userInfo.user.name}
                                <i className="fas fa-chevron-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/profile">My Profile</Link>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        setOpenMenu(false);
                                        onSignOut();
                                        }} className="sign-out-btn" type="button">Sign Out</button>
                                </li>
                            </ul>
                        </li>
                    }
                    {userInfo &&
                        <li>
                            <Link onClick={() => setOpenMenu(false)} to="/profile" className="profile-img">
                                {
                                    userInfo.user.image !== "" &&
                                    <img src={`${API}${userInfo.user.image}`} alt="profile" />
                                }
                            </Link>
                        </li>
                    }
                    {!userInfo && 
                        <li>
                            <Link onClick={() => setOpenMenu(false)} to="/signin" className="sign-in-btn">
                                Sign In
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
            {
                openMenu ? (
                    <button onClick={() => setOpenMenu(false)} className="nav-menu-btn">
                        <i className="fas fa-times"></i>
                    </button>
                ) : (
                    <button onClick={() => setOpenMenu(true)} className="nav-menu-btn">
                        <i className="fas fa-bars"></i>
                    </button>
                )
            }
        </header>
    )
}

export default Header;
