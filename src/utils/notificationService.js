import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Button, Alert } from "react-native";
import PushNotification from "react-native-push-notification";
import * as Urls from '../constants/ConstantVariables/Urls';

export async function requestUserPermission(userToken) {

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken(userToken);
  }
}
const getFcmToken = async (userToken) => {
  // let fcmToken = await AsyncStorage.getItem('fcmToken');
  // console.log(fcmToken, "-->old version");
  // console.log('userToken-->:'+userToken)
  
  // if (!fcmToken) {
  //   try {
  //     const fcmToken = await messaging().getToken();
  //     if (fcmToken) {
  //      console.log(fcmToken, "-->new version")
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
  //   catch (error) {
  //     console.log(error, 'error')
  //   }
  // }
  let fcmToken = null
  try{
    fcmToken = await messaging().getToken();
    console.log(`Try block execute`)
  }catch(error) {
    console.log(`Error in FCM: ${error}`)
  }
  console.log(`FCM Token Generate: ${fcmToken}`)
  if (fcmToken) {
   // console.log(fcmToken, "-->new version")
   //  await AsyncStorage.setItem('fcmToken', fcmToken);
   console.log(`New FCM Token: ${fcmToken}`)
     let dataToSend={
       fcmToken: fcmToken
     };
     console.log(dataToSend);
     fetch(Urls.fcmToken, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(dataToSend),
     })
       .then(response => response.json())
       .then(responseJson => {
         console.log('Success1:', JSON.stringify(responseJson));
        //  if (responseJson.success) {
        //    console.log('Success2:');         
        //  } else {
        //    alert(responseJson.message);
        //  }
       })
       .catch(error => {
         console.error('Error:', error);
       });
   }
}

