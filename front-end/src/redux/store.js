import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import articleReducer from './reducers/article';
import commentReducer from './reducers/comment'
import groupReducer from './reducers/group'

export default configureStore({
    reducer:{
        auth: authReducer,
        article: articleReducer,
        comment: commentReducer,
        group: groupReducer
    }
})
