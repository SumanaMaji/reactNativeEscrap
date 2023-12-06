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
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../constants/colors';
import Loader from '../../Components/Loader/Loader';

import Moment, { relativeTimeRounding, RFC_2822 } from 'moment';
import { countBy } from 'underscore';

const TransactionImageNew = props => {
  
  const [selectedDivision, setSelectedDivision] = useState(null);
 
  const [loading, setLoading] = useState(false);  
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [largeImageData, setLargeImageData] = useState(null);
  const [loadingLargeImage, setLoadingLargeImage] = useState(false);
 
  const allDivisions = useSelector(state => state.divisions.divisions);
  
  const transactionDocument = useSelector(
    state => state.documents.transactionDocuments,
  );
  
  useEffect(() => {
    if (allDivisions) {
      const division = allDivisions.find(
        div => div._id === props.data.division,
      );
      if (division) {
        setSelectedDivision(division);
      }
   
    }
  }, [allDivisions]);
  
 const hideActivePhotoModal = () => {
  
    setLoadingLargeImage(false);

    setShowPhotoModal(false);
  };

  const showLargeImage = imageId => {
    setLoadingLargeImage(true);
    (imageId ? setLargeImageData(imageId): null);
    setShowPhotoModal(true);
  };

  return (
    <View style={styles.maincard}>
      <Loader loading={loading} />    
      <View> 
            <View>
             
              <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Gate</Text>
              <Text style={styles.cardtext}>
                {props.data.gateInOut == 1 ? 'Inside Gate' : 'Outside Gate'}
              </Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Gate Pass No.</Text>
              <Text style={styles.cardtext}>{props.data.gatePassNumber}</Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Gate Pass Date</Text>
              <Text style={styles.cardtext}>{Moment(props.data.gatePassDate).format('DD-MMM-YYYY')}</Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Division Name</Text>
              <Text style={styles.cardtext}>
                {selectedDivision
                  ? `${selectedDivision.divisionName} (${selectedDivision.division})`
                  : ''}
              </Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Party Name</Text>
              <Text style={styles.cardtext}>{props.data.partyName}</Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Vehicle Number</Text>
              <Text style={styles.cardtext}>{props.data.vehicleNo}</Text>
            </View>    
              
            </View>
            <FlatList
          style={styles.flatListStyle}
          data={transactionDocument}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View style={styles.imageOuter}>
                  <View style={styles.imageOuterLeft}>
                  <View style={styles.cardinner}>
                  <Text style={styles.cardhead}>Driver Photo</Text>
                  {item.photo ? (
                      <TouchableOpacity
                      key={item.photo}
                      onPress={() => showLargeImage(item.photo)}>
                      <Image
                      style={styles.cardimage}
                      source={{
                        uri: item.photo,
                      }}
                    />
                    </TouchableOpacity>
                      ) : <Text style={styles.cardimage}>N/A</Text>}
                    </View>
                    <View style={styles.cardinner}>
                  <Text style={styles.cardhead}>Driver License</Text>
                  {item.licence ? (
                  <TouchableOpacity
                  key={item.licence}
                  onPress={() => showLargeImage(item.licence)}>
                  <Image
                  style={styles.cardimage}
                  source={{
                    uri: item.licence,
                  }}
                  />
                  </TouchableOpacity>
                  ) : <Text style={styles.cardimage}>N/A</Text>}
                  </View>
                  </View>
                <View style={styles.imageOuterRight}>
                <View style={styles.cardinner}>
                <Text style={styles.cardhead}>Challan</Text>
                {item.challan ? (
                <TouchableOpacity
                key={item.challan}
                onPress={() => showLargeImage(item.challan)}>
                <Image
                style={styles.cardimage}
                source={{
                  uri: item.challan,
                }}
                />
                </TouchableOpacity>
                ) : <Text style={styles.cardimage}>N/A</Text>}
                </View>
                <View style={styles.cardinner}>
                <Text style={styles.cardhead}>Vehicle RC</Text>
                {item.rc ? (
                  <TouchableOpacity
                  key={item.rc}
                  onPress={() => showLargeImage(item.rc)}>
                  <Image
                  style={styles.cardimage}
                  source={{
                    uri: item.rc,
                  }}
                />
                </TouchableOpacity>
                  ) : <Text style={styles.cardimage}>N/A</Text>}
                  </View>
                </View>
                </View>
            );
          }}
        />
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={showPhotoModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          hideActivePhotoModal();
        }}>
        <Loader loadingLargeImage={loadingLargeImage} />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {largeImageData ? (
              <Image
                style={styles.cardPhotoLarge}
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
              style={[styles.button, styles.btnTopcross]}
              onPress={() => hideActivePhotoModal()}>
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
  maincard: {alignItems: 'center'},
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cardinner: {
    marginBottom: 2,
    padding: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  cardimage: {
    height: 80,
    width: 60,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 12,
    marginRight: 5,
    marginLeft:5,
    borderRadius: 10,
     color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardimageTitle: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  flatListStyle: {
    flex: 1,
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  btnTopcross: {
    position: 'absolute',
    left: 290,
    top: 15,
    backgroundColor: 'red',
    borderRadius: 9,
  },
  modalView: {
    marginLeft:5,
    marginRight:5,
    position: 'relative',
    height: '100%',
    left: 0,
    zIndex:0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#000',
    overflowX: 'auto',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 30,
  },
  cardPhotoLarge: {
    width: '110%',
    height: '100%',
    marginTop: -10,
    marginLeft: -14,
    marginBottom: 4,
    borderRadius: 10,
  },
  cardhead: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageOuter:{
    flex:1,
    width:'100%',
    flexDirection:'row',
  },
  imageOuterLeft: {
    flexDirection:'column',
    width:'50%',
  },
  imageOuterRight: {
    flexDirection:'column',
    width:'50%',
  },
});

export default TransactionImageNew;
