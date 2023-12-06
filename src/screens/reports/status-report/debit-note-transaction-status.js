import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import Card from '../../../Components/Card';
import NoRecordFound from '../norecord-found';
const DebitNote = props => {
  const renderItems = (debitNote, index) => (
    <Card key={index} style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text>TY</Text>
          <Text>{debitNote.type ? debitNote.type : ''}</Text>
        </View>
        <View>
          <Text>ID</Text>
          <Text>{debitNote.id ? debitNote.id : ''}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text>AVD_NO</Text>
          <Text>{debitNote.adv_no ? debitNote.adv_no : ''}</Text>
        </View>
        <View>
          <Text>PO_NO</Text>
          <Text>
            {debitNote.purchase_order_no ? debitNote.purchase_order_no : ''}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text>PR_NO</Text>
          <Text>
            {debitNote.purchase_receipt_no ? debitNote.purchase_receipt_no : ''}
          </Text>
        </View>
        <View>
          <Text>GP_NO</Text>
          <Text>{debitNote.gate_pass_no ? debitNote.gate_pass_no : ''}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text>GP_DT</Text>
          <Text>
            {debitNote.gate_pass_date
              ? moment(debitNote.gate_pass_date).format('DD/MM/YYYY').toString()
              : ''}
          </Text>
        </View>
        <View>
          <Text>TRK_NO</Text>
          <Text>{debitNote.truck_no ? debitNote.truck_no : ''}</Text>
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

export default DebitNote;

const styles = StyleSheet.create({
  card: {flex: 1, flexDirection: 'row', padding: 10, margin: 5},
  row: {
    flex: 1,
    flexDirection: 'column',
  },
});
