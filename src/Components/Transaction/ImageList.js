import React, {useRef} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const ImageList = props => {
  let menuRef = useRef([]);
  return (
    <MenuProvider>
      <View style={styles.cardimagediv}>
        {props.images && props.images.length > 0 ? 
         (props.images.map((img, idx) => {
          return (
            <Menu key={idx} ref={r => (menuRef[idx] = r)}>
              <MenuTrigger
                customStyles={{
                  triggerTouchable: {
                    onPress: () => {
                      console.log('trigger');
                      menuRef[idx].open();
                    },
                  },
                }}>
                <Image style={styles.cardimage} source={{uri: img.uri}} />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => props.removeImageHandler(img.Id)}>
                  <Text style={{color: 'red', fontSize: 25}}>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          );
        })) : null}
          {props.driverPhoto && props.driverPhoto.length > 0 ? 
         ( props.driverPhoto.map((img, idx) => {
          return (
            <Menu key={idx} ref={r => (menuRef[idx] = r)}>
              <MenuTrigger
                customStyles={{
                  triggerTouchable: {
                    onPress: () => {
                      console.log('trigger');
                      menuRef[idx].open();
                    },
                  },
                }}>
                <Image style={styles.transimage} source={{uri: img.uri}} />
              </MenuTrigger>
            </Menu>
          );
        })) : null}
          {props.driverLicense && props.driverLicense.length > 0 ? 
         ( props.driverLicense.map((img, idx) => {
          return (
            <Menu key={idx} ref={r => (menuRef[idx] = r)}>
              <MenuTrigger
                customStyles={{
                  triggerTouchable: {
                    onPress: () => {
                      console.log('trigger');
                      menuRef[idx].open();
                    },
                  },
                }}>
                <Image style={styles.transimage} source={{uri: img.uri}} />
              </MenuTrigger>
            </Menu>
          );
        })) : null}
          {props.vehicleRC && props.vehicleRC.length > 0 ? 
         ( props.vehicleRC.map((img, idx) => {
          return (
            <Menu key={idx} ref={r => (menuRef[idx] = r)}>
              <MenuTrigger
                customStyles={{
                  triggerTouchable: {
                    onPress: () => {
                      console.log('trigger');
                      menuRef[idx].open();
                    },
                  },
                }}>
                <Image style={styles.transimage} source={{uri: img.uri}} />
              </MenuTrigger>
            </Menu>
          );
        })) : null}
          {props.challan && props.challan.length > 0 ? 
         ( props.challan.map((img, idx) => {
          return (
            <Menu key={idx} ref={r => (menuRef[idx] = r)}>
              <MenuTrigger
                customStyles={{
                  triggerTouchable: {
                    onPress: () => {
                      console.log('trigger');
                      menuRef[idx].open();
                    },
                  },
                }}>
                <Image style={styles.transimage} source={{uri: img.uri}} />
              </MenuTrigger>
            </Menu>
          );
        })) : null}
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  cardimagediv: {
    paddingBottom: 5,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardimage: {
    height: 100,
    width: 100,
    marginTop: 4,
    marginLeft: 4,
  },
  transimage: {
    height: 50,
    width: 50,
    marginLeft: 35,
    marginTop:-7,
  },
});

export default ImageList;
