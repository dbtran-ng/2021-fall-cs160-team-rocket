import axios from "axios";
import { setAlert } from "./alert";
import {
    ADD_GROUP,
    GET_GROUPS,
    GET_GROUP,
    DELETE_GROUP,
    GROUP_ERROR,
  } from './types';
//add group
export const addEvent = (formData) => async (dispatch) =>{
    try {
        const res = await axios.post('/api/event',formData);
        dispatch({
            type: ADD_GROUP,
            payload: res.data
        });
        dispatch(setAlert('Successfully Added a Group','success'));
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
// get group by ID
export const getGroupById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/group/${id}`);

        dispatch({
            type: GET_GROUP,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
// get all groups
export const getGroups = () => async dispatch => {
    try {
        const res = await axios.get('/api/group');

        dispatch({
            type: GET_GROUPS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
// delete Group By Id
export const deleteGroupById = (id) => async dispatch => {
    try {
        await axios.delete(`/api/group/${id}`);

        dispatch({
            type: DELETE_GROUP,
            payload: id
        });
        dispatch(setAlert('This event has been deleted!'));
    } catch (err) {
        dispatch({
            type: GROUP_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};