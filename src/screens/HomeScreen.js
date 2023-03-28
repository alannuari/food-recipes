import React, {useLayoutEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CategoryItem from '../components/CategoryItem';
import SkeletonItem from '../components/SkeletonItem';
import {fetchCategory} from '../store/action/category';

const HomeScreen = ({navigation}) => {
  const {data, loading} = useSelector(state => state.category);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={loading ? Array(8).fill() : data}
        renderItem={({item}) => {
          return loading ? (
            <SkeletonItem />
          ) : (
            <CategoryItem
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
});

export default HomeScreen;
