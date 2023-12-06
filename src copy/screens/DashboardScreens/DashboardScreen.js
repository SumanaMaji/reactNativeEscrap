import React, { useEffect, callback, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MemoizedGridTileList from '../../Components/GridTileList';
import * as Tiles from '../../constants/applinks';
import {
  Platform, TouchableOpacity, View, Text, Modal, StyleSheet
} from 'react-native';
//import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import {
  fetchUnReadTranactionAction,
  fetchReadTranactionAction,
} from '../../redux/actions/transaction-action';

import {useNavigation} from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Moment from 'moment';

const DashboardScreen = props => {
  const navigation = useNavigation();
  //useState
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [vehicleNo, setVehicleNo] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [partyName, setPartyName] = useState(null);
  const [gateInOut, setGateInOut] = useState(null);
  const [gatePassDate, setGatePassDate] = useState(null);
  const [gatePassNumber, setGatePassNumber] = useState(null);
  
  // useSelectors
  const getUnReadTransaction = useSelector(
    state => state.transactions.transactions,
  );
  const getAllUnReadCountTransaction = useSelector(
    state => state.transactions.count,
  );
  const getReadDataTransaction = useSelector(
    state => state.transactions.transactions,
  );
  const userRole = useSelector(state => state.auth.role);
  const allDivisions = useSelector(state => state.divisions.divisions);
  // dispatch
  const dispatch = useDispatch();

  // useEffeect
  useEffect(()=>{ 
    console.log(userRole);
    if(userRole == 'Admin' || userRole == 'SuperAdmin'){
      //PushNotification.popInitialNotification(callback)
      PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },   
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        fetchReadTranactionAction(notification.messageId);
        setShowDetailsModal(true);
        if(getReadDataTransaction){
          getReadDataTransaction.forEach(function (arrayItem) {
            if(notification.messageId == arrayItem._id){
            const division = arrayItem.division;
            if (allDivisions) {
              const division = allDivisions.find(
                div => div._id === arrayItem.division,
              );
              if (division) {
                setSelectedDivision(division);
              }
            }
          
            setVehicleNo(arrayItem.vehicleNo);
            setGateInOut(arrayItem.gateInOut);
            setPartyName(arrayItem.partyName);
            setGatePassNumber(arrayItem.gatePassNumber);
            setGatePassDate(arrayItem.gatePassDate);    
            }
          });
        }
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // This line solves the problem that I was facing.
      requestPermissions: Platform.OS === 'ios',
      popInitialNotification: true,
      // requestPermissions: true,
      });
      PushNotification.createChannel(
      {
          channelId: "4", // (required)
          channelName: "escrap", // (required)
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
      dispatch(fetchUnReadTranactionAction());
      if(getAllUnReadCountTransaction > 0)
      {
        getUnReadTransaction.map((notification) => {
        PushNotification.localNotification({
        channelId: "4",
        autoCancel: true,
        // bigText: getAllUnReadMessageTransaction,
        //'This is local notification demo in React Native app. Only shown, when expanded.',
        //subText: 'Notifications',//notification.partyCode,//'Local Notification Demo',
        title: notification.partyName,//'Local Notification Title',
        message:notification.partyCode+'-'+notification.vehicleNo,//'Expand me to see more',
        messageId: notification._id,
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["Yes", "No"]'
        });
      });
      }
    }
  }, [getAllUnReadCountTransaction, userRole, getReadDataTransaction]);
 
  const hideActiveModal = () => {
    setShowDetailsModal(false);
  };

  const getTiles = () => {
    switch (userRole) {
      case 'SuperAdmin':
        return Tiles.SUPER_ADMIN_TILES();
      case 'Admin':
        return Tiles.ADMIN_TILES();
      case 'Operator':
        return Tiles.OPERATOR_TILES();
      case 'Manager':
        return Tiles.MANAGER_TILES();
      case 'Vendor':
        return Tiles.VENDOR_TILES();
      default:
        return Tiles.OPERATOR_TILES();
    }
  };
  
  return (
    <>
  <View>
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
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Gate</Text>
              <Text style={styles.cardtext}>
                {gateInOut == 1 ? 'Inside Gate' : 'Outside Gate'}
              </Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Gate Pass No.</Text>
              <Text style={styles.cardtext}>{gatePassNumber}</Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Gate Pass Date</Text>
              <Text style={styles.cardtext}>{Moment(gatePassDate).format('DD-MMM-YYYY')}</Text>
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
              <Text style={styles.cardtext}>{partyName}</Text>
            </View>
            <View style={styles.cardinner}>
              <Text style={styles.cardhead}>Vehicle Number</Text>
              <Text style={styles.cardtext}>{vehicleNo}</Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.detailsCloseBtn}
                onPress={() => hideActiveModal()}>
                <MaterialIcons name="close" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  </View>
  <MemoizedGridTileList {...props} data={getTiles()} />
  </>
  );
  
};

DashboardScreen.navigationOptions = {
 headerTitle: 'Dashboard'
};

export default MemoizedDashboardScreen = React.memo(DashboardScreen);

const styles = StyleSheet.create({
  maincard: {alignItems: 'center'},
  cardinner: {
    marginBottom: 2,
    padding: 5,
  },
  cardhead: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardtext: {
    color: '#333',
    fontSize: 14,
  },
  btnContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  detailsCloseBtn: {
    position: 'absolute',
    top: -320,
    right:-290,
    zIndex:999999,
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
});
