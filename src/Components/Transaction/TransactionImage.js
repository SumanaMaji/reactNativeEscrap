import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Urls from '../../constants/ConstantVariables/Urls';
import Colors from '../../constants/colors';
import Loader from '../../Components/Loader/Loader';
import {fetchTransactionImageAction} from '../../redux/actions/image-action';


const TransactionImage = props => {
  const [loading, setLoading] = useState(false);
  const [loadingLargeImage, setLoadingLargeImage] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [largeImageData, setLargeImageData] = useState(null);
  const [largePhoto, setlargePhoto] = useState('');
  const dispatch = useDispatch();

  // const thumbnails = useSelector(state =>
  //   state.thumbnails.transactionThumbnails.find(
  //     x => x.transactionId === props.transId,
  //   ),
  // );

  const thumbnails = useSelector(
    state => state.thumbnails.transactionThumbnails,
  );

  const transactionImages = useSelector(
    state => state.images.transactionImages,
  );

  useEffect(() => {
    setLoadingLargeImage(false);
  }, []);

  let menuRef = useRef([]);
  const userToken = useSelector(state => state.auth.token);
  const removeImageHandler = imageId => {
    setLoading(true);
   
    return fetch(Urls.deleteTransactionThumbnail + imageId + '/thumbnail', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Host: 'escrap-api.herokuapp.com',
        Authorization: `Bearer ${userToken}`,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        if (responseJson.success) {
          setLoading(false);
          getThumbnail();
        } else {
          setLoading(false);
          alert('Something went wrong while deleting image');
          console.log('Something went wrong while deleting image');
          return 'error';
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const showLargeImage = imageId => {
    setLoadingLargeImage(true);
   
    thumbnails.forEach(function (arrayItem) {
      if(imageId == arrayItem.imageId){
      const largeImageData = arrayItem.imageUrl;
      console.log(largeImageData);
      (largeImageData ? setLargeImageData(largeImageData): null);
      }
    });
 
    setShowImageModal(true);
  };

  const hideActiveModal = () => {
    setLoading(false);
    setShowImageModal(false);
  };

  return (
    <View style={styles.cardimagediv}>
      <Loader loading={loading} />
      {props.editMode ? (
        <MenuProvider>
          <FlatList
            data={thumbnails}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <View>
                  <Menu
                    key={item.imageId}
                    ref={r => (menuRef[item.imageId] = r)}>
                    <MenuTrigger
                      customStyles={{
                        triggerTouchable: {
                          onPress: () => {
                            console.log('trigger');
                            menuRef[item.imageId].open();
                          },
                        },
                      }}>
                      <Image
                        style={styles.cardimage}
                        source={{
                          uri: item.thumbnailUrl,
                        }}
                      />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption
                        onSelect={() => removeImageHandler(item.imageId)}>
                        <Text style={{color: 'red', fontSize: 25}}>Delete</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              );
            }}
          />
        </MenuProvider>
      ) : (
        <FlatList
          style={styles.flatListStyle}
          data={thumbnails}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  key={item.imageId}
                  onPress={() => showLargeImage(item.imageId)}>
                  <Image
                    style={styles.cardimage}
                    source={{
                      uri: item.thumbnailUrl,
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.cardimageTitle}>{item.thumbnailName}</Text>
              </View>
            );
          }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showImageModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          hideActiveModal();
        }}>
        <Loader loadingLargeImage={loadingLargeImage} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {largeImageData ? (
              <Image
                style={styles.cardimageLarge}
                source={{
                  uri: largeImageData,
                }}
              />
            ) : (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            )}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => hideActiveModal()}>
              <MaterialIcons name="close" size={30} color="white" />
              {/* this is view close button */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  cardimagediv: {
    paddingBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardimage: {
    height: 100,
    width: 90,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 12,
    marginRight: 5,
    marginLeft:5,
    borderRadius: 10,
  },
  cardimageTitle: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  flatListStyle: {
    flex: 1,
  },
  cardimageLarge: {
    width: '100%',
    height: '100%',
    marginTop: -10,
    marginLeft: -14,
    marginBottom: 4,
    borderRadius: 10,
  },
  buttonClose: {
    position: 'absolute',
    right: 25,
    top: 20,
    backgroundColor: 'red',
    borderRadius: 9,
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 30,
  },
});

export default TransactionImage;