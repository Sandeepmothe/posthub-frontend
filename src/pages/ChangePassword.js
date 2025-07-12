import axios from 'axios';
import React, { useState } from 'react'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = () => {
        axios.put('http://localhost:3001/auth/changepassword',
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then((Response)=>{
            if(Response.data.error){
                alert(Response.data.error);
            }
        });
    };

    return (
        <div>
            <h1>Change Password</h1>
            <input placeholder='Old Password....' onChange={(e) => {
                setOldPassword(e.target.value);
            }} />
            <input placeholder='New Password....' onChange={(e) => {
                setNewPassword(e.target.value);
            }} />
            <button onClick={changePassword}> Save Changes </button>
        </div>
    )
}

export default ChangePassword