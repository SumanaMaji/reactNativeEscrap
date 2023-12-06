import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Card from '../../Components/Card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
//fetch data from api

const UserManagmentList = props => {
  const userRole = useSelector(state => state.auth.role);
 // console.log(userRole)
  //console.log(JSON.stringify(props));
  return (
    <SafeAreaView style={styles.container}>
      {props.userListProps.map(userListData => (
        <Card style={styles.divcard} key={userListData.Id}>
          <View style={styles.divcardname}>
            <Text style={styles.sectionTitle}>Name: {userListData.Name} </Text>
            <Text style={styles.sectionTitle}>
              UserName:{userListData.UserName}
            </Text>
            <Text style={styles.sectionTitle}>
              Mobile No:{userListData.MobileNo}
            </Text>
            <Text style={styles.sectionTitle}>Email:{userListData.Email} </Text>
            <Text style={styles.sectionTitle}>Role:{userListData.Role} </Text>
          </View>
          <View style={styles.divcardbtn}>
            <TouchableOpacity
              onPress={() => props.updateUserHandlers(userListData.Id)}>
              <MaterialIcons name="edit" size={30} color="#841584" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.deleteUserHandlers(userListData.Id)}>
              <MaterialIcons name="delete" size={30} color="red" />
            </TouchableOpacity>
            {(userRole == 'Admin' || userRole == 'SuperAdmin') ? (
            <TouchableOpacity
              onPress={() => props.updatePasswordHandlers(userListData.Id)}>
              <MaterialIcons name="lock-outline" size={30} color="#841584" />
            </TouchableOpacity>
            ) : null }
          </View>
        </Card>
      ))}
    </SafeAreaView>
  );
};

UserManagmentList.navigationOptions = {
  headerTitle: 'UserManagment List',
};
export default UserManagmentList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign:'left',
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
