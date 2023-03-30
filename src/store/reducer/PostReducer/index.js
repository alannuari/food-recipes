import {LOADING_POSTS, SHOW_POSTS} from '../../type';

const initialState = {
  data: [],
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
        loading: false,
      };
    default:
      return state;
  }
};

export default PostReducer;
