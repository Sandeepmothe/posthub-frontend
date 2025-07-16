import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext';



function Profile() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`${API_URL}/posts/byuserId/${id}`).then((response) => {
            setListOfPosts(response.data);

        });
    }, [API_URL,id])
    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1> Username : {username}</h1>
                {authState.username === username && (
                    <button onClick={() => { navigate('/changepassword') }}>Change My Password</button>)}
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                    return (
                        <div className='post' key={key} >
                            <div className='title'>{value.title}</div>
                            <div className='body' onClick={() => navigate(`/post/${value.id}`)}>{value.postText}</div>
                            <div className='footer'>
                                <div className='username'>{value.username}</div>
                                <div className='buttons'>

                                    <label> {value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile