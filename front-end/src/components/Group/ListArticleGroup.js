import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticlesGroup } from '../../redux/apiGroup';
import { getGroupArticles } from '../../redux/apiArticle';
import moment from 'moment';
import CardMedia from '@mui/material/CardMedia';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import CommentGroup from './Comment';
import Swal from 'sweetalert2'; 

function ListArticleGroup(){
    const user = useSelector((state) => state.auth.getUser.userLogin);
    const groupArticle = useSelector(state=>state.article.articleGroup.article);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groupName = useParams().groupName;
    const [deleteId, setDeleteId] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const handleClick = (index) => (event) => {
        setAnchorEl(event.currentTarget);
        setCurrentIndex(index);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = (slug) => {
        setAnchorEl(null);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                setDeleteId(true);
                deleteArticlesGroup(slug, groupName, dispatch);
                getGroupArticles(groupName, dispatch);  
                Swal.fire(
                'Deleted!',
                'Your article has been deleted.',
                'success'
                )
            }
        })
    }
   
    React.useEffect(() => {
        if(deleteId) setDeleteId(false);
        getGroupArticles(groupName, dispatch);      
    }, [dispatch, groupName, deleteId]);

    if(!groupArticle){
        return(
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Loading Articles...
                    </Typography>
                </CardContent>
            </Card>
        );
    }
    if(groupArticle && groupArticle.length === 0){
        return(
            <Card>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="400"
                    image="../../assets/image/none.png"
                />
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ textAlignLast: 'center' }}>
                        No Articles...
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return(
        <React.Fragment>
        {groupArticle.map((article, index)=>(
            <Card key={index} sx={{ marginBottom: 2, borderRadius: 2 }}>
                <CardHeader
                    key={article.slug}
                    avatar={
                    <Avatar src={article.author.image} aria-label="recipe"></Avatar>
                    }
                    action={
                        <div key={article.slug}>
                            <IconButton 
                                onClick={handleClick(index)}
                                aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl) && index === currentIndex}
                                onClose={handleClose}
                                style={{boxShadow: 'none'}}
                                elevation={0}
                            >
                                <MenuItem onClick={()=>navigate(`/articles/${article.slug}`)}>
                                    See Detail
                                </MenuItem>
                                { user && user.username === article.author.username && (
                                    <MenuItem 
                                        onClick={() => handleDelete(article.slug)}
                                    >Delete</MenuItem>
                                )}
                            </Menu>
                         </div>
                        }
                    title={
                        <Link 
                            style={{ textDecoration: 'none'}}
                            to={`/profiles/${article.author.username}`}
                        >
                            <Typography color="primary">
                                {article.author.username}
                            </Typography>
                        </Link>
                    }
                    subheader={moment(article.createdAt).format('MMMM Do YYYY')}
                />
                <CardContent sx={{ paddingTop: 0 }}>
                    <Typography variant="h6" component="div">
                        <div dangerouslySetInnerHTML={{__html: article.body}} />   
                    </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CommentGroup
                    article={article}
                />
            </Card>
        ))}
        </React.Fragment>
    );
}

export default ListArticleGroup;