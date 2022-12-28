import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonFavorite from "../../components/ButtonFavorite";
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../redux/apiArticle";
import Pagination from "../../components/Pagination/Pagination";
import Grid from '@mui/material/Grid';

function FeedArticle() {
    let PageSize = process.env.REACT_APP_PAGESIZE || 5;
    const accessToken = localStorage.getItem('token'); 
    const [reload, setReload] = useState(false);
    const listfeed =  useSelector(state => state.article.getFeed.feedArticles);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[currentPage]);
    
    useEffect(()=>{
        if(reload) setReload(false);
        if(accessToken) {
            getFeed(PageSize, currentPage - 1, dispatch);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reload, currentPage]);

    if(!listfeed){
        return(
            <Card>
                <CardContent>
                    <Typography>
                        Loading Articles...
                    </Typography>
                </CardContent>
            </Card>
        );
    }
    if(listfeed.articles && listfeed.totalList === 0){
        return (
            <Card>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image="../../assets/image/none.png"
                />
            </Card>
        );
    }

    return(
        <>
            {listfeed.articles && listfeed.articles.map((item, index) => (
                <Card key={index} sx={{ marginBottom: 3, borderRadius: 2 }}>
                    <CardHeader
                        sx={{ paddingBottom: 1 }}
                        key={item.slug}
                        avatar={
                            <Avatar src={item.author.image} aria-label="recipe"></Avatar>
                        }
                        title={
                            <Link 
                                style={{ textDecoration: 'none'}}
                                to={`/profiles/${item.author.username}`}
                            >
                                <Typography color="primary">
                                    {item.author.username}
                                </Typography>
                            </Link>
                        }
                        subheader={moment(item.createdAt).format('MMMM Do YYYY')}
                    />
                    <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Link to={"/articles/" + item.slug} className="preview-link">
                            <Typography variant="h1" sx={{ fontSize: 25, fontWeight: 600, marginBottom: '5px' }}>{item.title}</Typography>
                            <Typography variant="subtitle1">{item.description}</Typography>
                            <Typography variant="subtitle2" sx={{ fontSize: '14px', paddingTop: 1 }}>Read more...</Typography>
                        </Link>
                    </CardContent>
                    <CardHeader 
                        title={(
                            <div onClick={()=>setReload(true)}>
                                <ButtonFavorite 
                                    article={item}
                                />
                            </div>
                        )}
                        action={(
                            <Stack direction="row" spacing={1} sx={{ paddingRight: 2.5, paddingTop: 0.9 }}>
                                {item.tagList.map((arr, idx) => (
                                    <Chip key={idx} label={arr}  />
                                ))}
                            </Stack>
                        )}
                    />
                </Card>
            ))}
            <Grid container justifyContent={'center'}>
                <Pagination
                    key={currentPage}
                    currentPage={currentPage}
                    totalCount={listfeed.totalList}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </Grid>
        </>
    );
}

export default FeedArticle;