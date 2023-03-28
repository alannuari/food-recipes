import {SHOW_CATEGORIES} from '../../type';

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CATEGORIES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
