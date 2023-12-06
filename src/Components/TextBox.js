import React, {createRef} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
const screen = Dimensions.get('window');
////////////////////////////////////////////////////////////////
const TextBox = props => {
  const nameInputRef = createRef();

  return (
    <View
      style={props.error ? styles.inputErrorContainer : styles.inputContainer}>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={props.placeholder}
        autoCapitalize="none"
        placeholderTextColor="black"
        onChangeText={text => props.onChange(text)}
        ref={nameInputRef}
        returnKeyType="next"
        value={props.value}
        autoCapitalize="none"
        autoComplete="off"
        onSubmitEditing={() =>
          nameInputRef.current && nameInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
    </View>
  );
};
export default TextBox;

const styles = StyleSheet.create({
  inputContainer: {borderRadius: 10, borderWidth: 1, margin: 5, height: 50},
  inputErrorContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF5733',
    margin: 5,
  },
  input: {
    maxHeight: 50,
    width: screen.width - 50,
    margin: 8,
    padding: 5,
    color: 'black',
    fontSize: 18,
  },
});
