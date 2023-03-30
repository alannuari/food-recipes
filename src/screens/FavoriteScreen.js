import React, {useLayoutEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteItem from '../components/FavoriteItem';
import SkeletonFavorite from '../components/SkeletonFavorite';
import {AuthContext} from '../navigations/AuthProvider';
import {fetchFavorite} from '../store/action/favorite';
import NotFoundScreen from './NotFoundScreen';

const FavoriteScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const {data, loading} = useSelector(item => item.favorite);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchFavorite(user.uid));
  }, [dispatch, user.uid]);

  return (
    <View style={styles.container}>
      {loading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={Array(5).fill()}
          renderItem={() => <SkeletonFavorite />}
        />
      ) : data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={data}
          renderItem={({item}) => (
            <FavoriteItem
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              complexity={item.complexity}
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

export default FavoriteScreen;
