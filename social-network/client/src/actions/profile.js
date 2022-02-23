import axios from "axios";
import {
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
} from "./types";
import {setAlert} from "./alert";

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }

}

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}

// Get all profile by ID
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}

// Get GitHub repos
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}


// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        setAlert(err => dispatch(setAlert(err.msg), 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('api/profile/experience', formData, config);
        console.log('*** LOG *** ', res);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');

    } catch (err) {
        setAlert(err => dispatch(setAlert(err.msg), 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');

    } catch (err) {
        setAlert(err => dispatch(setAlert(err.msg), 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        setAlert(err => dispatch(setAlert(err.msg), 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        setAlert(err => dispatch(setAlert(err.msg), 'danger'));

        dispatch({
            type: PROFILE_ERROR,
            payload: err.message,
        });
    }
}

// Delete account and profile
export const deleteAccount = id => async dispatch => {
    if (window.confirm('Aree you sure? THis can NOT be undone!')) {
        try {
            await axios.delete(' /api/profile/');

            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETED
            });

            dispatch(setAlert('Your account has been deleted'));
        } catch (err) {
            setAlert(err => dispatch(setAlert(err.msg), 'danger'));

            dispatch({
                type: PROFILE_ERROR,
                payload: err.message,
            });
        }
    }
}

