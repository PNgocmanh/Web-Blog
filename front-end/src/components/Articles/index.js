import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteArticle, getArticle } from "../../redux/apiArticle";
import Comment from "./Comment";
import { favoriteArticle, unfavoriteArticle } from '../../redux/apiArticle';
import ButtonFollow from "../ButtonFollow";
import moment from 'moment';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';

function Article () { 
    document.title = `Article — mridula`;
    const user = useSelector((state) => state.auth.getUser.userLogin);
    const data = useSelector(state => state.article.getArticle.articles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const slug = useParams();
   
    const [reload, setReload] = useState(false);

    const handleFavorite = (e) => {
        e.preventDefault();
        if(!data.favorited) {
            favoriteArticle(data.slug, dispatch);
        } else {
            unfavoriteArticle(data.slug, dispatch);
        }
        setReload(true);
        getArticle(slug.slug, dispatch, navigate);
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    useEffect(() => {
        if(reload) setReload(false);
        getArticle(slug.slug, dispatch, navigate);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.favorited, dispatch, reload, slug.slug]);

    const onClickDel = () => {
        deleteArticle(slug.slug, dispatch, navigate);
    }

    const onClickUpdate = () => {
        if(data.group){
            navigate(`/groups/${data.groupName}/editor/${slug.slug}`);
        } else navigate(`/editor/${slug.slug}`);
    }

    if(!data) {
        <div className='container'>
            <h2>Loading...</h2>
        </div>
    } else  {
        return (
            <div className="article-page">
                <React.Fragment>
                    <CssBaseline />
                    <Container>
                        <Grid container justifyContent={'center'} spacing={1} pt={1} sx={{ flexGrow: 1, marginTop: 3 }}>
                            <Grid item xs={12} sm={12} md={10}>
                                <Card sx={{ borderRadius: 4 }}>
                                    <CardContent>
                                        <CardHeader
                                            avatar={
                                                <Avatar src={data.author.image} aria-label="recipe"></Avatar>
                                            }
                                            action={
                                                <>
                                                    { user ? (
                                                        <Button onClick={handleFavorite}>
                                                            {data.favorited ? (
                                                                <FavoriteIcon />
                                                            ):(
                                                                <FavoriteBorderIcon />    
                                                            )}
                                                            {data.favoritesCount} Like
                                                        </Button>
                                                    ):(
                                                        <Button onClick={()=>navigate('/login')}>
                                                            <FavoriteBorderIcon /> {data.favoritesCount} Like
                                                        </Button>
                                                    )}
                                                </>
                                            }
                                            title={(
                                                <Stack direction="row" spacing={1}>
                                                    <Box sx={{ marginTop: 0.5 }}>
                                                        <Link 
                                                            style={{ textDecoration: 'none'}}
                                                            to={`/profiles/${data.author.username}`}
                                                        >
                                                            <Typography color="primary">
                                                                {data.author.username}
                                                            </Typography>
                                                        </Link>
                                                    </Box>
                                                    {!(user && user.username === data.author.username) && (
                                                        <Box onClick={()=>setReload(true)}>
                                                            <ButtonFollow 
                                                                userfollow={data.author}
                                                            />
                                                        </Box> 
                                                    )}      
                                                </Stack>
                                            )}
                                            subheader={moment(data.createdAt).format('MMMM Do YYYY')}
                                            
                                        />
                                        <Typography variant="h4" sx={{ paddingLeft: 2, fontWeight: 600 }}>
                                            {data.title}
                                        </Typography>
                                        <Typography sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 2 }}>
                                            <Stack direction="row" spacing={1} sx={{ marginBottom: 1 }}>
                                                <LocalOfferIcon />
                                                {data.tagList.length === 0 && (
                                                    <Chip label="None" />
                                                )}
                                                {data.tagList.map((tag, idx)=>(
                                                    <Chip key={idx} label={tag} />
                                                ))}
                                            </Stack>
                                            {data.groupName && (
                                                <>
                                                    <GroupsIcon sx={{ marginRight: 1 }} />
                                                    <Link to={`/groups/${data.groupName}`} style={{ textDecoration: 'none'}}>
                                                        <Chip label={data.groupName}  />
                                                    </Link>
                                                </>
                                            )}
                                        </Typography>
                                        {user && user.username === data.author.username && (
                                            <Box sx={{ marginLeft: 2 }}>
                                                <Button 
                                                    variant="outlined"
                                                    color="primary"
                                                    sx={{ borderRadius: 6, textTransform: 'none' }}
                                                    onClick={onClickUpdate}
                                                >
                                                    <i className=" ion-edit"></i>
                                                    &nbsp; Edit Article
                                                </Button>
                                                &nbsp;&nbsp;
                                                <Button 
                                                    variant="outlined"
                                                    color="error"
                                                    sx={{ borderRadius: 6, textTransform: 'none' }}
                                                    onClick={onClickDel}
                                                >
                                                    <i className="ion-trash-a"></i>
                                                    &nbsp; Delete Article 
                                                </Button>
                                            </Box>  
                                        )}      
                                        <Divider sx={{marginTop: 2}} />
                                        <Typography component={'div'} sx={{ paddingTop: 2, marginLeft: 2 }} dangerouslySetInnerHTML={{__html: data.body}}>
                                        </Typography>
                                        <Divider sx={{marginBottom: 2}} />
                                        <Comment />  
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
            </div>
        );
    }
}

export default Article;