import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Card from '../../../Components/Card';
import NoRecordFound from '../norecord-found';
import Colors from '../../../constants/colors';
const Pcr = props => {
  const renderItems = (pcr, index) => {
    return (
      <Card key={index} style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text>TY</Text>
            <Text>{pcr.type ? pcr.type : ''}</Text>
          </View>
          <View>
            <Text>ID</Text>
            <Text>{pcr.id ? pcr.id : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text>PO_NO</Text>
            <Text>{pcr.purchase_order_no ? pcr.purchase_order_no : ''}</Text>
          </View>
          <View>
            <Text>PR_NO</Text>
            <Text>{pcr.purchase_recipt_no ? pcr.purchase_recipt_no : ''}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text>GP_NO</Text>
            <Text>{pcr.gate_pass_no ? pcr.gate_pass_no : ''}</Text>
          </View>
          <View>
            <Text>TRKNO</Text>
            <Text>{pcr.truck_no ? pcr.truck_no : ''}</Text>
          </View>
        </View>
      </Card>
    );
  };
  const renderList = () => {
    return props.data.length === 0 ? (
      <NoRecordFound></NoRecordFound>
    ) : (
      props.data.map((item, index) => renderItems(item, index))
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardTitle}>
        <Text style={styles.titleText}>PCR</Text>
      </View>
      {renderList()}
    </View>
  );
};

export default Pcr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    backgroundColor: 'red',
  },
  row: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {marginLeft: 10, height: 25},
  titleText: {fontWeight: 'bold', fontSize: 16, color: Colors.red},
});
