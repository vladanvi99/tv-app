import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { API } from '../../config';
import BannerBg from '../../images/bannerBg.jpg';
import { userUpdate } from '../../redux/actions/user';

const ProfilePage = () => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userSignInInfo = useSelector(state => state.userSignIn);
    const {userInfo, error} = userSignInInfo;
    const userUpdateInfo = useSelector(state => state.userUpdate);
    const {success} = userUpdateInfo;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(userInfo)
        if(!userInfo && !success) {
            navigate('/');
        } else {
            if(userInfo) {
                setImage(userInfo.user.image)
                setName(userInfo.user.name)
                setEmail(userInfo.user.email)
            }
        }
    }, [userInfo, success])
    const onUpdate = (e) => {
        e.preventDefault();
        dispatch(userUpdate(name, email, password, image, userInfo.token, userInfo.user._id))
    }
    const onUploadFile = async (e) => {
        const file = await e.target.files[0];
        const bodyData = new FormData();
        bodyData.append('image', file);
        fetch(`${API}/api/uploads`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
            body: bodyData
        })
        .then(response => response.text())
        .then(data => {
            setImage(data);
        })
    }
    return (
        <div className="form-holder" style={{backgroundImage: `url(${BannerBg})`}}>
            <div className="overlay"></div>
            <div className="form-elements">
                <h2>Update</h2>
                <form onSubmit={onUpdate}>
                    <div className="input-wrap">
                        <input className="profile-img-input" type="file" onChange={onUploadFile} />
                        <p>Choose profile image</p>
                    </div>
                    <div className="input-wrap">
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="input-wrap">
                        <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="input-wrap">
                        <input type="password" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="sumbit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage;
