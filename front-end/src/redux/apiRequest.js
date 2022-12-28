import { 
    loginFailed,
    loginSuccess, 
    registerFailed, 
    getUserSuccess,
    getProfileSuccess,
    logoutSuccess,
    follow,
    unfollow,
} from './reducers/authSlice';

import Swal from 'sweetalert2'
import AxiosInstance from './AxiosInstance';

export const loginUser = async (user, dispatch, navigate) => {
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
        const res = await AxiosInstance.post(`/users/login`, user);
        dispatch(loginSuccess(res.data));       
        localStorage.setItem('token', res.data.token);
        Toast.fire({
            icon: 'success',
            title: 'Log in successfully'
        });
        navigate('/');
    } catch (error) {
        dispatch(loginFailed(error.response.data[0].msg));
        Toast.fire({
            icon: 'error',
            title: error.response.data[0].msg
        });
    }
}

export const registerUser = async (user, dispatch, navigate) => {
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
        await AxiosInstance.post(`/users`, user);
        Toast.fire({
            icon: 'success',
            title: 'Sign up successfully'
        });
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed(error.response.data[0].msg));
        Toast.fire({
            icon: 'error',
            title: error.response.data[0].msg
        });
    }
}

export const followUser = async (username, dispatch) => {
    try {
        await AxiosInstance.post(`/profiles/${username}/follow`);
        dispatch(follow(true));
    } catch (error) {
        dispatch(follow(false));
    }
}

export const unfollowUser = async (username, dispatch) => {
    try {
        await AxiosInstance.delete(`/profiles/${username}/follow`);
        dispatch(unfollow(false));
    } catch (error) {
        dispatch(unfollow(true));
    }
}

export const getUser = async (dispatch) => {
    try {
        const res = await AxiosInstance.get(`/user`);
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        //dispatch(getUserSuccess(null));
    }
}

export const updateUser = async (user, navigate) => {
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
        const res = await AxiosInstance.put(`/user`, user);
        localStorage.clear();
        localStorage.setItem('token', res.data.token);
        Toast.fire({
            icon: 'success',
            title: 'Update successfully'
        });
        navigate(`/profiles/${user.username}`);
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: error.response.data[0].msg
        });
    }
}

export const changePassword = async (password, username, navigate) => {
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
        await AxiosInstance.put(`/user/change/password`,password);
        Toast.fire({
            icon: 'success',
            title: 'Change Password successfully'
        });
        navigate(`/profiles/${username}`);
    } catch (error) {
        console.log(error.response)
        Toast.fire({
            icon: 'error',
            title: error.response.data[0].msg
        });
    }
}

export const logoutUser = async (dispatch) => {
    try {
        dispatch(logoutSuccess());
        localStorage.clear();
        //window.location.reload();
    } catch (error) {
        //dispatch(logoutFailed());
    }
}

export const getProfile = async (username, dispatch) => {
    try {
        const res = await AxiosInstance.get(`/profiles/${username}` );
        dispatch(getProfileSuccess(res.data.profile));
    } catch (error) {
        dispatch(getProfileSuccess(null));
    }
}