import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../../Components/Card';

const TypeItem = props => {
  const type = props.typeItem;
  console.log("typedel"+type);
  const allDivisions = useSelector(state => state.divisions.divisions);
  const division = allDivisions.find(x => x._id === type.division);
  // JSX
  return (
    <Card style={styles.divcard}>
      <View style={styles.divcardname}>
        <Text style={styles.sectionTitle}>{type.typeName} </Text>
        <Text style={styles.sectionSubTitle}>
          {division ? division.division : ''}
        </Text>
      </View>
      <View style={styles.divcardbtn}>
        <TouchableOpacity onPress={() => props.handleEditType(type)}>
          <MaterialCommunityIcons
            name="border-color"
            size={30}
            color="#841584"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.handleTypeDelete(type)}>
          <MaterialCommunityIcons name="delete" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default MemoizedTypeItem = React.memo(TypeItem);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionSubTitle: {
    fontSize: 16,
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
