import {
    createFailed,
    getSuccess,
    getUserArticleSuccess,
    getFavoriteArticleSuccess,
    getFeedSuccess,
    favorite,
    unfavorite,
    getArticleGroup,
    articleByTag,
    getListArticlePage
    
} from './reducers/article';

import Swal from 'sweetalert2';
import AxiosInstance from './AxiosInstance';

export const createArticle = async (article, username, dispatch, navigate) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    try {
        const res = await AxiosInstance.post("/articles", article);
        dispatch(createFailed(null));
        Toast.fire({
            icon: 'success',
            title: 'Create Article successfully'
        });
        navigate(`/articles/${res.data.slug}`)
    } catch (error) {
        dispatch(createFailed(error.response.data[0].msg));
        Toast.fire({
            icon: 'error',
            title: error.response.data[0].msg
        });
    }
}

export const favoriteArticle = async (slug, dispatch) => {
    try {
        await AxiosInstance.post(`/articles/${slug}/favorite`);
        dispatch(favorite(true));
    } catch (error) {
        dispatch(favorite(false));
    }
}

export const unfavoriteArticle = async (slug, dispatch) => {
    try {
        await AxiosInstance.delete(`/articles/${slug}/favorite`);
        dispatch(unfavorite(false));
    } catch (error) {
        dispatch(unfavorite(true));
    }
}

export const getGroupArticles = async (groupName, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/groups/${groupName}/articles`);
        dispatch(getArticleGroup(res.data.articles));
    } catch (error) {
        dispatch(getArticleGroup(null));
    }
}

export const getArticle = async (slug, dispatch, navigate) => {
    try {
        const res = await AxiosInstance.get(`/articles/${slug}`);
        dispatch(getSuccess(res.data));
    } catch (err) {
        dispatch(getSuccess(null));
        navigate("/404");
    }
}

export const getFeed = async (limit, offset, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/articles/feed?limit=${limit}&offset=${offset}`);
        dispatch(getFeedSuccess(res.data));
    } catch (err) {
        dispatch(getFeedSuccess(null));
    }
}

export const getArticlePage = async (limit, offset, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/articles?limit=${limit}&offset=${offset}`);
        dispatch(getListArticlePage(res.data));
    } catch (err) {
        dispatch(getListArticlePage(null));
    }
}

export const getUserArticle = async (username, limit, offset, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/articles?author=${username}&limit=${limit}&offset=${offset}`);
        dispatch(getUserArticleSuccess(res.data));
    } catch (err) {
        dispatch(getUserArticleSuccess(null));
    }
}

export const getFavoriteArticle = async (username, limit, offset, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/articles?favorited=${username}&limit=${limit}&offset=${offset}`);
        dispatch(getFavoriteArticleSuccess(res.data));
    } catch (err) {
        dispatch(getFavoriteArticleSuccess(null));
    }
}

export const getTagsArticle = async (tags, limit, offset, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/articles?tags=${tags}&limit=${limit}&offset=${offset}`);
        dispatch(articleByTag(res.data));
    } catch (err) {
        dispatch(articleByTag(null));
    }
}

export const deleteArticle = async (slug, dispatch, navigate) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AxiosInstance.delete(`/articles/${slug}`);
                navigate('/');
                Swal.fire(
                'Deleted!',
                'Your Article has been deleted.',
                'success'
                )
            }
        })
    } catch (err) {
        navigate('/404');
    }
}

export const updateArticle = async (slug, username, data, dispatch, navigate) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    try {
        await AxiosInstance.put(`/articles/${slug}`, data);
        Toast.fire({
            icon: 'success',
            title: 'Update Article successfully'
        });
        navigate(`/profiles/${username}`);
    } catch (error) {
        if(error.response.data.error !== undefined){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error.msg,
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/');
                }
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: error.response.data[0].msg
            });
        }
        
    }
}