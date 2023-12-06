// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import moment from 'moment';
// import Card from '../../../Components/Card';
// import NoRecordFound from '../norecord-found';
// const GrossTare = props => {
//   const renderItems = grossTare => (
//     <Card style={styles.card}>
//       <View style={styles.row}>
//         <View>
//           <Text>TRKNO</Text>
//           <Text>{grossTare.truck_no ? grossTare.truck_no : ''}</Text>
//         </View>
//         <View>
//           <Text>TOKEN_ID</Text>
//           <Text>{grossTare.token_id ? grossTare.token_id : ''}</Text>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <View>
//           <Text>GP_DT</Text>
//           <Text>
//             {grossTare.gate_pass_date
//               ? moment(grossTare.gate_pass_date).format('DD/MM/YYYY').toString()
//               : ''}
//           </Text>
//         </View>
//       </View>
//     </Card>
//   );

//   const renderList = () =>
//     props.data ? <NoRecordFound></NoRecordFound> : renderItems(props.data);
//   return <View>{renderList()}</View>;
// };

// export default GrossTare;

// const styles = StyleSheet.create({
//   card: {flex: 1, flexDirection: 'row', padding: 10, margin: 5},
//   row: {
//     flex: 1,
//     flexDirection: 'column',
//   },
// });
