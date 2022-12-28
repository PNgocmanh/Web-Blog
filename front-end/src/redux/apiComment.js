import {
    createFailed,
    
} from './reducers/comment';
import AxiosInstance from './AxiosInstance';
import Swal from 'sweetalert2';

export const createComment = async (comment, slug, dispatch, navigate) => {
    try {
        await AxiosInstance.post(`/articles/${slug}/comments`, comment);
        dispatch(createFailed(null));
        navigate(`/articles/${slug}`);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data[0].msg,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                if(error.response.data[0].msg === "Article was deleted")
                    navigate('/');
            }
        })
        dispatch(createFailed(error.response.data[0].msg));
    }
}

export const createCommentGroup = async (comment, slug, dispatch, navigate) => {
    try {
        await AxiosInstance.post(`/articles/${slug}/comments`, comment);
        dispatch(createFailed(null));
        //navigate(`/groups/${slug}`)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data[0].msg,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                if(error.response.data[0].msg === "Article was deleted")
                    navigate('/');
            }
        })
        dispatch(createFailed(error.response.data[0].msg));
    }
}

