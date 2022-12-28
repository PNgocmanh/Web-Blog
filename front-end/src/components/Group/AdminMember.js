import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import MemberShip from './MemberShip'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminMember(){
    const groupDetail = useSelector(state=>state.group.getGroup.group);
    const memberGroup = useSelector(state=>state.group.member);
    const navigate = useNavigate();
    if(!groupDetail){
        return(
            <Typography>
                Loading ...
            </Typography>
        );
    }
    
    let member = '';
    if(groupDetail.member.length > 1){
        member = groupDetail.member.length + " Members";
    } else member = groupDetail.member.length + " Member";

    return(
        <>
            <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                       {member}
                    </Typography>
                    <Stack direction="row">
                        <AvatarGroup spacing={4} max={4}>
                            {memberGroup && memberGroup.map((member, index)=>(
                                <Avatar 
                                    key={index}
                                    onClick={()=>navigate(`/profiles/${member.username}`)} 
                                    src={member.image} 
                                />
                            ))}
                        </AvatarGroup>
                    </Stack>
                    
                </CardContent>
                <CardActions>
                    <MemberShip />
                </CardActions>
            </Card>
            <br />
            <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ padding: 1 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Admin
                    </Typography>
                    <CardHeader
                        sx={{ paddingTop: 1, paddingBottom: 1 }}
                        avatar={
                        <Avatar src={groupDetail.admin.image} aria-label="recipe"></Avatar>
                        }
                        title={
                            <Link 
                                style={{ textDecoration: 'none'}}
                                to={`/profiles/${groupDetail.admin.username}`}
                            >
                                <Typography color="primary">
                                    {groupDetail.admin.username}
                                </Typography>
                            </Link>
                        }
                        subheader={groupDetail.admin.bio}
                    />
                </CardContent>
            </Card>
        </>
    );
}