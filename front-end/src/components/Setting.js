import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser} from "../redux/apiRequest";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; 
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import AxiosInstance from "../redux/AxiosInstance";

function Setting(){
    document.title = `Setting — mridula`;
    const accessToken = localStorage.getItem('token'); 
    const user = useSelector((state) => state.auth.getUser.userLogin);

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if(accessToken){
                const res = await AxiosInstance.get(`/user`);
                const data = res.data;
                
                setUsername(data.username);
                setBio(data.bio);
                setImage(data.image);
                setEmail(data.email);
                if(user.username !== data.username) navigate('/404');
            }
        }

        fetchData();

        if(accessToken){
            getUser(dispatch);
            if(user){
                setUsername(user.username);
                setBio(user.bio);
                setImage(user.image);
                setEmail(user.email);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, dispatch]);
 
    const handleUpdate = (e) => {
        e.preventDefault();
        const update = {
            username: username,
            email: email,
            bio: bio,
            image: image,
        }  
        updateUser(update, navigate);
        getUser(dispatch);
    }

    return(
        <Container>
            <Grid container justifyItems={'center'} spacing={1} sx={{ marginTop: 3}}>
                <Grid item xs={0} md={2}></Grid>
                <Grid item xs={12} md={8}>
                    <Card>
                        <Box 
                            component="form"
                            sx={{
                                alignItems: 'center',
                                '& .MuiTextField-root': { m: 1 },
                            }}
                        >
                            <Typography 
                                variant="h1"
                                color="primary"
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    fontSize: 35,
                                    paddingTop: 3,
                                    paddingBottom: 3
                                }}
                            >
                                Profile Setting
                            </Typography>
                            <Grid container>
                                <Grid item xs={0} md={2}></Grid>
                                <Grid sx={{ marginRight:2 }} item xs={12} md={8}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="image"
                                        label="Image"
                                        name="image"
                                        autoComplete="image"
                                        value={image}
                                        placeholder="URL of profile picture"
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="name"
                                        label="UserName"
                                        name="name"
                                        autoComplete="name"
                                        value={username}
                                        placeholder="Your Name" 
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        name="bio"
                                        type="text"
                                        multiline
                                        minRows={5}
                                        maxRows={20}
                                        variant="outlined"
                                        color="primary"
                                        label="Bio"
                                        fullWidth
                                        onChange={(e)=>setBio(e.target.value)}
                                        value={bio}
                                        placeholder="Short bio about you"
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        type="email"
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        placeholder="Email" 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="text-center">
                                        <Button 
                                            variant="contained" 
                                            onClick={handleUpdate}
                                            sx={{
                                                paddingLeft: 4,
                                                paddingTop: 2,
                                                paddingBottom: 2,
                                                paddingRight: 4,
                                                marginTop: 2,
                                                marginBottom: 4,
                                            }}
                                        >
                                            <Typography>
                                                Update Profile
                                            </Typography>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={0} md={2}></Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={0} md={2}></Grid>
            </Grid>
        </Container>
    );
}

export default Setting;