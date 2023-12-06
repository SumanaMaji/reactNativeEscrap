import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateSubTypeAction} from '../../../redux/actions/subtype-action';
import MemoizedDivisionPicker from '../../../Components/DivisionPicker';
import MemoizedTypePicker from '../../../Components/TypePicker';
import TextBox from '../../../Components/TextBox';
import Colors from '../../../constants/colors';
//
const EditSubTypeScreen = props => {
  // useState
  const [name, setName] = useState(props.subtype.subTypeName);
  const [selectedDivisionId, setSelectedDivisionId] = useState(
    props.subtype.division,
  );
  const [selectedTypeId, setSelectedTypeId] = useState(props.subtype.type);
  // useSelector
  const allDivisions = useSelector(state => state.divisions.divisions);
  const allTypes = useSelector(state => state.types.types);
  // dispatch
  const dispatch = useDispatch();
  // event
  const handleSubTypeSave = () => {
    dispatch(
      updateSubTypeAction(
        props.subtype._id,
        name,
        selectedTypeId,
        selectedDivisionId,
      ),
    );
  };
  // JSX
  return (
    <View style={styles.centeredView}>
      <MemoizedDivisionPicker
        selectedDivision={selectedDivisionId}
        allDivisions={allDivisions}
        onValueChange={value => setSelectedDivisionId(value)}
      />
      <MemoizedTypePicker
        selectedType={selectedTypeId}
        allTypes={allTypes.filter(type => type.division === selectedDivisionId)}
        onValueChange={value => setSelectedTypeId(value)}
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
          onPress={() => handleSubTypeSave()}>
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default EditSubTypeScreen;

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
