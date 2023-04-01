import React, {useContext, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import Fork from '../assets/icons/fork.svg';
import Clock from '../assets/icons/clock.svg';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonIcon from '../components/HeaderButtonIcon';
import {toggleFavorite} from '../store/action/favorite';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Loading from '../components/Loading';
import complexities from '../data/tr_complexities.json';
import {AuthContext} from '../navigations/AuthProvider';
import {fetchPost} from '../store/action/post';
import {fetchRecipe} from '../store/action/recipe';

const DetailsScreen = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const deletePostHandler = async detail => {
    try {
      const storageRef = storage().refFromURL(detail.imageUrl);
      const imageRef = storage().ref(storageRef.fullPath);

      await imageRef.delete();
      await firestore().collection('Recipes').doc(detail.id).delete();

      Alert.alert('Success', 'Recipe has been deleted successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
      dispatch(fetchRecipe(detail.category));
      dispatch(fetchPost(user.uid));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete recipe!', [
        {
          text: 'OK',
        },
      ]);
      console.log(error);
    }
  };

  const getDataFavoritesByUser = async () => {
    let favorite = [];
    await firestore()
      .collection('Favorites')
      .where('userId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          favorite.push({...doc.data(), id: doc.id});
        });
      });

    return favorite.map(item => item.recipeId);
  };

  const getDetails = async () => {
    let obj = {};
    try {
      const favorite = await getDataFavoritesByUser();
      await firestore()
        .collection('Recipes')
        .where(firebase.firestore.FieldPath.documentId(), '==', route.params)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            obj = {...doc.data(), id: doc.id};
            setDetail(obj);
            setIsFavorite(favorite.includes(obj.id));
          });
          navigation.setOptions({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButtonIcon}>
                <Item
                  title="favorite"
                  iconName={
                    favorite.includes(obj.id) ? 'ios-star' : 'ios-star-outline'
                  }
                  onPress={async () => {
                    dispatch(toggleFavorite(obj, user.uid));
                    const favorite = await getDataFavoritesByUser();
                    setIsFavorite(favorite.includes(obj.id));
                  }}
                />
              </HeaderButtons>
            ),
          });
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getDetails();
  }, [isFavorite]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <View>
            {detail.imageUrl ? (
              <Image source={{uri: detail.imageUrl}} style={styles.image} />
            ) : null}
            <View style={styles.details}>
              <View>
                <Clock height={20} style={{marginBottom: 5}} />
                <Text>{detail.duration} minutes</Text>
              </View>
              <View style={styles.line}></View>
              <View>
                <Fork height={20} style={{marginBottom: 5}} />
                <Text>
                  {
                    complexities.data.find(
                      item => item.id === detail.complexity,
                    )?.name
                  }
                </Text>
              </View>
            </View>
            <Text style={styles.title}>{detail.title}</Text>
            <Text style={styles.ingredient}>Ingredients :</Text>
            {detail.ingredients?.map((item, idx) => (
              <Text style={styles.item} key={idx}>
                ~ {item.value}
              </Text>
            ))}
            <Text style={styles.step}>Steps :</Text>
            {detail.steps?.map((item, idx) => (
              <Text style={styles.item} key={idx}>
                {idx + 1}. {item.value}
              </Text>
            ))}
          </View>
        )}
      </View>
      {detail?.userId === user.uid && (
        <View style={styles.btn}>
          <Button
            onPress={() => deletePostHandler(detail)}
            title="Delete"
            radius={'sm'}
            type="solid"
            color="#ff7171"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  image: {
    height: 200,
    borderRadius: 15,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  line: {
    width: 2,
    backgroundColor: 'gray',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'blue',
  },
  ingredient: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: 10,
  },
  step: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: 10,
  },
  item: {
    marginLeft: 10,
    lineHeight: 22,
  },
  btn: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default DetailsScreen;
