import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Urls from '../../constants/ConstantVariables/Urls';
import Loader from '../../Components/Loader/Loader';
import UserManagmentList from './UserManagmentList';

import AsyncStorage from '@react-native-async-storage/async-storage';
const UserManagmentScreen = ({navigation}) => {
  navigation.setOptions({
    headerTitle: ' User Managment',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.lightblue,
    },
  });
  const [userToken, setUserToken] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [editUserId, setEditUserId] = useState('');
  const [formaData, setFormData] = useState({
    name: '',
    userName: '',
    role: '',
    mobileNo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    readData('user_token');
   // AsyncStorage.getItem('user_token').then(value => getAllUserLists(value));
    getAllUserLists();
  }, [userToken, userLists]);
  const readData = async user_token => {
    try {
      const userToken1 = await AsyncStorage.getItem(user_token);
      if (userToken1 !== null) {
        setUserToken(userToken1);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  const resetHandler = () => {
    setOpenModal(false);
    setFormData('');
    setIsEditMode('');
  };
  const cancelHandler = () => {
    setOpenModalPassword(false);
    setPasswordData('');
  };
  //getalluserlist start  here
  const getAllUserLists = () => {
    fetch(Urls.getAllUserLists, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          let arrayDataReturn = [];

          responseJson.data.forEach(d => {
            arrayDataReturn.push({
              Id: d._id,
              Name: d.name,
              UserName: d.userName,
              Role: d.role,
              MobileNo: d.mobileNo,
              Email: d.email,
            });
          });
          // setLoading(false);
          setUserLists(arrayDataReturn);
        } else {
          console.log('Something went Wrong');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  //getalluserlist end here
  //handlesubmit start here
  const handleSubmitButton = () => {
    if (formaData.role === '') {
      alert('Please Enter Role');
    } else if (formaData.name === '') {
      alert('Please Enter Name');
    } else if (formaData.userName === '') {
      alert('Please Enter UserName');
    } else if (formaData.email === '') {
      alert('Please Enter Email');
    } else if (formaData.password === '') {
      alert('Please Enter Password');
    } else if (formaData.confirmPassword === '') {
      alert('Please Enter Confirm Password');
    } else if (formaData.password !== formaData.confirmPassword) {
      alert('Password Does Not Match');
    }
    //password Matching Condition
    else if (formaData.mobileNo === '') {
      alert('Please Enter Mobile Number');
    } else {
      setLoading(true);

      let url = isEditMode
        ? Urls.updateUser + '/' + editUserId
        : Urls.createUserType;
      fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(formaData),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('Success:', JSON.stringify(responseJson));
          // setLoading(false);

          if (responseJson.success) {
            // setFormData('');
            let alertMessage = isEditMode
              ? 'User updated successfully.'
              : 'User added successfully.';
            alert(alertMessage);
            setOpenModal(false);
            setLoading(false);
            setFormData('');
            resetHandler();
            getAllUserLists();
          } else {
            setLoading(false);
            alert(responseJson.message);
          }
          // alert(data.success);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };
   //handlesubmit end here
    //handleUpdatePasswordButton start here
  const handleUpdatePasswordButton = () => {
    console.log(passwordData.newPassword);
    if (passwordData.newPassword === '' || passwordData.newPassword === null || passwordData.newPassword  === undefined) {
      alert('Please Enter New Password');
    } else if (passwordData.confirmPassword === ''|| passwordData.confirmPassword === null || passwordData.confirmPassword  === undefined) {
      alert('Please Enter Confirm Password');
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Password Does Not Match');
    }
    //password Matching Condition
    else {
      setLoading(true);
          // update password api call
          console.log(JSON.stringify(passwordData));
          fetch(Urls.updateUserPassword + '/' + editUserId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(passwordData),
          })
        .then(response => response.json())
        .then(responseJson => {
          console.log('Success:', JSON.stringify(responseJson));
          if (responseJson.success) {
            let alertMessage = 'Password updated successfully.';
          alert(alertMessage);
          console.log(responseJson.success);
          setOpenModalPassword(false);
          setLoading(false);
          setPasswordData('');
          cancelHandler();    
          } else {
            setLoading(false);
            alert(responseJson.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });      
      } 
  };
  //handleUpdatePasswordButton end here
  //delete user function start
  const DeleteUsers = usersId => {
    Alert.alert('Are your sure?', 'You want to delete this User?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          fetch(Urls.deleteUser + '/' + usersId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          })
            .then(response => response.json())
            .then(data => {
              // console.log('Success:', data);
              // setLoading(false);
              alert(data.data);
              setLoading(false);
              getAllUserLists();
            })
            .catch(error => {
              console.error('Error:', error);
            });
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };
  //delete user function end
  //update user function start
  const UpdateUsers = usersId => {
    setOpenModal(true);
    setIsEditMode(true);

    let record = userLists.filter(d => {
      return d.Id == usersId;
    });
    setEditUserId(usersId);
    setFormData({
      name: record[0].Name,
      userName: record[0].UserName,
      role: record[0].Role,
      mobileNo: JSON.stringify(record[0].MobileNo),
      email: record[0].Email,
      password: record[0].Password,
      confirmPassword: record[0].Password,
    });
    getAllUserLists();
  };

 //update password can acces Admin & SuperAdmin Role function start
 const UpdatePassword = usersId => {
  setOpenModalPassword(true);
  setEditUserId(usersId);
};
// end update password

  return (
    <>
      <ScrollView>
        <UserManagmentList
          userListProps={userLists}
          deleteUserHandlers={DeleteUsers}
          updateUserHandlers={UpdateUsers}
          updatePasswordHandlers={UpdatePassword}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setOpenModal(false);
        }}>
        <Loader loading={loading} />
        <ScrollView style={styles.topView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.subcontainer}>
                <View style={styles.inputDropdown}>
                  <Picker
                    selectedValue={formaData.role}
                    onValueChange={itemValue => {
                      setFormData({...formaData, role: itemValue});
                    }}>
                    <Picker.Item label="Choose " />
                    <Picker.Item label="Admin" value="Admin" />
                    <Picker.Item label="Manager" value="Manager" />
                    <Picker.Item label="SuperAdmin" value="SuperAdmin" />
                    <Picker.Item label="Operator" value="Operator" />
                  </Picker>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder=" Name"
                  autoCapitalize="none"
                  placeholderTextColor="black"
                  onChangeText={name => setFormData({...formaData, name})}
                  value={formaData.name}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={text =>
                    setFormData({...formaData, userName: text})
                  }
                  value={formaData.userName}
                  autoCapitalize="none"
                  placeholderTextColor="black"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={text =>
                    setFormData({...formaData, email: text})
                  }
                  value={formaData.email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="black"
                />
                {/* while update password and confirm password will not display */}
                {isEditMode ? null : (
                  <>
                    <TextInput
                      style={styles.input}
                      onChangeText={text =>
                        setFormData({...formaData, password: text})
                      }
                      value={formaData.password}
                      placeholder="Password"
                      secureTextEntry={true}
                      autoCapitalize="none"
                      placeholderTextColor="black"
                    />
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      placeholder="Confirm Password"
                      onChangeText={text =>
                        setFormData({...formaData, confirmPassword: text})
                      }
                      value={formaData.confirmPassword}
                      autoCapitalize="none"
                      placeholderTextColor="black"
                    />
                  </>
                )}

                <TextInput
                  style={styles.input}
                  onChangeText={text =>
                    setFormData({...formaData, mobileNo: text})
                  }
                  value={formaData.mobileNo}
                  placeholder="Mobile Number"
                  keyboardType="number-pad"
                  maxLength={10}
                  autoCapitalize="none"
                  placeholderTextColor="black"
                />
                <View style={styles.btngrp}>
                  <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() => {
                      resetHandler();
                    }}>
                    <Text style={styles.btnText}> Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitbtn}
                    onPress={handleSubmitButton}>
                    <Text style={styles.btnText}> Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModalPassword}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setOpenModalPassword(false);
        }}>
        <Loader loading={loading} />
        <ScrollView style={styles.topView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.subcontainer}>
              <TextInput
                  style={styles.input}
                  onChangeText={text =>
                    setPasswordData({...passwordData, newPassword: text})
                  }
                  value={passwordData.newPassword}
                  placeholder="New Password"
                  maxLength={10}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholderTextColor="black"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={text =>
                    setPasswordData({...passwordData, confirmPassword: text})
                  }
                  value={passwordData.confirmPassword}
                  placeholder="Confirm Password"
                  maxLength={10}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  placeholderTextColor="black"
                />
                <View style={styles.btngrp}>
                  <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() => {
                      cancelHandler();
                    }}>
                    <Text style={styles.btnText}> Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitbtn}
                    onPress={handleUpdatePasswordButton}>
                    <Text style={styles.btnText}> Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpenModal(true)}
        style={styles.touchableOpacityStyle}>
        <View style={styles.floatingButtonStyle}>
          <View style={styles.iconCenter}>
            <FontAwesome
              name="plus"
              size={30}
              color="white"
              style={styles.plusIcon}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default UserManagmentScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    // backgroundColor: '#46d4c4',
    height: '100%',
  },
  subcontainer: {
    marginTop: 18,
    alignContent: 'center',
  },

  topView: {
    marginTop: 45,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: 350,
    height: 55,
    // backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputDropdown :{
    width: 350,
    height: 55,
    marginLeft: 10,
    padding: 0,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    fontWeight: '900',
  },
  btngrp: {
    // marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitbtn: {
    height: 55,
    width: '40%',
    backgroundColor: '#0cb318',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  cancelbtn: {
    height: 55,
    width: '40%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 50,
    bottom: 20,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: Colors.green,
    borderRadius: 50,
  },
  iconCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
