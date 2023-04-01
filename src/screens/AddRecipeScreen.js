import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputComponent from '../components/InputComponent';
import randomIndex from '../helper/randomIndex';
import {AuthContext} from '../navigations/AuthProvider';
import ButtonComponent from '../components/ButtonComponent';
import SelectComponent from '../components/SelectComponent';
import categories from '../data/tr_categories.json';
import complexities from '../data/tr_complexities.json';
import {useDispatch} from 'react-redux';
import {fetchPost} from '../store/action/post';
import ImageCropPicker from 'react-native-image-crop-picker';

const AddRecipeScreen = () => {
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [complexity, setComplexity] = useState('');
  const [ingredients, setIngredients] = useState([
    {
      id: randomIndex(),
      value: '',
    },
  ]);
  const [steps, setSteps] = useState([
    {
      id: randomIndex(),
      value: '',
    },
  ]);

  const addIngredientHandler = () => {
    setIngredients([
      ...ingredients,
      {
        id: randomIndex(),
        value: '',
      },
    ]);
  };

  const deleteIngredientHandler = id => {
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  const addStepHandler = () => {
    setSteps([
      ...steps,
      {
        id: randomIndex(),
        value: '',
      },
    ]);
  };

  const deleteStepHandler = id => {
    setSteps(steps.filter(item => item.id !== id));
  };

  const submitHandler = () => {
    const validIngredients = !ingredients.map(item => item.value).includes('');
    const validSteps = !steps.map(item => item.value).includes('');
    if (
      title &&
      category &&
      duration &&
      complexity &&
      validIngredients &&
      validSteps
    ) {
      setLoading(true);
      firestore()
        .collection('Posts')
        .add({
          userId: user.uid,
          category,
          title,
          complexity,
          imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
          duration,
          ingredients,
          steps,
          isFavorite: false,
        })
        .then(() => {
          setTitle('');
          setCategory('');
          setDuration('');
          setComplexity('');
          setSteps([
            {
              id: randomIndex(),
              value: '',
            },
          ]);
          setIngredients([
            {
              id: randomIndex(),
              value: '',
            },
          ]);
          dispatch(fetchPost(user.uid));
          Alert.alert('Success', 'Recipe added!', [
            {
              text: 'OK',
            },
          ]);
        })
        .catch(error => {
          Alert.alert('Error', 'Recipe failed to add!', [
            {
              text: 'OK',
            },
          ]);
          console.log('Some error: ', error);
        })
        .finally(() => setLoading(false));
    } else {
      Alert.alert('Warning', 'All data cannot be empty', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const takePhotoHandler = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 200,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => console.log(error));
  };

  const choosePhotoHandler = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 200,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(error => console.log(error));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.input}>
          <Text style={styles.label}>Image</Text>

          {image ? (
            <View>
              <Image
                source={{uri: image}}
                style={{
                  height: 200,
                  marginTop: 15,
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              />
              <View
                style={{
                  alignItems: 'center',
                  marginLeft: 'auto',
                }}>
                <Button
                  onPress={() => setImage('')}
                  radius={'sm'}
                  type="solid"
                  color="#ff7171">
                  <Ionicons name="trash" size={20} />
                </Button>
              </View>
            </View>
          ) : (
            <View style={styles.image}>
              <TouchableOpacity
                style={styles.btnImage}
                onPress={takePhotoHandler}>
                <Text>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnImage}
                onPress={choosePhotoHandler}>
                <Text>Choose From Library</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Title</Text>
          <InputComponent
            placeholder="Title"
            value={title}
            setValue={setTitle}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Category</Text>
          <SelectComponent
            placeholder="Category"
            value={category}
            setValue={setCategory}
            data={categories.data}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Duration</Text>
          <InputComponent
            placeholder="Duration (minute)"
            value={duration}
            setValue={setDuration}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Complexity</Text>
          <SelectComponent
            placeholder="Complexity"
            value={complexity}
            setValue={setComplexity}
            data={complexities.data}
          />
        </View>
        <View style={styles.array}>
          <Text style={styles.label}>Ingredients</Text>
          {ingredients.map((item, idx) => (
            <View key={item.id} style={styles.item}>
              <InputComponent
                placeholder="Ingredient"
                value={item.value}
                setValue={val =>
                  setIngredients(
                    ingredients.map(obj =>
                      obj.id === item.id ? {...obj, value: val} : obj,
                    ),
                  )
                }
              />
              {idx === 0 ? (
                <Button
                  onPress={addIngredientHandler}
                  radius={'sm'}
                  type="solid"
                  color="#e1e1e1">
                  <Ionicons name="add" size={20} />
                </Button>
              ) : (
                <Button
                  onPress={() => deleteIngredientHandler(item.id)}
                  radius={'sm'}
                  type="solid"
                  color="#ff7171">
                  <Ionicons name="trash" size={20} />
                </Button>
              )}
            </View>
          ))}
        </View>
        <View style={styles.array}>
          <Text style={styles.label}>Steps</Text>

          {steps.map((item, idx) => (
            <View key={item.id} style={styles.item}>
              <InputComponent
                placeholder="Step"
                value={item.value}
                setValue={val =>
                  setSteps(
                    steps.map(obj =>
                      obj.id === item.id ? {...obj, value: val} : obj,
                    ),
                  )
                }
              />
              {idx === 0 ? (
                <Button
                  onPress={addStepHandler}
                  radius={'sm'}
                  type="solid"
                  color="#e1e1e1">
                  <Ionicons name="add" size={20} />
                </Button>
              ) : (
                <Button
                  onPress={() => deleteStepHandler(item.id)}
                  radius={'sm'}
                  type="solid"
                  color="#ff7171">
                  <Ionicons name="trash" size={20} />
                </Button>
              )}
            </View>
          ))}
        </View>
        <ButtonComponent
          title={loading ? 'Adding...' : 'Add Recipe'}
          onPress={submitHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 22,
    borderRadius: 5,
  },
  input: {
    marginVertical: 6,
  },
  image: {
    height: 200,
    marginVertical: 15,
    rowGap: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  btnImage: {
    backgroundColor: '#e1e1e3',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  array: {
    marginVertical: 6,
  },
  item: {
    width: Dimensions.get('window').width - 90,
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default AddRecipeScreen;
