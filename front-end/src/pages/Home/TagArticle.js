import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonFavorite from "../../components/ButtonFavorite";
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import Grid from '@mui/material/Grid';
import { getTagsArticle } from "../../redux/apiArticle";
import Pagination from "../../components/Pagination/Pagination";

function TagArticle({ tag }) {
    let PageSize = process.env.REACT_APP_PAGESIZE || 5;
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const ArticleByTag = useSelector(state => state.article.getTagArticle.articleTag);
    
    const [reload, setReload] = useState(false);

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[currentPage]);
    
    useEffect(() => {    
        if(reload) setReload(false);
        getTagsArticle(tag, PageSize, currentPage - 1, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reload, tag, currentPage]); 

    if(!ArticleByTag){
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

    return(
        <>
            {ArticleByTag && ArticleByTag.articles.map((data, index) => (
                <Card key={index} sx={{ marginBottom: 3, borderRadius: 2 }}>
                    <CardHeader
                        sx={{ paddingBottom: 1 }}
                        key={data.slug}
                        action={(
                            <>
                                {data.groupName && (
                                    <>
                                        <GroupsIcon sx={{ marginRight: 1 }} />
                                        <Link to={`/groups/${data.groupName}`} style={{ textDecoration: 'none'}}>
                                            <Chip label={data.groupName}  />
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                        avatar={
                            <Avatar src={data.author.image} aria-label="recipe"></Avatar>
                        }
                        title={
                            <Link 
                                style={{ textDecoration: 'none'}}
                                to={`/profiles/${data.author.username}`}
                            >
                                <Typography color="primary">
                                    {data.author.username}
                                </Typography>
                            </Link>
                        }
                        subheader={moment(data.createdAt).format('MMMM Do YYYY')}
                    />
                    <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Link to={"/articles/" + data.slug} className="preview-link">
                            <Typography variant="h1" sx={{ fontSize: 25, fontWeight: 600, marginBottom: '5px' }}>{data.title}</Typography>
                            <Typography variant="subtitle1">{data.description}</Typography>
                            <Typography variant="subtitle2" sx={{ fontSize: '14px', paddingTop: 1 }}>Read more...</Typography>
                        </Link>
                    </CardContent>
                    <CardHeader 
                        title={(
                            <div onClick={()=>setReload(true)}>
                                <ButtonFavorite 
                                    article={data}
                                />
                            </div>
                        )}
                        action={(
                            <Stack direction="row" spacing={1} sx={{ paddingRight: 2.5, paddingTop: 0.9 }}>
                                {data.tagList.map((arr, idx) => (
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
                    totalCount={ArticleByTag.totalList}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </Grid>
        </>
    );
}

export default TagArticle;