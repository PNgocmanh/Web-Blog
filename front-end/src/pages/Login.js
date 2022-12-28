import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; 
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'; 

function Login () {
    document.title = `Login — mridula`;
    const accessToken = localStorage.getItem('token'); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector(state => state.auth.login.errMessage);
    const [errMessage, setErrMessage] = useState(error ? error : "");
    const onChangeEmail= (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const [reload, setReload] = useState(false);
    useEffect(() => {
        if(accessToken) navigate('/')
        if(reload) setReload(false); 
        if(error){
            setErrMessage(error);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload, errMessage, error]);

    const handelLogin = (e) =>{
        e.preventDefault();
        const userLogin = {
            email: email,
            password: password
        }
        setReload(!reload);
        loginUser(userLogin, dispatch, navigate);
        if(error){
            setErrMessage(error);
        }
    }

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
                                    Login
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
                                            id="email"
                                            label="Email address"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Enter email"
                                            onChange={(e) => onChangeEmail(e)}
                                        />
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            fullWidth
                                            type="password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            autoComplete="password"
                                            placeholder="Password" 
                                            onChange={(e) => onChangePassword(e)}
                                        />
                                        <Typography align='center'>
                                            If you haven't had an account yet, <Link to="/signup">create a new one</Link>
                                        </Typography>
                                        <div className="text-center">
                                            <Button 
                                                variant="contained" 
                                                onClick={handelLogin}
                                                sx={{
                                                    paddingLeft: 4,
                                                    paddingTop: 1,
                                                    paddingBottom: 1,
                                                    paddingRight: 4,
                                                    marginTop: 2,
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <Typography>
                                                    Login
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

export default Login;