import React, {useLayoutEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RecipeItem from '../components/RecipeItem';
import SkeletonItem from '../components/SkeletonItem';
import {fetchRecipe} from '../store/action/recipe';
import NotFoundScreen from './NotFoundScreen';

const RecipeScreen = ({route, navigation}) => {
  const {data, loading} = useSelector(state => state.recipe);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchRecipe(route.params));
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

export default RecipeScreen;
