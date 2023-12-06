import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Modal,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TransactionImage from './TransactionImage';
import TransactionImageNew from './TransactionImageNew';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fetchThumbnailAction} from '../../redux/actions/thumbnail-action';
import {deleteTransactionAction, fetchTranactionAction} from '../../redux/actions/transaction-action';
import {fetchDocumentAction} from '../../redux/actions/document-action';
import Moment, { relativeTimeRounding, RFC_2822 } from 'moment';
import Loader from '../../Components/Loader/Loader';
import Colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Dialog from 'react-native-dialog';
import { Row } from 'react-native-table-component';

export default function TransactionCard(props) {
  const userRole = useSelector(state => state.auth.role);

  const navigation = useNavigation();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [largeImageData, setLargeImageData] = useState(null);
  const [loadingLargeImage, setLoadingLargeImage] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [transactionDelete, setTransactionDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Do not delete
  // const [selectedType, setSelectedType] = useState(null);
  // const [selectedSubType, setSelectedSubType] = useState(null);
  const dispatch = useDispatch();
  // const allThumbnails = useSelector(state =>
  //   state.thumbnails.transactionThumbnails.find(
  //     x => x.transactionId === props.data._id,
  //   ),
  // );
  const allThumbnails = useSelector(
    state => state.thumbnails.transactionThumbnails,
  );
  const allDivisions = useSelector(state => state.divisions.divisions);
  const transactionDocument = useSelector(
    state => state.documents.transactionDocuments,
  );
  
  // Do not delete
  // const allTypes =  useSelector(state => state.types.types);
  // const allSubTypes =  useSelector(state => state.subtypes.subtypes);

  useEffect(() => {
    if (allDivisions) {
      const division = allDivisions.find(
        div => div._id === props.data.division,
      );
      if (division) {
        setSelectedDivision(division);
      }
      // Todo : Display type and subtype as well when api is fixed
      // const type = allTypes.find(type => type._id === props.data.division);
      // const subType = allSubTypes.find(subtype => subtype._id === props.data.division);
    }

  }, [allDivisions]);

  const showActiveModel = modelName => {
    if (modelName == 'details') {
      dispatch(fetchDocumentAction(props.data._id));
      setShowImageModal(false);
      setShowDetailsModal(true);
    } else {
      dispatch(fetchThumbnailAction(props.data._id));
      setShowImageModal(true);
      setShowDetailsModal(false);
    }
  };
   const hideActiveModal = () => {
    setShowImageModal(false);
    setShowDetailsModal(false);
  };

  const hideActivePhotoModal = () => {
    setLoadingLargeImage(false);
    setShowPhotoModal(false);
  };

  const showTransactionStatus = (passNo, division) => {
    navigation.navigate('StatusReportScreen', {
      passNo: passNo,
      divisionName: division,
    });
  };

  const handleTransactionDelete = transactionDelete => {
    setTransactionDelete(transactionDelete);
    setShowDeleteAlert(true);
  };

  const handleDialogOk = () => {
  //Show Loader
   setLoading(true);
    try {
      // if we have division id than its edit mode
      if (transactionDelete) {
        setShowDeleteAlert(false);
        console.log(transactionDelete);
        dispatch(deleteTransactionAction(transactionDelete));
        alert('Transaction Deleted successfully.');	
        dispatch(fetchTranactionAction());
      }
    } catch (error) {}
    setLoading(false); 
  };

  const handleDialogCancel = () => {
    setShowDeleteAlert(false);
  };

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.maincard}>
       <View style={styles.cardview}>
         <View style={styles.cardFirstRow}>
            <Text style={styles.cardhead}>{props.data.partyName}</Text>
          </View>
          <View>
              <Text style={styles.cardtext1}>{props.data.partyCode}</Text>  
          </View>
       <View style={styles.cardSecondRow}>
            <View style={styles.gatepassn}>
                <Text style={styles.cardhead}>Gate Pass</Text>
                <Text style={styles.cardtext}>{props.data.gatePassNumber}</Text>
                </View>
            <View style={styles.cardleft}>
                <Text style={styles.cardhead}>Vehicle Number</Text>
                <Text style={styles.cardtext}>{props.data.vehicleNo}</Text>
            </View>
          </View>
       <View style={styles.cardimagediv}>
              <TouchableOpacity onPress={() => showActiveModel('details')}>
                <Image
                  style={styles.cardimageLarge}
                  source={require('../../assets/images/details.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showActiveModel('image')}>
                <Image
                  style={styles.cardimage}
                  source={require('../../assets/images/delivery.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showTransactionStatus(props.data.gatePassNumber, selectedDivision.unit)}>
                  <View style={styles.PassNumber}>
                    <MaterialCommunityIcons  size={34} name={'monitor-eye'} />
                  </View>
              </TouchableOpacity>
              {(userRole == 'Admin' || userRole == 'SuperAdmin') ? (
            <View>
                <Dialog.Container visible={showDeleteAlert}>
                <Dialog.Title>Transaction delete</Dialog.Title>
                <Dialog.Description>
                Do you want to delete this transaction? You cannot undo this action.
                </Dialog.Description>
                <Dialog.Button label="Cancel" onPress={handleDialogCancel} />
                <Dialog.Button label="Yes" onPress={handleDialogOk} />
                </Dialog.Container>
                <TouchableOpacity onPress={() => handleTransactionDelete(props.data._id)}>
                    <View style={styles.deleteIcon}>
                      <MaterialCommunityIcons  size={35 } color="red" name={'delete-circle-outline'} />
                    </View>
                </TouchableOpacity>
              </View>
            ) : null }
          </View>
      </View>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDetailsModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          hideActiveModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>
              <TransactionImageNew data={props.data} />
            </Text>
            <TouchableOpacity
              style={styles.btnTopcross}
              onPress={() => hideActiveModal()}>
              <MaterialIcons name="close" size={30} color="white" />
              {/* when click truc  to  close button */}
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
   
      <Modal
        animationType="slide"
        transparent={true}
        visible={showImageModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          hideActiveModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>
              <TransactionImage transId={props.data._id} />
            </Text>
            <TouchableOpacity
              style={styles.btnTopcross}
              onPress={() => hideActiveModal()}>
              <MaterialIcons name="close" size={30} color="white" />
              {/* when click truc  to  close button */}
            </TouchableOpacity>
          </View>
        </View>

      </Modal>
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
}
const styles = StyleSheet.create({
  maincard: {alignItems: 'center'},
  cardview: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ccc',
    width: '94%',
    marginTop: 2,
    display: 'flex',
  },

  cardleft: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingLeft:60,
  },
  gatepassn: {
    flex: 0,
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingRight:50,
  },
  cardright: {
    width: 80,
    padding: 5,
    alignItems: 'center',
  },
  cardinner: {
    marginBottom: 2,
    padding: 5,
  },
  cardhead: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'flex-start',
  },
  cardtext: {
    color: '#333',
    fontSize: 14,
  },
  cardtext1: {
    paddingLeft:10,
  },
  cardimagediv: {
    alignItems: 'center',
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop:-7,
  },
  cardimage: {
    backgroundColor: '#ccc',
    height: 35,
    width: 35,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 27,
    marginRight:27,
  },
  cardimageLarge:{
    backgroundColor: '#ccc',
    height: 25,
    width: 25,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  cardPhotoLarge: {
    width: '110%',
    height: '100%',
    marginTop: -10,
    marginLeft: -14,
    marginBottom: 4,
    borderRadius: 10,
  },
  btnContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  submitbtn: {
    height: 55,
    width: '45%',
    backgroundColor: '#0cb318',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  btnTopcross: {
    position: 'absolute',
    left: 290,
    top: 15,
    backgroundColor: 'red',
    borderRadius: 9,
  },
  detailsCloseBtn: {
    position: 'absolute',
    top: 'auto',
    bottom:-10,
    right:-290,
    zIndex:999999,
    backgroundColor: 'red',
    borderRadius: 9,
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
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
  cardFirstRow:{
   display:'flex',
   flexDirection: 'row',
   paddingLeft:10,
   paddingTop:5,
   flexWrap: 'wrap',
  alignItems: 'flex-start',

  },
  cardSecondRow:{
  display:'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  paddingTop: 4,
  marginTop:-3,
  paddingLeft: 10,
  },

  deleteIcon: {
   paddingLeft: 137,
    marginTop: 10,
  },
  PassNumber: {
    marginTop:8,
  },
});
