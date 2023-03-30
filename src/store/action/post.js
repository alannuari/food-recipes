import {LOADING_POSTS, SHOW_POSTS} from '../type';
import firestore from '@react-native-firebase/firestore';

export const fetchPost = userId => {
  return async dispatch => {
    let data = [];
    dispatch({type: LOADING_POSTS});
    try {
      firestore()
        .collection('Posts')
        .where('userId', '==', userId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push({...doc.data(), id: doc.id});
          });
          dispatch({type: SHOW_POSTS, payload: data});
        });
    } catch (error) {
      console.log(error);
    }
  };
};
