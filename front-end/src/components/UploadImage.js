/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { getUser, updateUser } from '../redux/apiRequest'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: '#000 !important',
    opacity: '.5',
  },
}));

export default function UploadImage({ open, handleClickOpen, handleClose, image }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth.getUser.userLogin);
  const [avatar, setAvatar] = useState(image);
  const [uploadFile, setUploadFile] = useState(null); 

  useEffect(() => () => {
    uploadFile && URL.revokeObjectURL(avatar);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFile]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const files = e.target.files[0];
      files.preview = URL.createObjectURL(files);
      setAvatar(files.preview);
      setUploadFile(files);
    }
  };

  const handleChangeAvatar = async () => {
    const data = new FormData();
    data.append('file', uploadFile);
    data.append('upload_preset', "woe0gvzf");
    data.append('api_key', "423594412418743");
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dhnjljxml/image/upload`, data);
      const update = {
          username: user.username,
          email: user.email,
          image: response.data.url,
      };
      updateUser(update, navigate);
      getUser(dispatch);
      handleClose();
    } catch (error) {
      navigate('/404');
    }
  };

  return (
    <>
        {/* <button className="btn btn-sm btn-outline-secondary action-btn" onClick={handleClickOpen}>Upload</button> */}
        <Avatar
          src={image}
          onClick={handleClickOpen}
          sx={{ 
            width: 100, 
            height: 100,
            margin: '0 auto',
            marginBottom: 2
          }}
        /> 
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Upload Avatar
          </BootstrapDialogTitle>
          <DialogContent dividers>

              <Avatar 
                sx={{ width: '300px', height: '300px', margin: '0 auto' }} 
                src={avatar} 
                variant="rounded" 
              />
              <input
                id="uploadAvatar"
                type="file"
                onChange={handleChange}
                title="Upload file"
                hidden
              />
              <Button className={classes.avatar} sx={{ width: 68, height: 68, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <label htmlFor="uploadAvatar">
                  <FileUploadIcon sx={{ width: 50, height: 50 }} />            
                </label>
              </Button>
          </DialogContent>
          <DialogActions>
            <Button
                variant="outlined"
                color="success"
                size="small"
                disabled={!uploadFile}
                onClick={handleChangeAvatar}
              >
                <PublishedWithChangesIcon mr={2} /> Save change
              </Button>
          </DialogActions>
        </BootstrapDialog>
    </>
  );
}
