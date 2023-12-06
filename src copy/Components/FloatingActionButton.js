import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

const FloatingActionButton = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => props.click()}
        style={styles.touchableOpacity}>
        <Image
          source={{
            uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png',
          }}
          style={styles.floatingButton}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  touchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  floatingButton: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
