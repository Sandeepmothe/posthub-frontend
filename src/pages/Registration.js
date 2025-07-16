import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const API_URL = process.env.REACT_APP_API_URL;
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    let navigate = useNavigate()

    const onSubmit = data => axios.post(`${API_URL}/auth`, data).then(()=>{
        navigate('/login')
    });


    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>User Name</label>
                    <ErrorMessage name='username' component="span" />
                    <Field
                        autoComplete="off"
                        className="inputCreatePost"
                        name="username"
                        placeholder="Username.."
                    />
                    <label>Password</label>
                    <ErrorMessage name='postText' component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        className="inputCreatePost"
                        name="password"
                        placeholder="Enter Password..."
                    />
                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration