import {
  ADD_EVENT,
  GET_EVENTS,
  GET_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  EVENT_ERROR,
  JOIN_EVENT,
} from "../actions/types";

const initialState = {
  event: null,
  events: [],
  loading: true,
  error: {},
};

export default function eventReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [payload, ...state.events],
        loading: false,
      };
    case GET_EVENT:
    case EDIT_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
      };
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    case JOIN_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === payload.id
            ? { ...event, listMembers: payload.listMembers }
            : event
        ),
        loading: false,
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
