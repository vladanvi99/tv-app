import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BannerBg from '../../images/bannerBg.jpg';
import { userSignIn, userSignUp } from '../../redux/actions/user';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const onSignUp = (e) => {
        e.preventDefault();
        dispatch(userSignUp(name, email, password));
    }
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo} = userSignInInfo;
    const userSignUpInfo = useSelector(state => state.userSignUp);
    const {error, success} = userSignUpInfo;
    const navigate = useNavigate();
    useEffect(() => {
        if(userInfo) {
            navigate('/');
        }
        if(success && !userInfo) {
            dispatch(userSignIn(email, password));
        }
    }, [userInfo, success])
    return (
        <div className="form-holder" style={{backgroundImage: `url(${BannerBg})`}}>
            <div className="overlay"></div>
            <div className="form-elements">
                <h2>Sign Up</h2>
                {error &&
                    <div className='error-message'>
                        {error}
                    </div>
                }
                <form onSubmit={onSignUp}>
                <div className="input-wrap">
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="input-wrap">
                        <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="input-wrap">
                        <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="sumbit">Sign Up</button>
                </form>
                <div className="form-redirect">
                    Already on App?{' '}
                    <Link to="/signin">Go to sign in page</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;
