import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import Card from '../../../Components/Card';
import NoRecordFound from '../norecord-found';
const ScrapQuality = props => {
  const renderItems = (scrapQuality, index) => (
    <Card key={index} style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text>ID</Text>
          <Text>{scrapQuality.divisionId ? scrapQuality.divisionId : ''}</Text>
        </View>
        <View>
          <Text>DT</Text>
          <Text>
            {scrapQuality.date
              ? moment(scrapQuality.date).format('DD/MM/YYYY').toString()
              : ''}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text>GP_NO</Text>
          <Text>
            {scrapQuality.gate_pass_no ? scrapQuality.gate_pass_no : ''}{' '}
          </Text>
        </View>
        <View>
          <Text>GP_DT</Text>
          <Text>
            {scrapQuality.gate_pass_date
              ? moment(scrapQuality.gate_pass_date)
                  .format('DD/MM/YYYY')
                  .toString()
              : ''}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Text>TRKNO</Text>
          <Text>{scrapQuality.truck_no ? scrapQuality.truck_no : ''} </Text>
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

export default ScrapQuality;

const styles = StyleSheet.create({
  card: {flex: 1, flexDirection: 'row', padding: 10, margin: 5},
  row: {
    flex: 1,
    flexDirection: 'column',
  },
});
