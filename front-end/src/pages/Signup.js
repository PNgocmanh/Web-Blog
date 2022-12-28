import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/apiRequest';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; 
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'; 

function SignUp(){
    document.title = `Sign Up — mridula`;
    const accessToken = localStorage.getItem('token'); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector(state => state.auth.register.errMessage);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeEmail= (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password
        }
        registerUser(newUser, dispatch, navigate);   
    }

    useEffect(() => {
        if(accessToken) navigate('/')
        if(error){
            setErrMessage(error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errMessage, error]);
    
    return (
        <React.Fragment>     
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
                                    Register
                                </Typography>
                                
                                <Grid container>
                                    <Grid item xs={0} md={2}></Grid>
                                    <Grid sx={{ marginRight:2 }} item xs={12} md={8}>
                                        {errMessage && (
                                            <Alert 
                                                severity="error"
                                                sx={{ marginBottom: 2, marginLeft: 1, marginRight: -1 }}
                                            >{errMessage}</Alert>
                                        )}
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            fullWidth
                                            id="Fullname"
                                            label="Full name"
                                            name="Fullname"
                                            autoComplete="currentPassword"
                                            placeholder="Full name"
                                            onChange={onChangeUsername}
                                        />
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            fullWidth
                                            type="email"
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Enter email" 
                                            onChange={onChangeEmail}
                                        />
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            id="password"
                                            name="password"
                                            type="password"
                                            variant="outlined"
                                            color="primary"
                                            label="Password"
                                            fullWidth
                                            onChange={onChangePassword}
                                            placeholder="Password"
                                        />
                                        <div className="text-center">
                                            <Button 
                                                variant="contained" 
                                                onClick={handleRegister}
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
                                                    Sign Up
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
        </React.Fragment>
    );
}

export default SignUp;