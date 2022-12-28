import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: 'article',
    initialState:{
        createComment:{
            error: null,
        },
        getComment:{
            comment: '',
        },
    },
    reducers:{
        createFailed: (state, action) => {
            state.createComment.error = action.payload;
        },
    }
});

export const {
    createFailed,

} = commentSlice.actions;

export default commentSlice.reducer;