import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCommentGroup } from "../../redux/apiComment";
import Swal from 'sweetalert2'; 
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { favoriteArticle, unfavoriteArticle } from '../../redux/apiArticle';
import { getGroupArticles } from '../../redux/apiArticle';
import { Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { grey } from '@mui/material/colors';
import AxiosInstance from "../../redux/AxiosInstance";

function ButtonLike({ article }){
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [reload, setReload] = React.useState(false);
    const groupName = useParams().groupName;
    const groupDetail = useSelector(state=>state.group.getGroup.group);
    const user = useSelector(state => state.auth.getUser.userLogin);

    const handleFavorite = (e) => {
        e.preventDefault();
        if(groupDetail.join===true){
            if(article.favorited){
                unfavoriteArticle(article.slug, dispatch);
            } else {
                favoriteArticle(article.slug, dispatch);
            }
            setReload(true);
            getGroupArticles(groupName, dispatch);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please join this group to react!',
                allowOutsideClick: false
            })
        }
    }

    React.useEffect(()=>{
        if(reload) setReload(false);
        getGroupArticles(groupName, dispatch);
            
    },[article.favorited, dispatch, groupName, reload])

 
    return(
        <>
            {!user ? (
                <Button onClick={()=>navigate('/login')}>
                    <ThumbUpOffAltIcon />
                    {article.favoritesCount} Like
                </Button>
            ) : (
                <Button onClick={handleFavorite} >
                    {article.favorited ? (
                        <ThumbUpIcon />
                    ) : (
                        <ThumbUpOffAltIcon />
                    )}
                    {article.favoritesCount} Like
                </Button>
            )}
        </>
    );
}

function CommentGroup({ article }){
    const user = useSelector((state) => state.auth.getUser.userLogin);
    const groupDetail = useSelector(state=>state.group.getGroup.group);
    const [commentList, setCommentList] = useState('');
    const [comment, setComment] = useState('');
    const [reload, setReload] = useState(false);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();  

    const handleTabComment = () => {
        if(!user) navigate(`/login`);
        else setOpen(true);
    }

    const handleComment = async (e) => {
        e.preventDefault();
        const newComment =  {
            "body": comment,
            "username": user.username,
            "bio": user.bio,
            "image": user.image,
        }
        if(groupDetail.join === true){
            setComment('');
            createCommentGroup(newComment, article.slug, dispatch, navigate);
            setReload(true);
        } else {
            setComment('');
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please join this group to comment!',
                allowOutsideClick: false
            })
        }
        
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
                await AxiosInstance.delete(`/articles/${article.slug}/comments/${id}`);
                setReload(true);
                Swal.fire(
                'Deleted!',
                'Your comment has been deleted.',
                'success'
                )
            }
        })
    }

    useEffect(() => {
        async function getComment (){
            const res = await AxiosInstance.get(`/articles/${article.slug}/comments`);
            setCommentList(res.data);
            setReload(false);
        }
        getComment();

    }, [reload, article.slug, open]);

    return(
        <>
            <CardActions sx={{ paddingTop: 0 }}>
                <ButtonLike 
                    article={article}
                />
                <Button onClick={handleTabComment}>
                    <CommentIcon /> {commentList.length} Comment
                </Button>
            </CardActions>
            <Divider variant="middle" />
            {open && (
                <div className="row">
                <CardContent sx={{ paddingTop: 0, paddingBottom: 0}}>
                    <Box
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    >
                        <IconButton 
                            sx={{ p: '10px' }} 
                            aria-label="menu"
                            onClick={()=>navigate(`/profiles/${user.username}`)}
                        >
                            <Avatar src={user.image} />
                        </IconButton>
                        <TextareaAutosize
                            style={{ 
                                width: 580,
                                height: 45,
                                borderRadius: '25px', 
                                paddingLeft: '15px',
                                paddingTop: '8.5px'
                            }}
                            minRows={2}
                            required
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Add a comment"
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                        />
                        {comment !== '' && (
                            <>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton 
                                color="primary" 
                                sx={{ p: '10px' }} 
                                onClick={handleComment}
                            >
                                <SendIcon />
                            </IconButton>
                            </>
                        )}
                    </Box>
                </CardContent>
                {!commentList && (
                    <CardContent>
                        <Typography>Loading...</Typography>
                    </CardContent>
                )}
                {commentList.length > 0 && commentList.map((data, idx)=>(
                    <CardContent key={idx} sx={{ paddingBottom: 0 }}>
                        <Box
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                        >
                            <IconButton 
                                sx={{ p: '10px' }} 
                                aria-label="menu"
                                onClick={()=>navigate(`/profiles/${data.author.username}`)}
                            >
                                <Avatar src={data.author.image} />
                            </IconButton>
                            <Box
                                sx={{
                                    width: 880,
                                    bgcolor: grey[300],
                                    borderRadius: '15px',
                                    paddingLeft: '15px',
                                    paddingBottom: '5px',
                                    paddingTop: '5px'
                                }}
                            >
                                <Typography variant="subtitle2">
                                    <Link 
                                        style={{ textDecoration: 'none'}}
                                        to={`/profiles/${data.author.username}`}
                                    >
                                        <Typography color="primary">
                                            {data.author.username}
                                        </Typography>
                                    </Link>
                                </Typography>
                                <Typography>{data.body}</Typography>
                            </Box>
                            {user.username === data.author.username && (
                                <IconButton 
                                color="primary" 
                                sx={{ p: '10px' }} 
                                onClick={()=>handleDeleteComment(data._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>  
                            )}
                        </Box>
                    </CardContent>
                ))} 
                </div>
            )}
        </>
    );
}

export default CommentGroup;