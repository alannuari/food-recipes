import {LOADING_POSTS, SHOW_POSTS} from '../../type';

const initialState = {
  data: [],
  total: 0,
  loading: true,
  error: false,
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loading: true,
      };
    case SHOW_POSTS:
      return {
        ...state,
        data: action.payload,
        total: action.payload.length,
        loading: false,
      };
    default:
      return state;
  }
};

export default PostReducer;
