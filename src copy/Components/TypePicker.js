import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Colors from '../constants/colors';
const screen = Dimensions.get('window');
//
const TypePicker = ({selectedType, allTypes, onValueChange}) => {
  //

  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.itemStyle}
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue)}
        mode="dropdown">
        <Picker.Item label="Select Type" value="" />
        {allTypes.map((item, index) => (
          <Picker.Item label={item.typeName} value={item._id} key={index} />
        ))}
      </Picker>
    </View>
  );
};

export default MemoizedTypePicker = React.memo(TypePicker);

//export default MemoizedTypePicker; //as MemoizedDivisionPicker;

const styles = StyleSheet.create({
  itemStyle: {
    fontSize: 25,
    height: 100,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    maxHeight: 50,
    marginTop: 10,
  },
  picker: {
    width: screen.width - 50,
  },
});
