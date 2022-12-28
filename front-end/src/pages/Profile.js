import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../redux/apiRequest';
import ButtonFollow from '../components//ButtonFollow';
import AxiosInstance from '../redux/AxiosInstance'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import UploadImage from '../components/UploadImage';
import { Button } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MyArticle from '../components/Profile/MyArticle';
import Favorite from '../components/Profile/Favorite';

function Profile () {
    const accessToken = localStorage.getItem('token'); 
    const CurrentUser = useSelector((state) => state.auth.getUser.userLogin);
    const username = useParams().username;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tab, setTab] = useState("My Articles");
    const [user, setUser] = useState('');

    const [open, setOpen] = useState(false);

    const [reload, setReload] = useState(false);
    
    useEffect(() => {
        if(accessToken){
            getUser(accessToken, dispatch);
        }
        if(reload) setReload(false);

        async function getProfileUser (username){
            const resUser = await AxiosInstance.get(`/profiles/${username}` );
            setUser(resUser.data.profile);
        }

        getProfileUser(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab, reload, username, open]);

    const handleOpen = () => {
        if(CurrentUser.username === user.username) setOpen(true)
    };
    const handleClose = () => setOpen(false);


    if(tab === "My Articles") document.title = `Profile — mridula`;
    else document.title = `Favorite Articles — mridula`;

    if(!user){
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
        return(
            <Container>
                <div className="profile-page">
                    <div className="user-info container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <UploadImage  open={open} handleClickOpen={handleOpen} handleClose={handleClose} image={user.image} />
                                <h4>{user.username}</h4>
                                <p>{user.bio}</p>
                                {CurrentUser && username === CurrentUser.username ? (
                                    <CardHeader 
                                        action={(
                                            <Button variant='contained' onClick={()=>navigate('/settings')} sx={{ borderRadius: 1 }}>
                                                <SettingsIcon />&nbsp;
                                                    Edit Profile
                                            </Button>
                                        )}
                                    />
                                ) : ( 
                                    <CardHeader 
                                        action={(
                                            <div onClick={()=>setReload(true)}>
                                                <ButtonFollow
                                                    userfollow={user}
                                                />
                                            </div>
                                        )}
                                    />
                                )}     
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <Grid item xs={12} md={9}>
                                    <Card sx={{ marginBottom: 2, marginTop: 2 }}>
                                        <Tabs
                                            value={tab}
                                            aria-label="secondary tabs example"
                                        >
                                            <Tab value='My Articles' onClick={()=>setTab("My Articles")} label="My Articles" />
                                            <Tab value='Favorited Articles' onClick={()=>setTab("Favorited Articles")} label="Favorited Articles" />
                                        </Tabs>
                                    </Card>
                                </Grid>

                                {/*user articles list */}
                                {tab === "My Articles" && (
                                    <div onClick={()=>setReload(true)}>
                                        <MyArticle profile={user} />
                                    </div>
                                )}
                                
                                {/* Favorite articles list */}
                                {tab === "Favorited Articles" && (
                                    <div onClick={()=>setReload(true)}>
                                        <Favorite profile={user} />
                                    </div>
                                )}                  
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Profile;