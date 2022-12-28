import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListArticleGroup from './ListArticleGroup';
import AdminMember from './AdminMember';
import RecentGroup from './RecentGroup';
import { 
    getGroupDetails, 
    deleteGroup,
    joinGroup,
    leaveGroup,
    getMemberGroup
} from '../../redux/apiGroup';
import { getGroupArticles } from '../../redux/apiArticle';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2'; 
import CreateArticle from './CreateArticle';

function Group(){
    const groupName = useParams().groupName;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    document.title = `${groupName} — mridula`;
    const groupDetail = useSelector(state=>state.group.getGroup.group);
    
    const user = useSelector(state => state.auth.getUser.userLogin);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [reload, setReload] =  React.useState(false);
    
  
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (e) => {
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
                deleteGroup(groupName, dispatch, navigate);
                Swal.fire(
                'Deleted!',
                'Your article has been deleted.',
                'success'
                )
            }
        })
    }

    const handleGroup = (e) => {
        e.preventDefault();

        if(!user) navigate(`/login`); 
        if(groupDetail.join===false) {
            joinGroup(groupName, user.username, dispatch);
            getMemberGroup(groupName, dispatch);
            setAnchorEl(null);
            navigate(`/groups/${groupName}`); 
        }
        else {
            leaveGroup(groupName, user.username, dispatch);
            navigate(`/groups`); 
        }
        setReload(true);
        getGroupDetails(groupName, dispatch);
    }

    useEffect(()=>{
        if(reload) setReload(false);
        window.scrollTo(0, 0);
        getGroupDetails(groupName, dispatch);
        getGroupArticles(groupName, dispatch);
        getMemberGroup(groupName, dispatch);
    },[dispatch, groupName, reload]);

    if(!groupDetail){
        return(
            <Typography>
                Loading Group ...
            </Typography>
        );
    }

    return(
        <div className='container page'>
            <React.Fragment>
                <CssBaseline />
                <Container >
                    <Grid container justifyContent={'center'} spacing={1} pt={1} sx={{ flexGrow: 1 }}>
                        <Grid item justifyContent={'center'} container xs={12} sm={11} md={11.5} spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Card sx={{ borderRadius: 2 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image="../../assets/image/defaultCover.png"
                                    />
                                    <CardContent>
                                        <CardHeader
                                            avatar={
                                                <Avatar src={groupDetail.groupImage} aria-label="recipe"></Avatar>
                                            }
                                            action={
                                                <>
                                                    {groupDetail.join ? (
                                                        <IconButton
                                                            id="basic-button"
                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={handleClick}
                                                            variant='outlined'
                                                        > <MoreVertIcon /></IconButton>
                                                    ) : (
                                                        <Button
                                                            id="basic-button"
                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={handleClick}
                                                            variant='outlined'
                                                        >Join Group</Button>
                                                    )}
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        { user && user.username===groupDetail.admin.username && (
                                                            <MenuItem onClick={handleClose}>Update Group</MenuItem>
                                                        )}
                                                        { user && user.username===groupDetail.admin.username ? (
                                                            <MenuItem onClick={handleDelete}>Delete Group</MenuItem>
                                                        ) : (
                                                            <MenuItem onClick={handleGroup}>{groupDetail.join ? 'Leave' : 'Join'} this group</MenuItem>
                                                        )}
                                                    </Menu>
                                                </>
                                            }
                                            title={groupName}
                                            subheader={moment(groupDetail.createdAt).format('MMMM Do YYYY')}
                                        />
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            component="div"
                                            sx={{ paddingLeft: '15px' }}
                                        >{groupDetail.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <br />
                                <CreateArticle />
                                <br />
                                <ListArticleGroup />
                            </Grid>
                            <Grid item xs={12} sm={12} md={3}>
                                <AdminMember />
                                <br />
                                <RecentGroup />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default Group;