import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      const i = state.screams.findIndex((scream) => scream.screamID === action.payload.screamId);
      state.screams[i] = action.payload;
      return {
        ...state,
      };
    }
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
