import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Swal from 'sweetalert2'; 

export default function CreateArticle() {
    const groupName = useParams().groupName;
    const user = useSelector(state => state.auth.getUser.userLogin);
    const groupDetail = useSelector(state=>state.group.getGroup.group);
    const navigate = useNavigate();

    const handleCreate = () => {
        if(groupDetail.join === true) navigate(`/groups/${groupName}/editor`);
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please join this group to create a article!',
                allowOutsideClick: false
            })
        }
    }

 
    if(user){
        return (
            <div>
                <Card sx={{ borderRadius: 2 }}>   
                    <CardHeader
                        avatar={
                        <Avatar src={user.image}></Avatar>
                        }
                        title={
                            <Button 
                                onClick={handleCreate} 
                                variant="outlined" 
                                
                                sx={{
                                    borderRadius: '25px',
                                    textTransform: 'none',
                                    paddingRight: {
                                        xs: 15.5,
                                        md: 25,
                                        sm: 31,
                                        lg: 37
                                    }
                                }}
                            >
                                <Typography>Post a Article</Typography>
                            </Button>
                        }
                    />
                </Card>
            </div>
        );
    }
}