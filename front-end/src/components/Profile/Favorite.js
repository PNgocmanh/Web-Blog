import React, { memo, useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getFavoriteArticle } from '../../redux/apiArticle';
import ButtonFavorite from '../ButtonFavorite';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import GroupsIcon from '@mui/icons-material/Groups';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '../Pagination/Pagination';
import Grid from '@mui/material/Grid';

function FavoriteArticle ({ profile }) {
    let PageSize = process.env.REACT_APP_PAGESIZE || 5;
    const listfavorite = useSelector(state => state.article.getFavoriteArticle.favoriteArticle);
    const username = useParams().username;
    const dispatch = useDispatch();
   
    const [currentPage, setCurrentPage] = useState(1);
   
    const favoriteArticle = listfavorite ? listfavorite : null;

    const [reload, setReload] = useState(false);

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[currentPage]);
    
    useEffect(() => {
        getFavoriteArticle(username, PageSize, currentPage - 1, dispatch);
        if(reload) setReload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, currentPage]);

    if(!profile){
        return (
            <Card>
                <CardContent>
                    <Typography>
                        Loading ...
                    </Typography>
                </CardContent>
            </Card>
        );
    } else {
        if(!favoriteArticle) {
            return (
                <div className="article-preview">
                    <p>Loading...</p>
                </div>
        )}
        if(favoriteArticle && favoriteArticle.totalList === 0){
            return (
            <Card>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image="../../assets/image/none.png"
                />
            </Card>
        )}
        return(
            <>
                {favoriteArticle && favoriteArticle.articles.map((data, index) => (
                    <Card key={index} sx={{ marginBottom: 3, borderRadius: 2 }}>
                        <CardHeader
                            key={data.slug}
                            sx={{ paddingBottom: 1 }}
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
                        totalCount={favoriteArticle.totalList}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </Grid> 
            </>
        );
    }
}

export default memo(FavoriteArticle);