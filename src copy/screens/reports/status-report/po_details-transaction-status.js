import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import Card from '../../../Components/Card';
import NoRecordFound from '../norecord-found';
const PurchaseOrder = props => {
 
  const renderItems = (purchaseOrder, index) => (
    
    <Card key={index} style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text>PO_DT</Text>
          <Text>
            {purchaseOrder.order_date
              ? moment(purchaseOrder.order_date).format('DD/MM/YYYY').toString()
              : ''}
          </Text>
        </View>
        <View>
          <Text>GP_NO</Text>
          <Text>
            {purchaseOrder.gate_pass_no ? purchaseOrder.gate_pass_no : ''}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderList = () =>
    props.data.length === 0 ? (
      <NoRecordFound></NoRecordFound>
    ) : (
      props.data.map((item, index) => renderItems(item, index))
    );
  return <ScrollView>{renderList()}</ScrollView>;
};

export default PurchaseOrder;
const styles = StyleSheet.create({
  card: {flex: 1, flexDirection: 'row', padding: 10, margin: 5},
  row: {
    flex: 1,
    flexDirection: 'column',
  },
});
