import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BannerBg from '../../images/bannerBg.jpg';
import { userSignIn } from '../../redux/actions/user';


const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo, error} = userSignInInfo;
    const navigate = useNavigate();
    const onSignIn = (e) => {
        e.preventDefault();
        dispatch(userSignIn(email, password));
    }
    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
    }, [userInfo])
    return (
        <div className="form-holder" style={{backgroundImage: `url(${BannerBg})`}}>
            <div className="overlay"></div>
            <div className="form-elements">
                <h2>Sign In</h2>
                {error &&
                    <div className='error-message'>
                        {error}
                    </div>
                }
                <form onSubmit={onSignIn}>
                    <div className="input-wrap">
                        <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="input-wrap">
                        <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="sumbit">Sign In</button>
                </form>
                <div className="form-redirect">
                    New on App?{' '}
                    <Link to="/signup">Go to sign up page</Link>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;
