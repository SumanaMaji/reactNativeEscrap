import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../../Components/Card';

const SubTypeItem = props => {
  const subtype = props.subtypeItem;
  const allDivisions = useSelector(state => state.divisions.divisions);
  const allTypes = useSelector(state => state.types.types);
  const division = allDivisions.find(x => x._id === subtype.division);
  const type = allTypes.find(x => x._id === subtype.type);
  // JSX
  return (
    <Card style={styles.divcard}>
      <View style={styles.divcardname}>
        <Text style={styles.sectionTitle}>{subtype.subTypeName} </Text>
        <Text style={styles.sectionSubTitle}>
          {division ? division.division : ''}/{type ? type.typeName : ''}
        </Text>
      </View>
      <View style={styles.divcardbtn}>
        <TouchableOpacity onPress={() => props.handleEditSubType(subtype)}>
          <MaterialCommunityIcons
            name="border-color"
            size={30}
            color="#841584"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.handleSubTypeDelete(subtype)}>
          <MaterialCommunityIcons name="delete" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default MemoizedSubTypeItem = React.memo(SubTypeItem);

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
