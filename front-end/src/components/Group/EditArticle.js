import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticle } from '../../redux/apiArticle';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextField from '@mui/material/TextField';
import AxiosInstance from '../../redux/AxiosInstance';
import Grid from '@mui/material/Grid'; 
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { updateArticleGroup } from '../../redux/apiGroup';
import JoditEditor from "jodit-react";

function EditorArticle () {
    document.title = `Editor — mridula`;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const groupName = useParams().groupName;
    const slug = useParams().slug;
    const [reload, setReload] = useState(false);

    const author = useSelector(state => state.auth.getUser.userLogin);
    const data = useSelector(state => state.article.getArticle.articles);

    const [title_new, setTitle_new] = useState('');
    const [description_new, setDescription_new] = useState('');
    const [body_new, setBody_new] = useState('');
    const [tags_new, setTags_new] = useState('');

    
    useEffect(()=>{
        const fetchData = async () => {
            if(slug !== undefined){
                const res = await AxiosInstance.get(`/articles/${slug}`);
                const article = res.data;
                if(article.author.username !== author.username) navigate(`/404`);
                setTitle_new(article.title);
                setDescription_new(article.description);
                setBody_new(article.body);
                setTags_new(article.tagList);
            }
        }

        if(slug !== undefined) fetchData();

        if(slug!== undefined) getArticle(slug, dispatch);

        if(data){
            setTitle_new(data.title);
            setDescription_new(data.description);
            setBody_new(data.body);
            setTags_new(data.tagList);
            setReload(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug, reload]);  


    const handleupdate = () => {
        
        const update = {
            title: title_new,
            description: description_new,
            body: body_new==='<p><br></p>' ? "" : body_new.replace(/&nbsp;/g, ''),
            tagList: tags_new,
        }
        
        updateArticleGroup(data.slug, groupName, update, navigate);
    }

    if(slug){
        return(
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
                                    Edit Article
                                </Typography>
                                <Grid container>
                                    <Grid item xs={0} md={1}></Grid>
                                    <Grid sx={{ marginRight:2 }} item xs={12} md={10}>
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="title"
                                            label="Title"
                                            name="title"
                                            autoComplete="title"
                                            value={title_new}
                                            placeholder="Article Title" 
                                            onChange={(e) => setTitle_new(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            name="description"
                                            value={description_new}
                                            placeholder="What's this article about?" 
                                            onChange={(e)=>setDescription_new(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ paddingBottom: 2 }}
                                            margin="normal"
                                            fullWidth
                                            id="tags"
                                            label="Tags (separated by comma). Example: tag1,tag2,..."
                                            name="tags"
                                            value={tags_new}
                                            placeholder="Enter tags" 
                                            onChange={(e)=>setTags_new(e.target.value)}
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
                                                value={body_new}
                                                onBlur={newContent => setBody_new(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={newContent => setBody_new(newContent)}
                                            />
                                        </Card>
                                        <div className="text-center">
                                            <Button 
                                                variant="contained" 
                                                onClick={handleupdate}
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
                                                    Update Article
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
        );    
    }
}

export default EditorArticle;