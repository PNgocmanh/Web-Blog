import React, { useEffect, useState } from "react";
import TagArticle from "./TagArticle";
import FeedArticle from "./FeedArticle";
import GlobalArticle from './Global.js'
import AxiosInstance from "../../redux/AxiosInstance";
import RecentGroup from '../../components/Group/RecentGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';

function MainView() {
    document.title = `Home — mridula`;
    
    const accessToken = localStorage.getItem('token'); 

    const [tags, setTags] = useState('');
    const [tag, setTag] = useState('');

    const [tab, setTab] = useState(accessToken ? "Your Feed" : "Global Feed");

    const [value, setValue] = useState(accessToken ? 'Your Feed' : 'Global Feed');

    const handleChange = (event, newValue) => {
        setTab(newValue);
        setValue(newValue);
        setTag('');
    };

    const [reload, setReload] = useState(false);


    const handleTags = async (tag) => {
        setTab(tag);
        setValue(tag)
        setTag(tag);
    }

    useEffect(() => {
        
        if(reload) setReload(false);

        const fetchTags = async () => {
            const url = `/tags`;
            const res = await AxiosInstance.get(url);
            setTags(res.data.tags);
        }

        fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[reload]); 


    return(
        <Container>
            <Grid container spacing={1} pt={1} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={9}>
                    <Card sx={{ marginBottom: 2 }}>
                        {accessToken ? (
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="secondary tabs example"
                            >
                                <Tab value="Your Feed" label="Your Feed" />
                                <Tab value="Global Feed" label="Global Feed" />
                                {tag && (
                                    <Tab value={tab} label={"#" + tab} />
                                )}
                            </Tabs>
                        ) : (
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="secondary tabs example"
                            >
                                <Tab value="Global Feed" label="Global Feed" />
                                {tag && (
                                    <Tab value={tab} label={"#" + tab} />
                                )}
                            </Tabs>
                        )}
                    </Card>
                </Grid>
                <Grid item container xs={12} md={12} spacing={2}>
                    <Grid item xs={12} md={9}>
                        {tab === "Your Feed" && (
                            <FeedArticle />
                        )} 

                        {tab === "Global Feed" && (
                            <GlobalArticle />
                        )}
                        {tab !== "Global Feed" && tab !== "Your Feed" && (
                            <TagArticle 
                                tag={tag}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            <div className="tag-list">
                                {tags && tags.map((data, index)=>(
                                    <button 
                                        key={index}
                                        onClick={()=>handleTags(data)}
                                        className="tag-pill tag-default btn btn btn-info"
                                    >{data}</button>
                                ))}
                            </div>
                        </div>
                        <br />
                        <RecentGroup />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MainView;