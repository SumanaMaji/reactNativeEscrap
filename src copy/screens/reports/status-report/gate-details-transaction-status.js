// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import moment from 'moment';
// import Card from '../../../Components/Card';
// import NoRecordFound from '../norecord-found';
// const GateDetails = props => {
//   const renderItems = gatePass => (
//     <Card style={styles.card}>
//       <View style={styles.row}>
//         <View>
//           <Text>GP_DT</Text>
//           <Text>
//             {moment(gatePass.gate_pass_date).format('DD/MM/YYYY').toString()}
//           </Text>
//         </View>
//         <View>
//           <Text>INDENT_NO</Text>
//           <Text>{gatePass.indent_number ? gatePass.indent_number : ''}</Text>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View>
//           <Text>PARTY_NAME</Text>
//           <Text>{gatePass.party_name ? gatePass.party_name : ''}</Text>
//         </View>
//         <View>
//           <Text>PARTY_CODE</Text>
//           <Text>{gatePass.party_code ? gatePass.party_code : ''}</Text>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View>
//           <Text>BILL_NO</Text>
//           <Text>{gatePass.bill_no ? gatePass.bill_no : ''}</Text>
//         </View>
//         <View>
//           <Text>BILL_DT</Text>
//           <Text>
//             {gatePass.bill_date
//               ? moment(gatePass.gate_pass_date).format('DD/MM/YYYY').toString()
//               : ''}
//           </Text>
//         </View>
//       </View>
//     </Card>
//   );

//   const renderList = () => {
//     const view = props.data ? (
//       <NoRecordFound></NoRecordFound>
//     ) : (
//       renderItems(props.data)
//     );
//     return view;
//   };

//   return <View>{renderList()}</View>;
// };

// export default GateDetails;
// const styles = StyleSheet.create({
//   card: {flex: 1, flexDirection: 'row', padding: 10, margin: 5},
//   row: {
//     flex: 1,
//     flexDirection: 'column',
//   },
// });
