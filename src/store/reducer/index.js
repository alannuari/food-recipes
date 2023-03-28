import {combineReducers} from 'redux';
import CategoryReducer from './CategoryReducer';
import FavoriteReducer from './FavoriteReducer';
import RecipeReducer from './RecipeReducer';

const rootReducer = combineReducers({
  category: CategoryReducer,
  recipe: RecipeReducer,
  favorite: FavoriteReducer,
});

export default rootReducer;
