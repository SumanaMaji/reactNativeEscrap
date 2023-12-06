import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
// redux store
import {deleteDivisionAction} from '../../../redux/actions/division-action';
// utility
import {Colors} from '../../../constants';
// components
import DivisionItems from './division-items';
import Loader from '../../../Components/Loader/Loader';
// functional component
const DivisionScreen = ({navigation}) => {
  // useState
  const [loading, setLoading] = useState(false);
  const [selectedDivision, setselectedDivision] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  // useSelector

  const allDivisions = useSelector(state => state.divisions.divisions);
  // dispatch
  const dispatch = useDispatch();

  // alert dialog to confirm to delete division
  const deleteDivisionAlert = division => {
    setselectedDivision(division);
    setShowDeleteAlert(true);
  };

  const handleDeleteDivision = () => {
    setLoading(true);
    const idToDelte = selectedDivision.division._id;
    dispatch(deleteDivisionAction(idToDelte));
    setselectedDivision(null);
    setShowDeleteAlert(false);
    setLoading(false);
  };

  const handleCancelDelete = () => {
    setselectedDivision(null);
    setShowDeleteAlert(false);
  };

  return (
    <>
      <Loader loading={loading} />
      <DivisionItems
        divisionData={allDivisions}
        deleteDivisionHandler={deleteDivisionAlert}></DivisionItems>
      <Dialog.Container visible={showDeleteAlert}>
        <Dialog.Title>Division delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this division? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancelDelete} />
        <Dialog.Button label="Yes" onPress={handleDeleteDivision} />
      </Dialog.Container>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('AddOrEditDivisionScreen', {
            division: {
              _id: '',
              unit: '',
              divisionName: '',
              division: '',
              city: '',
            },
          })
        }
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

export default DivisionScreen;

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
