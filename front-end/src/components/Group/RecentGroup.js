import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroup }from '../../redux/apiGroup';
import GroupsIcon from '@mui/icons-material/Groups';

export default function RecentGroup(){
    const [open, setOpen] = React.useState(true);
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const ListGroup = useSelector(state=>state.group.getGroupList.listGroup);

    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(()=>{
        getAllGroup(dispatch);
    },[dispatch]);
    return(
        <Card sx={{ borderRadius: 2 }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                >
                <ListItemButton 
                    sx={{ py: 0, minHeight: 32 }} 
                    onClick={handleClick}
                >
                    <ListItemText 
                        primary={(
                            <>
                                <GroupsIcon sx ={{ marginRight: 1 }} /> Group
                            </>
                        )} 
                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', color: 'blue' }}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse 
                    in={open} 
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div" disablePadding>
                        {!ListGroup && (
                            <ListItemText 
                                primary='Loading...'
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} 
                            />
                        )}
                        {ListGroup && ListGroup.map((group, index) => (
                            <div key={index}>
                            {(index < 5) && (
                                <ListItemButton 
                                    key={group.groupName} 
                                    sx={{ py: 0, minHeight: 32 }}
                                    onClick={()=>navigate(`/groups/${group.groupName}`)}
                                >
                                    <ListItemText 
                                        primary={group.groupName}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} 
                                    />
                                </ListItemButton>
                            )}
                            </div>
                        ))}
                    
                    <ListItemButton sx={{ py: 0, minHeight: 32 }}>
                        <ListItemText 
                            primary="See all" 
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }} 
                            onClick={()=>navigate(`/groups`)}
                        />
                    </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Card>
    );
}