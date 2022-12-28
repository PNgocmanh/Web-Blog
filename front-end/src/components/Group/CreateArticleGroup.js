import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; 
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import JoditEditor from "jodit-react";
import { createArticleGroup } from '../../redux/apiGroup';

function CreateArticle () {
    document.title = `Editor — conduit`;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState('');

    const groupName = useParams().groupName;

    const author = useSelector(state => state.auth.getUser.userLogin);
    
    const handleCreate = (e) => {
        e.preventDefault();
        const newArticle = {
            title: title,
            description: description,
            body: body==='<p><br></p>' ? "" : body.replace(/&nbsp;/g, ''),
            tagList: tags,
            author: author,              
        }
        createArticleGroup(newArticle, groupName, dispatch, navigate);
    }

    console.log(body);

    return(
        <div>
            <Container>
            <Grid container justifyContent={'center'} spacing={1} sx={{ marginTop: 3 }}>

                <Grid item xs={12} md={10}>
                    <Card sx={{ borderRadius: 2 }}>
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
                                Create Group Article
                            </Typography>
                            <Grid container>
                                <Grid item xs={0} md={1}></Grid>
                                <Grid sx={{ marginRight:2 }} item xs={12} md={10}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        name="title"
                                        autoComplete="title"
                                        placeholder="Article Title" 
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        name="description"
                                        placeholder="What's this article about?" 
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="tags"
                                        label="Tags (separated by comma). Example: tag1,tag2,..."
                                        name="tags"
                                        placeholder="Enter tags" 
                                        onChange={(e)=>setTags(e.target.value)}
                                    />
                                    <Card 
                                        sx={{
                                            marginLeft: 1.5,
                                            padding: 2
                                        }}
                                    >
                                        <Typography 
                                            variant="body2"
                                            sx={{
                                                marginBottom: 3
                                            }}
                                        >
                                            Content
                                        </Typography>
                                        <JoditEditor
                                            value={body}
                                            onBlur={newContent => setBody(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => setBody(newContent)}
                                        />
                                    </Card>
                                    <div className="text-center">
                                        <Button 
                                            variant="contained" 
                                            onClick={handleCreate}
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
                                                Publish Article
                                            </Typography>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        </div>
    );  
}

export default CreateArticle;