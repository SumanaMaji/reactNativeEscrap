import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Card from '../../../Components/Card';

const DivisionItems = props => {
  const navigation = useNavigation();
  // event: navigate to addoreditdivision screen with division detailsType
  const handleEditDivision = division => {
    // navigate to addoredit division screen
    navigation.navigate('AddOrEditDivisionScreen', {
      division: division,
    });
  };

  const listItems = props.divisionData.map(division => (
    <Card key={division._id} style={styles.divcard}>
      <View style={styles.divcardname}>
        <Text style={styles.sectionTitle}>{division.division} ({division.unit})</Text>
        <Text style={styles.sectionTitle}>{division.divisionName} </Text>
      </View>
      <View style={styles.divcardbtn}>
        <TouchableOpacity onPress={() => handleEditDivision(division)}>
          <MaterialIcons name="edit" size={30} color="#841584" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.deleteDivisionHandler({division})}>
          <MaterialIcons name="delete" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </Card>
  ));
  return (
    <ScrollView style={{marginTop: 15}}>
      <SafeAreaView style={styles.container}>{listItems}</SafeAreaView>
    </ScrollView>
  );
};

export default DivisionItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  card: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flexDirection: 'row',
  },
  divcard: {flexDirection: 'row', padding: 10, width: '100%', margin: 2},
  divcardname: {flex: 1},
  editbtn: {marginTop: 5, backgroundColor: '#ccc'},
});
