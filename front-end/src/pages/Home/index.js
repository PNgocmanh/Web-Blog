import React from "react";
import MainView from "./MainView";
import CssBaseline from '@mui/material/CssBaseline';

function Home(){
    return(
        <div>   
            <div className="home-page">
                <div className='container page'>
                    <div className="row">
                        <React.Fragment>
                            <CssBaseline />
                            <MainView />
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;