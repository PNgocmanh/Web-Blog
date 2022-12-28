import AxiosInstance from './AxiosInstance';
import {
    getGroup,
    getListGroup,
    createGroupFail,
    createArticleGroupFail,
    deleteArticleGroup,
    actionJoinGroup,
    actionLeaveGroup,
    memberGroup,
    
} from './reducers/group';
import Swal from 'sweetalert2';

export const createGroup = async (data, dispatch, navigate) => {
    try {
        await AxiosInstance.post(`/groups`, data);
        dispatch(createGroupFail(null));
        Swal.fire({
            title: 'Create Group Successful',
            icon: 'success'
        })
        navigate(`/groups/${data.groupName}`);
    } catch (error) {
        dispatch(createGroupFail(error.response.data[0].msg));
    }
}

export const createArticleGroup = async (data, groupName, dispatch, navigate) => {
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
        await AxiosInstance.post(`/groups/${groupName}/articles`, data);
        dispatch(createArticleGroupFail(null));
        Toast.fire({
            icon: 'success',
            title: 'Create Article successfully'
        });
        navigate(`/groups/${groupName}`);
    } catch (error) {
        dispatch(createArticleGroupFail(error.response.data[0].msg));
        Toast.fire({
            icon: 'error',
            title: error.response.data[0].msg
        });
    }
}

export const deleteArticlesGroup = async (slug, groupName, dispatch) => {
    try {
        await AxiosInstance.delete(`/groups/${groupName}/articles/${slug}`);
        dispatch(deleteArticleGroup(true));
    } catch (error) {
        dispatch(deleteArticleGroup(false));
    }
}

export const getGroupDetails = async (groupName, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/groups/${groupName}`);
        dispatch(getGroup(res.data));
    } catch (error) {
        dispatch(getGroup(null));
    }
}

export const getMemberGroup = async (groupName, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/groups/${groupName}/member`);
        dispatch(memberGroup(res.data.members));
    } catch (error) {
        dispatch(memberGroup(error));
    }
}

export const getAllGroup = async (dispatch) => {
    try {
        const res = await AxiosInstance.get(`/groups`);
        dispatch(getListGroup(res.data.group));
    } catch (error) {
        dispatch(getListGroup(null));
    }
}

export const deleteGroup = async (groupName, dispatch, navigate) => {
    try {
        await AxiosInstance.delete(`/groups/${groupName}`);
        //dispatch(createGroupSuccess());
        navigate(`/groups`);
    } catch (error) {
        //dispatch(createGroupFail());
    }
}

export const joinGroup = async (groupName, username, dispatch) => {
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
        await AxiosInstance.post(`/groups/${username}/join/${groupName}`);
        dispatch(actionJoinGroup(true));
        Toast.fire({
            icon: 'success',
            title: 'Join Group successfully'
        });
        //navigate(`/groups/${groupName}`);   
    } catch (error) {
        dispatch(actionJoinGroup(false));
        Toast.fire({
            icon: 'error',
            title: "SomethingWrong"
        });
    }
}

export const leaveGroup = async (groupName, username, dispatch) => {
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
        await AxiosInstance.post(`/groups/${username}/leave/${groupName}`);
        dispatch(actionLeaveGroup(true));
        Toast.fire({
            icon: 'success',
            title: 'You have left the group'
        });
        //navigate(`/groups`);
    } catch (error) {
        dispatch(actionLeaveGroup(false));
        Toast.fire({
            icon: 'error',
            title: "SomethingWrong"
        });
    }
}

export const updateArticleGroup = async (slug, groupName, data, navigate) => {
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
        navigate(`/groups/${groupName}`);
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