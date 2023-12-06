import React, {useState, createRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import Dialog from 'react-native-dialog';
// redux store actions
import {useDispatch} from 'react-redux';
import {
  createDivisionAction,
  updateDivisionAction,
} from '../../../redux/actions/division-action';
// components
import {Colors} from '../../../constants';
import Loader from '../../../Components/Loader/Loader';
// functional component
const AddOrEditDivisionScreen = ({route, navigation}) => {
  let {division} = route.params ? route.params : {};
  navigation.setOptions({
    headerTitle: `${division ? 'Edit' : 'Add'} Division`,
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.lightblue,
    },
  });

  // useState
  const [unit, setUnit] = useState(division.unit);
  const [name, setName] = useState(division.divisionName);
  const [shortName, setShortName] = useState(division.division);
  const [city, setCity] = useState(division.city);
  const [showActionAlert, setShowActionAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux dispatch
  const dispatch = useDispatch();
  // input refs
  const nameInputRef = createRef();
  const unitInputRef = createRef();
  const shortNameInputRef = createRef();
  const cityInputRef = createRef();

  // event: submit division form
  const handleSubmitButton = () => {

    if (!unit) {
      alert('Please fill Unit');
      return;
    }
    if (unit.length > 2) {
      alert('Unit length should not be more than 2 character.');
      return;
    }
    if (!name) {
      alert('Please fill Name');
      return;
    }
    if (!shortName) {
      alert('Please fill Short Name');
      return;
    }
    if (!city) {
      alert('Please fill City');
      return;
    }
    //Show Loader
    setLoading(true);
    try {
      // if we have division id than its edit mode
      if (division._id === '') {
        dispatch(createDivisionAction(shortName, name, city, unit));
        setShowActionAlert(true);
      } else {
        dispatch(
          updateDivisionAction(division._id, shortName, name, city, unit),
        );
        setShowActionAlert(true);
      }
    } catch (error) {}
    setLoading(false);
  };

  const handleOk = () => {
    setShowActionAlert(false);
  };

  // event: reset the form when
  const handleReset = () => {
    setUnit('');
    setName('');
    setShortName('');
    setCity('');
    division._id = '';
    inCreateMode = true;
  };
  return (
    <ScrollView>
      <Loader loading={loading} />
      <Dialog.Container visible={showActionAlert}>
        <Dialog.Title>Division Create</Dialog.Title>
        <Dialog.Description>
          Division was successfully saved !!!
        </Dialog.Description>
        <Dialog.Button label="OK" onPress={handleOk} />
      </Dialog.Container>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Unit"
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={Unit => {
              setUnit(Unit.slice(0, 2).toLocaleUpperCase());
            }}
            ref={unitInputRef}
            returnKeyType="next"
            keyboardType="default"
            value={unit.toString()}
            onSubmitEditing={() =>
              unitInputRef.current && unitInputRef.current.focus()
            }
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            editable={division._id === '' ? true : false}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={Name => setName(Name)}
            ref={nameInputRef}
            returnKeyType="next"
            value={name}
            onSubmitEditing={() =>
              nameInputRef.current && nameInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Short Name"
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={ShortName => setShortName(ShortName)}
            ref={shortNameInputRef}
            returnKeyType="next"
            value={shortName}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={City => setCity(City)}
            ref={cityInputRef}
            returnKeyType="next"
            value={city}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
          />
          <View style={styles.btngrp}>
            <TouchableOpacity
              style={styles.cancelbtn}
              onPress={() => {
                handleReset();
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
    </ScrollView>
  );
};
export default AddOrEditDivisionScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  subcontainer: {
    marginTop: 18,
    alignContent: 'center',
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
  btngrp: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  submitbtn: {
    height: 55,
    width: '40%',
    backgroundColor: '#3492eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
