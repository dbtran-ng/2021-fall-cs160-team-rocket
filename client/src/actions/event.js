import axios from "axios";
import { setAlert } from "./alert";
import{
    ADD_EVENT,
    DELETE_EVENT,
    GET_EVENT,
    GET_EVENTS,
    JOIN_EVENT,
    EVENT_ERROR
} from './types';
//add event
export const addEvent = (formData) => async (dispatch) =>{
    try {
        const res = await axios.post('/api/event',formData);
        dispatch({
            type: ADD_EVENT,
            payload: res.data
        });
        dispatch(setAlert('Successfully Added an Event','success'));
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
// get event by ID
export const getEventById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/event/${id}`);

        dispatch({
            type: GET_EVENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
// get all events
export const getEvents = () => async dispatch => {
    try {
        const res = await axios.get('/api/event');

        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// join event
export const joinEvent = (id) => async dispatch =>{
    try {
        const res = await axios.put(`/api/event/join/${id}`);
        dispatch({
            type: JOIN_EVENT,
            payload: {id, listMembers: res.data}
        });

    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
// delete Event By Id
export const deleteEventById = (id) => async dispatch => {
    try {
        await axios.delete(`/api/event/${id}`);

        dispatch({
            type: DELETE_EVENT,
            payload: id
        });
        dispatch(setAlert('This event has been deleted!'));
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};