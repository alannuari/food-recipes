import {LOADING_RECIPES, SHOW_RECIPES} from '../../type';

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RECIPES:
      return {
        ...state,
        loading: true,
      };
    case SHOW_RECIPES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default RecipeReducer;
