import {LOADING_FAVORITES, SHOW_FAVORITES} from '../type';
import firestore from '@react-native-firebase/firestore';

export const fetchFavorite = userId => {
  return async dispatch => {
    let data = [];
    dispatch({type: LOADING_FAVORITES});
    try {
      firestore()
        .collection('Posts')
        .where('isFavorite', '==', true)
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push({...doc.data(), id: doc.id});
          });
          dispatch({
            type: SHOW_FAVORITES,
            payload: data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const toggleFavorite = data => {
  return async dispatch => {
    firestore()
      .collection('Posts')
      .doc(data.id)
      .update({
        ...data,
        isFavorite: !data.isFavorite,
      })
      .then(() => {
        dispatch(fetchFavorite());
      })
      .catch(error => console.log(error));
  };
};
