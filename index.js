/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from "react-native-push-notification";


// //Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('test');
//     debugger
//     console.log(JSON.stringify(remoteMessage));
    
//     let notificationData = JSON.parse(remoteMessage.notification.body);
//     console.log(
//       remoteMessage.notification.title, '1Gate Pass: '+ notificationData.gatePassNumber +'\n'+ 'Vendor Name: ' + notificationData.partyName+'\n'+
//       'Order Id: '+ notificationData.partyCode +'\n'+ 'Truck no: ' + notificationData.vehicleNo
//     );
//   });
AppRegistry.registerComponent(appName, () => App);
