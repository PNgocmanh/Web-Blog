import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getAllGroup, joinGroup, leaveGroup, getGroupDetails, getMemberGroup }from '../../redux/apiGroup';
import { useDispatch, useSelector } from 'react-redux';

const ButtonJoin = ({ group }) => {
    const groupName = group.groupName;
    const user = useSelector(state => state.auth.getUser.userLogin);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        getAllGroup(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleGroup = (e) => {
        e.preventDefault();
        if(user){
            if(user.username === group.admin.username){
                navigate(`/groups/${groupName}`);
            } else {
                if(group.join===false) {
                    joinGroup(groupName, user.username, dispatch);
                    getAllGroup(dispatch);
                    getGroupDetails(groupName, dispatch);
                    getMemberGroup(groupName, dispatch);
                    navigate(`/groups/${groupName}`);
                }
                else {
                    leaveGroup(groupName, user.username, dispatch);
                    getAllGroup(dispatch);
                    navigate(`/groups`);
                }
            }
        } else navigate(`/login`);
    }
    
    return(
        <Button onClick={handleGroup}>
           {group.join ? (user.username === group.admin.username ? 'Admin' : 'Leave')
            : 'Join'}
        </Button>
    );
}

export default ButtonJoin;