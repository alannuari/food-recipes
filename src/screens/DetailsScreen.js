import React, {useContext, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, ScrollView, Image, StyleSheet, Button} from 'react-native';
import Fork from '../assets/icons/fork.svg';
import Clock from '../assets/icons/clock.svg';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonIcon from '../components/HeaderButtonIcon';
import {toggleFavorite} from '../store/action/favorite';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import complexities from '../data/tr_complexities.json';
import {AuthContext} from '../navigations/AuthProvider';

const DetailsScreen = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const {data} = useSelector(state => state.favorite);
  const dispatch = useDispatch();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    try {
      let obj = {};
      setLoading(true);
      firestore()
        .collection('Posts')
        .where(firebase.firestore.FieldPath.documentId(), '==', route.params)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            obj = {...doc.data(), id: doc.id};
            setDetail(obj);
          });
          setLoading(false);
          navigation.setOptions({
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButtonIcon}>
                <Item
                  title="favorite"
                  iconName={obj.isFavorite ? 'ios-star' : 'ios-star-outline'}
                  onPress={() => dispatch(toggleFavorite(obj))}
                />
              </HeaderButtons>
            ),
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [dispatch, data.length]);

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
            onPress={() => console.log('delete')}
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
