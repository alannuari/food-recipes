import {LOADING_FAVORITES, SHOW_FAVORITES} from '../type';
import firestore from '@react-native-firebase/firestore';

export const fetchFavorite = userId => {
  return async dispatch => {
    let data = [];
    dispatch({type: LOADING_FAVORITES});
    try {
      firestore()
        .collection('Posts')
        .where('favorite', 'array-contains', userId)
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

export const toggleFavorite = (data, userId) => {
  return async dispatch => {
    firestore()
      .collection('Posts')
      .doc(data.id)
      .update({
        ...data,
        favorite: data.favorite.includes(userId)
          ? data.favorite.splice(data.favorite.indexOf(userId), 1)
          : data.favorite.push(userId),
      })
      .then(() => {
        dispatch(fetchFavorite());
      })
      .catch(error => console.log(error));
  };
};
