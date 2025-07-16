import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';


function CreatePost() {
    const API_URL = process.env.REACT_APP_API_URL;

    const initialValues = {
        title: "",
        postText: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    })

    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/login');
        }
    })

    const onSubmit = (data) => {
        axios.post(`${API_URL}/posts`, data, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            navigate('/')
        });
    };
    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Title</label>
                    <ErrorMessage name='title' component="span" />
                    <Field
                        autoComplete="off"
                        className="inputCreatePost"
                        name="title"
                        placeholder="Enter Title"
                    />
                    <label>Post</label>
                    <ErrorMessage name='postText' component="span" />
                    <Field
                        autoComplete="off"
                        className="inputCreatePost"
                        name="postText"
                        placeholder="Post..."
                    />
                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost