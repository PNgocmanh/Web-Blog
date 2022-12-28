import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import CreateGroup from './CreateGroup';
import ButtonJoin from './ButtonJoin';
import { getAllGroup }from '../../redux/apiGroup';
import { useDispatch, useSelector } from 'react-redux';

function GroupList(){
    document.title = 'Groups — mridula'
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ListGroup = useSelector(state=>state.group.getGroupList.listGroup); 
    const [reload, setReload] = React.useState(false);

    useEffect(()=>{
        getAllGroup(dispatch);
        if(reload === true) setReload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reload]);

    return(
        <div className='container page'>
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <Box >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                        <Box>
                                            <Tab label="Group" />
                                        </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <CreateGroup />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                { !ListGroup && (
                                    <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Loading ...
                                        </TableCell>
                                    </TableRow>
                                )}
                                {ListGroup &&ListGroup.map((group) => (
                                    <TableRow
                                    key={group.groupName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Grid container spacing={2}>
                                                <Grid item xs={2}>
                                                    <Avatar src={group.groupImage} variant="square"></Avatar>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Typography>
                                                        <Link 
                                                            component="button" 
                                                            onClick={()=>navigate(`/groups/${group.groupName}`)} 
                                                            underline="hover"
                                                        > {group.groupName}
                                                        </Link>
                                                    </Typography>
                                                    <Typography variant='caption'>{group.member.length} members</Typography>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="right">
                                            <div onClick={()=>setReload(true)}>
                                                <ButtonJoin
                                                    group={group}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default GroupList;