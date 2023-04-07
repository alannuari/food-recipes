import {LOADING_FAVORITES, SHOW_FAVORITES, TOGGLE_FAVORITES} from '../../type';

const initialState = {
  data: [],
  total: 0,
  loading: true,
  error: false,
};

const FavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FAVORITES:
      return {
        ...state,
        loading: true,
      };
    case SHOW_FAVORITES:
      return {
        ...state,
        data: action.payload,
        total: action.payload.length,
        loading: false,
      };
    case TOGGLE_FAVORITES:
      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === action.payload) {
            return {...item, favorite: item.favorite};
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

export default FavoriteReducer;
