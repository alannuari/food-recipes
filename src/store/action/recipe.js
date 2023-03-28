import {LOADING_RECIPES, SHOW_RECIPES} from '../type';
import firestore from '@react-native-firebase/firestore';

export const fetchRecipe = id => {
  return async dispatch => {
    let data = [];
    dispatch({type: LOADING_RECIPES});
    try {
      firestore()
        .collection('Posts')
        .where('category', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push({...doc.data(), id: doc.id});
          });
          dispatch({
            type: SHOW_RECIPES,
            payload: data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};
