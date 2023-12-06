import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
// redux
import {useDispatch, batch} from 'react-redux';
import {loginAction, clearAuthError, authenticate} from '../../redux/actions/auth-action';
import {fetchDivisionAction} from '../../redux/actions/division-action';
import {fetchTypeAction} from '../../redux/actions/type-action';
import {fetchSubTypeAction} from '../../redux/actions/subtype-action';
import {fetchTranactionAction} from '../../redux/actions/transaction-action';
// components
import TextBox from '../../Components/TextBox';
import Card from '../../Components/Card';
import Colors from '../../constants/colors';

const LoginScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState('');
  const {message, token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getPhoneData();
  }, [deviceId]);

  useEffect(() => {
    if (message.length > 0) {
      Alert.alert('Login Error', message, [{text: 'Okay'}]);
      setIsLoading(false);
    }
  }, [message]);

  useEffect(() => {
   
    if (token.length > 0) {
      batch(() => {
        dispatch(fetchDivisionAction());
        dispatch(fetchTypeAction());
        dispatch(fetchSubTypeAction());
        dispatch(fetchTranactionAction());
      });
      props.navigation.navigate('MemoizedDashboardScreen');
    }
  }, [token]);
 
  const getPhoneData = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DeviceInfo.getSerialNumber().then(serialNumber => {
          // alert("sn->" + serialNumber);
        });
        DeviceInfo.getAndroidId().then(manufacturer => {
          //alert("ma->" + manufacturer);
        });
        let uniqueId = DeviceInfo.getUniqueId();
        //alert("Device Unique Id ->" + uniqueId);
      } else {
        console.log('ACCESS_WIFI_STATE permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUserNameChange = text => {
    setUserName(text);

    if (text.length === 0) {
      setValidationErrors('Username is required.');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (text.length === 0) {
      setValidationErrors('Password is required.');
    }
  };

  const authHandler = async () => {
    if (userName.length === 0 && password.length === 0) {
      return;
    }
    setIsLoading(true);
    dispatch(clearAuthError());
    try {
      await dispatch(loginAction(userName, password));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.MainContainer}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView enabled>
          <View style={styles.screen} >
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.authContainer}>
              <Card style={styles.card}>
                <ScrollView>
                  <TextBox
                    autoFocus
                    id="username"
                    placeholder="Username"
                    onChange={text => handleUserNameChange(text)}
                  />
                  <TextBox
                    id="password"
                    placeholder="Password"
                    errorText="Please enter a password."
                    secureTextEntry={true}
                    onChange={text => handlePasswordChange(text)}
                  />
                  {validationErrors.length > 0 && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{validationErrors}</Text>
                    </View>
                  )}

                  <View style={styles.buttonContainer}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color={Colors.primary} />
                    ) : (
                      <TouchableOpacity
                        style={[styles.button, styles.authContainer]}
                        onPress={authHandler}>
                        <Text style={styles.buttontext}>LOGIN</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </ScrollView>
              </Card>
            </View>
            <View style={styles.brandContainer}>
              <Text style={styles.brandText}>Developed By</Text>
              <Text style={styles.brandText}>
                Codemetrics Infotech Pvt. Ltd.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin:0,
  },
  screen: {
    width:'100%',
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '80%',
    maxWidth:400,
    padding:15,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: 'white',
  },
  errorContainer: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
  },
  brandText: {
    fontSize: 18,
    letterSpacing: 1,
  },
});
