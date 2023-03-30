import {combineReducers} from 'redux';
import CategoryReducer from './CategoryReducer';
import FavoriteReducer from './FavoriteReducer';
import PostReducer from './PostReducer';
import RecipeReducer from './RecipeReducer';

const rootReducer = combineReducers({
  category: CategoryReducer,
  recipe: RecipeReducer,
  favorite: FavoriteReducer,
  post: PostReducer,
});

export default rootReducer;
