import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from '../../Components/Card';
import Colors from '../../constants/colors';
const NoRecordFound = () => {
  return (
    <Card style={styles.card}>
      <View>
        <Text style={styles.text}>No Record Found</Text>
      </View>
    </Card>
  );
};
export default NoRecordFound;
const styles = StyleSheet.create({
  card: {flex: 1, margin: 10, alignItems: 'center', justifyContent: 'center'},
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.red,
  },
});