export const notificationListener = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    // let notificationData = JSON.parse(remoteMessage.notification.body);
    // console.log(
    //   'Notification caused app to open from background state:', remoteMessage.notification.title, 'Gate Pass: '+ notificationData.gatePassNumber +'\n'+ 'Vendor Name: ' + notificationData.partyName+'\n'+
    //   'Order Id: '+ notificationData.partyCode +'\n'+ 'Truck no: ' + notificationData.vehicleNo,
    // );
    // Alert.alert(remoteMessage.notification.title, 'Gate Pass: '+ notificationData.gatePassNumber +'\n'+ 'Vendor Name: ' + notificationData.partyName+'\n'+
    // 'Order Id: '+ notificationData.partyCode +'\n'+ 'Truck no: ' + notificationData.vehicleNo);
    // Alert.alert('Notification',('Vendor Name: '+ remoteMessage.data.partyName, 'Gate Pass: '+ remoteMessage.data.gatePassNumber + 
    // 'Order Id: '+ remoteMessage.data.partyCode + 'Truck no: ' + remoteMessage.data.vehicleNo));
    let displayMessage = 'Vendor Name: '+ remoteMessage.data.partyName +'\n'+ 'Gate Pass: '+ remoteMessage.data.gatePassNumber + 
    '\n'+'Order Id: '+ remoteMessage.data.partyCode +'\n'+ 'Truck no: ' + remoteMessage.data.vehicleNo;
    Alert.alert('Notification',displayMessage);
  });
  messaging().onMessage(async remoteMessage => {
   // console.log("recevied in foreground", JSON.parse(remoteMessage.notification.body))
   let displayMessage = 'Vendor Name: '+ remoteMessage.data.partyName +'\n'+ 'Gate Pass: '+ remoteMessage.data.gatePassNumber + 
   '\n'+'Order Id: '+ remoteMessage.data.partyCode +'\n'+ 'Truck no: ' + remoteMessage.data.vehicleNo;
   Alert.alert('Notification',displayMessage);
    // let notificationData = JSON.parse(remoteMessage.notification.body);
    // Alert.alert(remoteMessage.notification.title, 'Gate Pass: '+ notificationData.gatePassNumber +'\n'+ 'Vendor Name: ' + notificationData.partyName+'\n'+
    // 'Order Id: '+ notificationData.partyCode +'\n'+ 'Truck no: ' + notificationData.vehicleNo);
    //  let notificationData = JSON.parse(remoteMessage.data);
    // Alert.alert('Notification',('Vendor Name: '+ remoteMessage.data.partyName, 'Gate Pass: '+ remoteMessage.data.gatePassNumber + 
    // 'Order Id: '+ remoteMessage.data.partyCode + 'Truck no: ' + remoteMessage.data.vehicleNo));
  
    //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification.title +'\n'+remoteMessage.notification.body.transaction.vehicleNo+'\n'+remoteMessage.notification.body.transaction.gatePassNumber+'\n'+remoteMessage.notification.body.transaction.orderNumber));
    // instead of alert I want to show a pop up notification

  })
  // Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  let displayMessage = 'Vendor Name: '+ remoteMessage.data.partyName +'\n'+ 'Gate Pass: '+ remoteMessage.data.gatePassNumber + 
  '\n'+'Order Id: '+ remoteMessage.data.partyCode +'\n'+ 'Truck no: ' + remoteMessage.data.vehicleNo;
  Alert.alert('Notification',displayMessage);
 // console.log(remoteMessage.data);
  // let notificationMessage = JSON.parse(remoteMessage.notification.body);
  // console.log("hello-->"+remoteMessage.data);
  // console.log("DATA",remoteMessage.getData().toString());
  // console.log(notificationMessage)
  // PushNotification.configure({
  //   // (optional) Called when Token is generated (iOS and Android)
  //   onRegister: function (token) {
  //     console.log("TOKEN:", token);
  //   },   
  //   // (required) Called when a remote is received or opened, or local notification is opened
  //   onNotification: function (notification) {
  //   console.log("push"+notification)
  //   },
  //    // Android only
  //    senderID: "767534331315",
  //   // This line solves the problem that I was facing.
  //   requestPermissions: Platform.OS === 'ios',
  //   popInitialNotification: true,
    
  //   // requestPermissions: true,
  //   });
  //   PushNotification.createChannel(
  //   {
  //       channelId: "4", // (required)
  //       channelName: "escrap", // (required)
  //   },
  //   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  //   PushNotification.localNotification({
  //       channelId: "4",
  //       autoCancel: true,
  //       // bigText: getAllUnReadMessageTransaction,
  //       //'This is local notification demo in React Native app. Only shown, when expanded.',
  //       //subText: 'Notifications',//notification.partyCode,//'Local Notification Demo',
  //       // title: remoteMessage.notification.title,
  //       // message: 'Gate Pass: '+ notificationMessage.gatePassNumber + 'Vendor Name: ' + notificationMessage.partyName+
  //       // 'Order Id: '+ notificationMessage.partyCode + 'Truck no: ' + notificationMessage.vehicleNo,
  //       title: 'hi',
  //       message: 'hello',
  //      // messageId: notification._id,
  //       vibrate: true,
  //       vibration: 300,
  //       playSound: true,
  //       soundName: 'default',
  //       actions: '["Yes", "No"]'
  //       });
    

  // let notificationData = JSON.parse(remoteMessage.notification.body);
  // console.log(
  //   remoteMessage.notification.title, 'Gate Pass: '+ notificationData.gatePassNumber +'\n'+ 'Vendor Name: ' + notificationData.partyName+'\n'+
  //   'Order Id: '+ notificationData.partyCode +'\n'+ 'Truck no: ' + notificationData.vehicleNo
  // );
});
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // let notificationData = JSON.parse(remoteMessage.notification.body);
        // console.log(
        //   'Notification caused app to open from quit state:',
        //   remoteMessage.notification,
        // );
        // Alert.alert(remoteMessage.notification.title, 'Gate Pass: '+ notificationData.gatePassNumber +'\n'+ 'Vendor Name: ' + notificationData.partyName+'\n'+
        // 'Order Id: '+ notificationData.partyCode +'\n'+ 'Truck no: ' + notificationData.vehicleNo);
        let displayMessage = 'Vendor Name: '+ remoteMessage.data.partyName +'\n'+ 'Gate Pass: '+ remoteMessage.data.gatePassNumber + 
        '\n'+'Order Id: '+ remoteMessage.data.partyCode +'\n'+ 'Truck no: ' + remoteMessage.data.vehicleNo;
        Alert.alert('Notification',displayMessage);
      }
  });
}
