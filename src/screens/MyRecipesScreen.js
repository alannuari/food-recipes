import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigations/AuthProvider';
import RecipeItem from '../components/RecipeItem';
import SkeletonItem from '../components/SkeletonItem';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPost} from '../store/action/post';
import NotFoundScreen from './NotFoundScreen';

const MyRecipesScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const {data, loading} = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(user.uid));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <FlatList
          numColumns={2}
          data={Array(8).fill()}
          renderItem={() => <SkeletonItem />}
        />
      ) : data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
          renderItem={({item}) => (
            <RecipeItem
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <NotFoundScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
});

export default MyRecipesScreen;
