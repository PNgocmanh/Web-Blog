import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from '../redux/apiRequest';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

function ButtonFollow({ userfollow }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.auth.getUser.userLogin);
  
    const handleClick = () => {
        if (!currentUser) {
          navigate(`/login`);
          return;
        }
        
        if (userfollow.following) {
          unfollowUser(userfollow.username, dispatch);
        } else {
          followUser(userfollow.username, dispatch);
        }
    };
    
    return (
        <Button 
          onClick={handleClick} 
          variant={userfollow.following ? 'contained' : 'outlined'} 
          color="info"
          size='small'
          sx={{ borderRadius: 6, textTransform: 'none' }}
        >
          {userfollow.following ? (
            <><CheckIcon /> Unfollow</>
          ) : (
            <><AddIcon /> Follow</>
          )}
        </Button>
    );
}

export default memo(ButtonFollow);