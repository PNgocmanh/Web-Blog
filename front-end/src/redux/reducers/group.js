import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
    name: 'group',
    initialState:{
        createGroup:{
            error: null,
        },
        createArticle:{
            error: null
        },
        deleteArticle:{
            success: false
        },
        getGroupList:{
            listGroup: '',
        },
        getGroup:{
            group: '',
        },
        deleteGroup:{
            success: false
        },
        actionGroup:{
            join: false,
            leave: false
        },
        member: null,
    },
    reducers:{
        getGroup: (state, action) => {
            state.getGroup.group = action.payload;
        },
        getListGroup: (state, action) => {
            state.getGroupList.listGroup = action.payload;
        },
        createGroupFail: (state, action) => {
            state.createGroup.error = action.payload;
        },
        createArticleGroupFail: (state, action) => {
            state.createArticle.error = action.payload;
        },
        deleteArticleGroup: (state, action) => {
            state.deleteArticle.success = action;
        },
        actionJoinGroup: (state, action) => {
            state.actionGroup.join = action.payload; 
        },
        actionLeaveGroup: (state, action) => {
            state.actionGroup.leave = action.payload; 
        },
        memberGroup: (state, action) => {
            state.member = action.payload;
        }

    }
});

export const {
    getGroup,
    getListGroup,
    createGroupFail,
    getArticle,
    createArticleGroupFail,
    deleteArticleGroup,
    actionJoinGroup,
    actionLeaveGroup,
    memberGroup,

} = groupSlice.actions;

export default groupSlice.reducer;