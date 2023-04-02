import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Login from '../assets/images/login.svg';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import {AuthContext} from '../navigations/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true);

  const {login, error, setError, loading} = useContext(AuthContext);

  const pressHandler = () => {
    navigation.replace('SignUp');
  };

  const loginHandler = () => {
    if (email && password) {
      login(email, password);
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error', 'Email atau password salah!', [
        {
          text: 'OK',
          onPress: () => setError(false),
        },
      ]);
    } else if (!valid) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!', [
        {
          text: 'OK',
          onPress: () => setValid(true),
        },
      ]);
    }
  }, [error, valid]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.image}>
            <Login width={'100%'} height={400} />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Text style={styles.title}>LOGIN</Text>
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
              <ButtonComponent
                title={loading ? 'loading...' : 'Login'}
                onPress={loginHandler}
              />
              <View style={styles.text}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={pressHandler}>
                  <Text style={styles.signup}>Sign Up</Text>
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
    height: Dimensions.get('window').height - 400,
  },
  form: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
  },
  title: {
    color: '#6C63FF',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  text: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  signup: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
