import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name: 'article',
    initialState:{
        createArticle:{
            errMsg: null
        },
        favorite: false,
        // lấy chi tiết
        getArticle:{
            articles: '',
        },
        articleGroup:{
            article: '',
        },
        getPage: '',
        // lay follow
        getFeed:{
            feedArticles: '',
        },
        getTagArticle:{
            articleTag: null,
        },
        // lấy list
        getListArticle:{
            articleList: '',
        },
        // lấy theo từng user
        getUserArticle:{
            articleUser: null,
        },
        getFavoriteArticle:{
            favoriteArticle: null,
        },
    },
    reducers:{
        createFailed: (state, action) => {
            state.createArticle.errMsg = action.payload;
        },
        getArticleGroup: (state, action) => {
            state.articleGroup.article = action.payload;
        },
        favorite: (state, action) => {
            state.favorite = action.payload;
        },
        unfavorite: (state, action) => {
            state.favorite = action.payload;
        },
        getSuccess: (state, action) => {
            state.getArticle.articles = action.payload;
        },
        getListSuccess: (state, action) => {
            state.getListArticle.articleList = action.payload;
        },
        getFeedSuccess: (state, action) => {
            state.getFeed.feedArticles = action.payload;
        },
        getUserArticleSuccess: (state, action) => {
            state.getUserArticle.articleUser = action.payload;
        },
        getFavoriteArticleSuccess: (state, action) => {
            state.getFavoriteArticle.favoriteArticle = action.payload;
        },
        articleByTag: (state, action) => {
            state.getTagArticle.articleTag = action.payload;
        },
        getListArticlePage: (state, action) => {
            state.getPage = action.payload;
        }
    }
});

export const {
    createFailed,
    favorite,
    unfavorite,
    getArticleGroup,
    getSuccess,
    getFeedSuccess,
    getUserArticleSuccess,
    getFavoriteArticleSuccess,
    articleByTag,
    getListArticlePage

} = articleSlice.actions;

export default articleSlice.reducer;