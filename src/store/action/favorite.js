import {LOADING_FAVORITES, SHOW_FAVORITES} from '../type';
import firestore, {firebase} from '@react-native-firebase/firestore';

export const fetchFavorite = userId => {
  return async dispatch => {
    let dataRelation = [];
    let favorite = [];
    dispatch({type: LOADING_FAVORITES});
    try {
      firestore()
        .collection('Favorites')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            dataRelation.push({...doc.data(), id: doc.id});
          });
          if (dataRelation.length > 0) {
            firestore()
              .collection('Recipes')
              .where(
                firebase.firestore.FieldPath.documentId(),
                'in',
                dataRelation.map(item => item.recipeId),
              )
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  favorite.push({...doc.data(), id: doc.id});
                });
                dispatch({
                  type: SHOW_FAVORITES,
                  payload: favorite,
                });
              });
          } else {
            dispatch({
              type: SHOW_FAVORITES,
              payload: favorite,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const toggleFavorite = (data, userId) => {
  let favorite = [];
  return async dispatch => {
    try {
      await firestore()
        .collection('Favorites')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            favorite.push({...doc.data(), id: doc.id});
          });
        });

      if (favorite.map(item => item.recipeId).includes(data.id)) {
        const favoriteId = favorite.find(item => item.recipeId === data.id)?.id;
        await firestore().collection('Favorites').doc(favoriteId).delete();
      } else {
        await firestore().collection('Favorites').add({
          userId: userId,
          recipeId: data.id,
        });
      }
      dispatch(fetchFavorite(userId));
    } catch (error) {
      console.log(error);
    }
  };
};
