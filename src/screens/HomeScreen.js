import React, {useLayoutEffect, useContext} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from '../components/Carousel';
import CategoryItem from '../components/CategoryItem';
import SkeletonItem from '../components/SkeletonItem';
import {AuthContext} from '../navigations/AuthProvider';
import {fetchCategory} from '../store/action/category';
import {fetchFavorite} from '../store/action/favorite';

const HomeScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const {data, loading} = useSelector(state => state.category);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchFavorite(user.uid));
  }, [dispatch, user.uid]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Carousel />
        <Text style={styles.category}>Food Categories</Text>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {loading
            ? Array(6)
                .fill()
                .map((_, idx) => <SkeletonItem key={idx} />)
            : data.map((item, idx) => (
                <CategoryItem
                  key={idx}
                  id={item.id}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  navigation={navigation}
                />
              ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 5,
    marginBottom: 5,
    marginHorizontal: 5,
    backgroundColor: '#e1e1e1',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
