import {
    ADD_GROUP,
    GET_GROUPS,
    GET_GROUP,
    DELETE_GROUP,
    UPDATE_GROUP,
    GROUP_ERROR,
  } from '../actions/types';
  
  const initialState = {
    group: null,
    groups: [],
    loading: true,
    error: {},
  };
  
  export default function eventReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_GROUP:
        return {
          ...state,
          events: [payload, ...state.events],
          loading: false,
        };
      case GET_GROUP:
      case UPDATE_GROUP:
        return {
          ...state,
          event: payload,
          loading: false,
        };
      case GET_GROUPS:
        return {
          ...state,
          groups: payload,
          loading: false,
        };
      case GROUP_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case DELETE_GROUP:
        return {
          ...state,
          events: state.events.filter((event) => event._id !== payload),
          loading: false,
        };
      default:
        return state;
    }
  }
  