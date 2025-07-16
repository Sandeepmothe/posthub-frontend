import React, { useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';



function Login() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } =useContext(AuthContext);

    let navigate = useNavigate()

    const login = ()=>{
        const data = { username: username, password: password };
        axios.post(`${API_URL}/auth/login`, data).then((response)=>{
            if (response.data.error) {
                alert(response.data.error);
            }else{
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({username: response.data.username, id: response.data.id, status: true})
                navigate('/');
            }
            
        });
    };

  return (
    <div className='loginContainer'>
        <label>User Name</label>
        <input type='text' placeholder='Enter User Name' onChange={(event)=>{
            setUsername(event.target.value);
        }}/> 
        <label>Password</label>
        <input type='password' placeholder='Enter Password' onChange={(event)=>{
            setPassword(event.target.value);
        }}/> 
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login