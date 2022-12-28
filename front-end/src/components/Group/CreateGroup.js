import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { createGroup } from '../../redux/apiGroup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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

export default function CreateGroup() {
    const [groupName, setGroupName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [rules, setRules] = React.useState('');
    const [groupImage, setGroupImage] = React.useState(null);


    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => state.auth.getUser.userLogin);

    const [openAlert, setOpenAlert] = React.useState(false);
    const error = useSelector(state=> state.group.createGroup.error);
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };
    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        if(user) setOpen(true);
        else navigate('/login');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const data = {
            groupName: groupName,
            groupImage: groupImage,
            description: description,
            rules: rules,
            admin:{
                username: user.username,
                image: user.image
            }
        }
        createGroup(data, dispatch, navigate);
        setOpenAlert(true);
    }

    return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            Create Group
        </Button>
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Create Group
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <form>
                    <fieldset>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="groupName"
                            label="Group name"
                            name="groupName"
                            autoComplete="groupName"
                            placeholder="Your Group Name" 
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            placeholder="What is the purpose of your group?" 
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="groupImage"
                            label="Group Image"
                            name="groupImage"
                            placeholder="Place your group avatar" 
                            onChange={(e)=>setGroupImage(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="rules"
                            label="Group Rules"
                            name="rules"
                            placeholder="Set expectations of your group" 
                            onChange={(e)=>setRules(e.target.value)}
                        />
                    </fieldset>
                </form>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleCreate}>
                Create
            </Button>
            </DialogActions>
        </BootstrapDialog>
        {error && (
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        )}
        
        {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <h1>Anywhere in your app!</h1>
                    
                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog> */}
        </div>
    );
}
