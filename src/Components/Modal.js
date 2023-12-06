import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/colors';
const CustomModal = props => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.hide();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.headContainer}>
            <Text style={styles.headerText}>{props.title}</Text>
          </View>
          <View style={styles.childContainer}>{props.children}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  headContainer: {
    backgroundColor: Colors.violet,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: Colors.white,
  },
  childContainer: {
    padding: 20,
    minHeight: 300,
  },
});

export default CustomModal;
