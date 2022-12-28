import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        login:{
            currentUser: null,
            errMessage: null
        },
        register:{
            errMessage: null
        },
        follow:{
            success: false,
        },
        checkUser:{
            isFetching: false,
            error: false,
            include: null,
        },
        getUser:{
            userLogin: null,
        },
        getProfile:{
            profileUser: null
        },
    },
    reducers:{
        //login
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.getUser.userLogin = action.payload;
        },
        loginFailed: (state, action) => {
            state.login.errMessage = action.payload;
        },
        //sign up
        registerFailed: (state, action) => {
            state.register.errMessage = action.payload;
        },

        follow: (state, action) => {
            state.follow.success = action.payload;
        },
        unfollow: (state, action) => {
            state.follow.success = action.payload;
        },
        
        // get user
        getUserSuccess: (state, action) => {
            state.getUser.userLogin = action.payload;
        },
        //get profile
        getProfileSuccess: (state, action) => {
            state.getProfile.profileUser = action.payload;
        },
        //logout
        logoutSuccess: (state) => {
            state.login.currentUser = null;
            state.getUser.userLogin = null;
            state.login.errMessage = null;
            state.register.errMessage = null;
        },
    },
});

export const {
    loginFailed,
    loginSuccess,
    registerFailed,
    getUserSuccess,
    getProfileSuccess,
    logoutSuccess,
    follow,
    unfollow,
} = authSlice.actions;

export default authSlice.reducer;