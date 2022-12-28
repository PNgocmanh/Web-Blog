import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../redux/apiRequest";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; 
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

function Setting(){
    document.title = `Change Password — mridula`;
    const user = useSelector((state) => state.auth.getUser.userLogin);
    
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleChangePassword = (e) => {
        e.preventDefault();
        const data = {
            currentPassword: password,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }
        changePassword(data, user.username, navigate);       
    }

    return(  
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
                                    Change Password
                                </Typography>
                                <Grid container>
                                    <Grid item xs={0} md={2}></Grid>
                                    <Grid sx={{ marginRight:2 }} item xs={12} md={8}>
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            fullWidth
                                            type="password"
                                            id="currentPassword"
                                            label="Current Password"
                                            name="currentPassword"
                                            autoComplete="currentPassword"
                                            placeholder="Your Current passwold"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            fullWidth
                                            type="password"
                                            id="newpassword"
                                            label="New password"
                                            name="newPassword"
                                            autoComplete="newPassword"
                                            placeholder="Your new password" 
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            variant="outlined"
                                            color="primary"
                                            label="Confirm new password"
                                            fullWidth
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your new password"
                                        />
                                        <div className="text-center">
                                            <Button 
                                                variant="contained" 
                                                onClick={handleChangePassword}
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
                                                    Update Password
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

export default Setting;