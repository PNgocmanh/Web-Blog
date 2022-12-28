import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createComment } from "../../redux/apiComment";
import Swal from 'sweetalert2'; 
import AxiosInstance from "../../redux/AxiosInstance";
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import { Typography } from "@mui/material";

function Comment (){
    const user = useSelector((state) => state.auth.getUser.userLogin);
    const slug = useParams();
    const [commentList, setCommentList] = useState('');
    const [comment, setComment] = useState('');
    const [reload, setReload] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();  

    const handleComment = async (e) => {
        e.preventDefault();
        const newComment =  {
            "body": comment,
            "username": user.username,
            "bio": user.bio,
            "image": user.image,
            "following": user.following
        }
        createComment(newComment, slug.slug, dispatch, navigate);
        setReload(true);
    }

    const handleDeleteComment = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await AxiosInstance.delete(`/articles/${slug.slug}/comments/${id}`);
                    setReload(true);
                    Swal.fire(
                        'Deleted!',
                        'Your comment has been deleted.',
                        'success'
                    )
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.msg,
                        allowOutsideClick: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    })
                }
            }
        })
    }

    useEffect(() => {
        async function getComment (){
            const res = await AxiosInstance.get(`/articles/${slug.slug}/comments`);
            setCommentList(res.data);
            setReload(false);
            setComment('');
        }
        
        getComment();

    }, [reload, slug.slug]);

    if(!user){
        return(
            <div className="row">
                <div className="col-xs-12 col-md-8 offset-md-2">
                    {/* Write a new comment */}
                    <p>Please <Link to='/login'>login</Link> or <Link to='/signup'>sign up</Link> 
                        to add comment on this article 
                    </p>
                    {/* Display list comments of this article */}
                    {!commentList && (
                        <div className="article-preview">
                            <p>Loading...</p>
                        </div>
                    )}
                    {commentList && commentList.length === 0 && (
                        <div className="article-preview">
                            <p>No Comment are here... yet.</p>
                        </div>
                    )}
                    {commentList && commentList.map((data, idx)=>(
                        <div key={idx} className="card">
                            <div className="card-block">
                                <p className="card-text">{data.body}</p>
                            </div>
                            <div className="card-footer">
                                <div className="comment-author">
                                    <img src={data.author.image} className="comment-author-img" alt=""/>
                                </div>
                                &nbsp;
                                <Link 
                                    style={{ textDecoration: 'none'}}
                                    to={`/profiles/${data.author.username}`}
                                >
                                    <Typography color="primary">
                                        {data.author.username}
                                    </Typography>
                                </Link>
                                <span className="date-posted">{moment(data.createdAt).format('MMMM Do YYYY')}</span>
                            </div>
                        </div>
                    ))}   
                </div>
            </div>
        );
    } else {
        return(
            <div className="row">
                <div className="col-xs-12 col-md-8 offset-md-2">
                    {/* Write a new comment */}
                    <form className="card comment-form" onSubmit={handleComment}>
                        <div className="card-block">
                            <textarea 
                                className="form-control" 
                                placeholder="Write a comment..." 
                                rows="3"
                                required
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="card-footer">
                            <img src={user.image} className="comment-author-img" alt=""/>
                            <button type="submit" className="btn btn-sm btn-primary">
                                Post Comment
                            </button>
                        </div>
                    </form>
                    {/* Display list comments of this article */}
                    {!commentList && (
                        <div className="article-preview">
                            <p>Loading...</p>
                        </div>
                    )}
                    {commentList && commentList.length === 0 && (
                        <div className="article-preview">
                            <p>No Comment are here... yet.</p>
                        </div>
                    )}
                    {commentList.length > 0 && commentList.map((data, idx)=>(
                        <div key={idx} className="card">
                            <div className="card-block">
                                <p className="card-text">{data.body}</p>
                            </div>
                            <div className="card-footer">
                                <div className="comment-author">
                                    <img src={data.author.image} className="comment-author-img" alt=""/>
                                </div>
                                &nbsp;
                                <Link 
                                    style={{ textDecoration: 'none'}}
                                    to={`/profiles/${data.author.username}`}
                                >
                                    <Typography color="primary" variant="subtitle">
                                        {data.author.username}
                                    </Typography>
                                </Link>
                                <span className="date-posted">{moment(data.createdAt).format('MMMM Do YYYY')}</span>
                                {user.username === data.author.username && (
                                    <span className="mod-options">
                                        <Tooltip title="Delete" placement="top">
                                            <i className="ion-trash-a" onClick={()=>handleDeleteComment(data._id)}></i>   
                                        </Tooltip>
                                    </span>    
                                )}
                            </div>
                        </div>
                    ))}   
                </div>
            </div>
        );
    }  
}

export default Comment;