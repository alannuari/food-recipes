import {SHOW_CATEGORIES} from '../type';
import firestore from '@react-native-firebase/firestore';

export const fetchCategory = () => {
  return async dispatch => {
    let data = [];
    try {
      firestore()
        .collection('Categories')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            data.push({...doc.data(), id: doc.id});
          });
          dispatch({
            type: SHOW_CATEGORIES,
            payload: data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};
