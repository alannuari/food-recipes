import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputComponent from '../components/InputComponent';
import randomIndex from '../helper/randomIndex';
import {AuthContext} from '../navigations/AuthProvider';
import ButtonComponent from '../components/ButtonComponent';

const AddRecipeScreen = () => {
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const [title, setTitle] = useState('');
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
          Alert.alert('Success', 'Recipe added!', [
            {
              text: 'OK',
            },
          ]);
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.input}>
          <InputComponent
            placeholder="Title"
            label="Title"
            value={title}
            setValue={setTitle}
          />
        </View>
        <View style={styles.input}>
          <InputComponent
            placeholder="Category"
            label="Category"
            value={category}
            setValue={setCategory}
          />
        </View>
        <View style={styles.input}>
          <InputComponent
            placeholder="Duration (minute)"
            label="Duration"
            value={duration}
            setValue={setDuration}
          />
        </View>
        <View style={styles.input}>
          <InputComponent
            placeholder="Complexity"
            label="Complexity"
            value={complexity}
            setValue={setComplexity}
          />
        </View>
        <View style={styles.array}>
          {ingredients.map((item, idx) => (
            <View key={item.id} style={styles.item}>
              <InputComponent
                placeholder="Ingredient"
                label={idx === 0 ? 'Ingredients' : ''}
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
          {steps.map((item, idx) => (
            <View key={item.id} style={styles.item}>
              <InputComponent
                placeholder="Step"
                label={idx === 0 ? 'Steps' : ''}
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
    padding: 8,
    borderRadius: 5,
  },
  input: {
    marginVertical: 6,
  },
  array: {
    marginVertical: 6,
  },
  item: {
    width: Dimensions.get('window').width - 90,
    flexDirection: 'row',
    columnGap: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default AddRecipeScreen;
