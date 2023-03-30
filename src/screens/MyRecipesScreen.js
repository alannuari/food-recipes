import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigations/AuthProvider';
import RecipeItem from '../components/RecipeItem';
import SkeletonItem from '../components/SkeletonItem';

const MyRecipesScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let arr = [];
    try {
      setLoading(true);
      firestore()
        .collection('Posts')
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            arr.push({...doc.data(), id: doc.id});
          });
          setData(arr);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

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
            <RecipeItem
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

export default MyRecipesScreen;
