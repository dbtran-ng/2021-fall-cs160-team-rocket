import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_GROUP,
  GET_GROUPS,
  GET_GROUP,
  DELETE_GROUP,
  GROUP_ERROR,
  JOIN_GROUP,
  DISJOIN_GROUP,
  ADD_POST,
  REMOVE_POST,
  UPDATE_GROUP,
} from "./types";
//add group
export const addGroup = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/group", formData);
    dispatch({
      type: ADD_GROUP,
      payload: res.data,
    });
    dispatch(setAlert("Successfully Added a Group", "success"));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// update group
export const updateGroup = (id, formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(`/api/group/${id}`, formData, config);
      dispatch({
        type: UPDATE_GROUP,
        payload: res.data,
      });
      dispatch(setAlert('Successfully Updated Group', 'success'));
      history.push(`/group/${id}`);
    } catch (err) {
      dispatch({
        type: GROUP_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
// get group by ID
export const getGroupById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/group/${id}`);

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// get all groups
export const getGroups = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/group");

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get my groups
export const getMyGroups = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/group/me');

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//join group
export const joinGroup = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/group/join/${id}`);
    dispatch({
      type: JOIN_GROUP,
      payload: { id, listOfMembers: res.data },
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// cancel join group
export const disjoinGroup = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/group/join/cancel/${id}`);
    dispatch({
      type: DISJOIN_GROUP,
      payload: { id, listOfMembers: res.data },
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete Group By Id
export const deleteGroupById = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/group/${id}`);

    dispatch({
      type: DELETE_GROUP,
      payload: id,
    });
    dispatch(setAlert("This group has been deleted!"));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Add comment
export const addPost = (groupId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/group/post/${groupId}`, formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Announcement Added', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deletePost = (groupId, postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/group/post/${groupId}/${postId}`);

    dispatch({
      type: REMOVE_POST,
      payload: postId
    });

    dispatch(setAlert('Announcement Removed', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
