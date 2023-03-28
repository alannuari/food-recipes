import React, {useContext, useState} from 'react';
import {Dimensions} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SignUp from '../assets/images/signup.svg';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import {AuthContext} from '../navigations/AuthProvider';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {register} = useContext(AuthContext);

  const pressHandler = () => {
    navigation.replace('Login');
  };

  const signUpHandler = () => {
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        register(email, password);
      } else {
        Alert.alert('Error', 'Password tidak sama!', [
          {
            text: 'OK',
          },
        ]);
      }
    } else {
      Alert.alert(
        'Error',
        'Email, password, dan confirm password tidak boleh kosong!',
        [
          {
            text: 'OK',
          },
        ],
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.image}>
            <SignUp width={'100%'} height={270} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <InputComponent
                name="at"
                placeholder="Email"
                label="Email"
                value={email}
                setValue={setEmail}
              />
              <InputComponent
                name="lock"
                placeholder="Password"
                label="Password"
                value={password}
                setValue={setPassword}
              />
              <InputComponent
                name="lock"
                placeholder="Confirm Password"
                label="Confirm Password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              />
              <ButtonComponent title="Create" onPress={signUpHandler} />
              <View style={styles.text}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={pressHandler}>
                  <Text style={styles.login}>Login here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    paddingHorizontal: 10,
    backgroundColor: '#777',
    borderBottomRightRadius: 100,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#777',
    justifyContent: 'center',
    height: Dimensions.get('window').height - 270,
  },
  form: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  text: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  login: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
