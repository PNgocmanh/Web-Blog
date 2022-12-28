import React, { Component, lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Page404 from '../pages/Page_404';

const Editors = lazy(()=>
    import('../components/Editor')
);
const Setting = lazy(()=>
    import('../components/Setting')
);
const Articles = lazy(()=>
    import('../components/Articles')
);
const Profile = lazy(()=>
    import('../pages/Profile')
);
const Login = lazy(()=>
    import('../pages/Login')
);
const SignUp = lazy(()=>
    import('../pages/Signup')
);

const GroupList = lazy(()=>
    import('../components/Group/GroupList')
);

const Group = lazy(()=>
    import('../components/Group/Group')
);

const ChangePassword = lazy(()=>
    import('../components/ChangePassword')
);

const CreateArticleGroup = lazy(()=>
    import('../components/Group/CreateArticleGroup')
);

const EditArticleGroup = lazy(()=>
    import('../components/Group/EditArticle')
);

class RouterDom extends Component {
    render() {
        return (
            <>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/404" element={<Page404 />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/editor' element={<Editors />} />
                        <Route path='/editor/:slug' element={<Editors />} />
                        <Route path='/settings' element={<Setting />} />
                        <Route path='/password' element={<ChangePassword />} />
                        <Route path='/profiles/:username/favorites' element={<Profile />} />
                        <Route path='/profiles/:username' element={<Profile />} />
                        <Route path='/articles/:slug' element={<Articles />} />
                        <Route path='/groups' element={<GroupList />} />
                        <Route path='/groups/:groupName' element={<Group />} />
                        <Route path='/groups/:groupName/editor' element={<CreateArticleGroup />} />
                        <Route path='/groups/:groupName/editor/:slug' element={<EditArticleGroup />} />
                    </Routes>
                </Suspense>
            </>
        );
    }
}

export default RouterDom;