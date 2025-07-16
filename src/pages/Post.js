import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
    const API_URL = process.env.REACT_APP_API_URL;
    let { ID } = useParams();
    let navigate = useNavigate();

    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${API_URL}/posts/byId/${ID}`).then((response) => {
            // console.log(response.data);
            setPostObject(response.data);
        });

        axios.get(`${API_URL}/comments/${ID}`).then((response) => {
            // console.log(response.data);
            setComments(response.data);
        });

    }, [API_URL,ID]);

    const addComment = () => {
        axios.post(`${API_URL}/comments`, {
            commentBody: newComment,
            PostId: ID,
        },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        )
            .then((response) => {
                if (response.data.error) {
                    alert("Must Login.");
                } else {
                    const commentToAdd = { commentBody: newComment, username: response.data.username };
                    setComments([...comments, commentToAdd]);
                    setNewComment("")
                }

            });
    };

    const deleteComment = (id) => {
        axios.delete(`${API_URL}/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },

        }).then(() => {
            setComments(
                comments.filter((val) => {
                    return val.id != id;
                })
            );
        })
    }

    const deletePost = (id) => {
        axios.delete(`${API_URL}/posts/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },

        }).then(() => {
            alert("Post deleted Successfully.")
            navigate('/');
        })
    }

    const editPost = (option) => {
        if(option === 'title' ){
            let newTitle = prompt("Enter New Title:");
            axios.put(`${API_URL}/posts/title`, {
                newTitle: newTitle, 
                id: ID,
            },
            {
            headers: { accessToken: localStorage.getItem("accessToken") },
            })
            setPostObject({...postObject, title: newTitle})
        }else{
            let newText = prompt("Enter New postText:");
            axios.put(`${API_URL}/posts/postText`, {
                newText: newText, 
                id: ID,
            },
            {
            headers: { accessToken: localStorage.getItem("accessToken") },
            })
            setPostObject({...postObject, postText: newText})
        }
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className="post" id='individual'>
                    <div className='title' onClick={()=> {
                        if(authState.username === postObject.username){
                        editPost('title');
                        }
                    }}>{postObject.title}</div>
                    <div className='body' onClick={()=> {
                        if(authState.username === postObject.username){
                        editPost('TextPost');
                        }
                    }}>{postObject.postText}</div>
                    <div className='footer'>
                        {postObject.username}
                        {authState.username===postObject.username && 
                        <button onClick={() => {deletePost(postObject.id)}}>Delete Post</button>}
                        </div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type='text' placeholder='Comment...' autoComplete='off' value={newComment} onChange={(e) => { setNewComment(e.target.value) }} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                {comment.commentBody}
                                <label> Username: {comment.username}</label>
                                {authState.username === comment.username && (
                                    <button onClick={() =>{deleteComment(comment.id)}}>
                                        X
                                    </button>
                                )}
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post