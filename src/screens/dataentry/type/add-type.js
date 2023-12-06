import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createTypeAction} from '../../../redux/actions/type-action';
import MemoizedDivisionPicker from '../../../Components/DivisionPicker';
import TextBox from '../../../Components/TextBox';
import Colors from '../../../constants/colors';
//
const AddTypeScreen = props => {
  // useState
  const [name, setName] = useState('');
  const [selectedDivisionId, setSelectedDivisionId] = useState('');
  // useSelector
  const allDivisions = useSelector(state => state.divisions.divisions);
  // dispatch
  const dispatch = useDispatch();
  // event
  const handleTypeSave = () => {
    dispatch(createTypeAction(selectedDivisionId, name));
  };
  // JSX
  return (
    <View style={styles.centeredView}>
      <MemoizedDivisionPicker
        style={styles.picker}
        selectedDivision={selectedDivisionId}
        allDivisions={allDivisions}
        onValueChange={value => setSelectedDivisionId(value)}
      />
      <TextBox
        placeholder="Enter Name"
        value={name}
        onChange={text => setName(text)}
      />
      <View style={styles.actionContainer}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => props.hide()}>
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonSave]}
          onPress={() => handleTypeSave()}>
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default MemoizedAddTypeScreen = React.memo(AddTypeScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  picker: {
    minHeight: 55,
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    maxHeight: 200,
    backgroundColor: 'white',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
    padding: 10,
    height: 50,
  },
  buttonClose: {
    backgroundColor: Colors.red,
    minWidth: 100,
  },
  buttonSave: {
    backgroundColor: Colors.green,
    minWidth: 100,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
