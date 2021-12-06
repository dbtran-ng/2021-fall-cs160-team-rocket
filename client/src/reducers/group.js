import {
  ADD_GROUP,
  GET_GROUPS,
  GET_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP,
  GROUP_ERROR,
  JOIN_GROUP,
  DISJOIN_GROUP,
  ADD_POST,
  REMOVE_POST,
} from '../actions/types';

const initialState = {
  group: null,
  groups: [],
  loading: true,
  error: {},
};

export default function groupReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [payload, ...state.groups],
        loading: false,
      };
    case GET_GROUP:
    case UPDATE_GROUP:
      return {
        ...state,
        group: payload,
        loading: false,
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: payload,
        loading: false,
      };
    case JOIN_GROUP:
    case DISJOIN_GROUP:
      return {
        ...state,
        groups: state.groups.map((group) =>
          group._id === payload.id
            ? { ...group, listOfMembers: payload.listOfMembers }
            : group
        ),
        loading: false,
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        group: { ...state.group, posts: payload },
        loading: false,
      };
    case REMOVE_POST:
      return {
        ...state,
        group: state.group.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
