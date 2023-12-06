import * as React from 'react';
import {Alert, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {Colors} from '../constants';
import {
  MemoizedDashboardScreen,
  DivisionScreen,
  AddOrEditDivisionScreen,
  MemoizedDataEntryScreen,
  MemoizedTypeListScreen,
  MemoizedSubTypeListScreen,
  LoginScreen,
  TransactionReportScreen,
  StatusReportScreen,
  TransactionEntryScreen,
  UserManagmentScreen,
  FindAndSearchTransactionScreen,
  MemoizedLogsReportScreen,
  SyncLogsReportScreen,
  ErrorLogsReportScreen,
} from '../screens';

// redux
import * as authActions from '../redux/actions/auth-action';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const handleSignOut = navigation => {
    Alert.alert(
      'Sign Out',
      'Are you sure to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(authActions.logoutAction());
            navigation.navigate('LoginScreen');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="MemoizedDashboardScreen"
          component={MemoizedDashboardScreen}
          options={({navigation}) => ({
            title: 'Dashboard',
            headerRight: () => (
              <Button
                onPress={() => handleSignOut(navigation)}
                title="sign Out"
                color={Colors.red}
              />
            ),
            headerBackVisible: false,
            headerStyle: {backgroundColor: Colors.lightblue},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="TransactionEntryScreen"
          component={TransactionEntryScreen}
          options={({navigation}) => ({
            title: 'Transaction Entry',
            headerRight: () => (
              <Button
                onPress={() => handleSignOut(navigation)}
                title="sign Out"
                color={Colors.red}
              />
            ),
            headerStyle: {backgroundColor: Colors.lightblue},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="TransactionReportScreen"
          component={TransactionReportScreen}
          options={({navigation}) => ({
            title: 'Transaction Report',
            headerStyle: {backgroundColor: Colors.magenta},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="StatusReportScreen"
          component={StatusReportScreen}
          options={({navigation}) => ({
            title: 'Status Report',
            headerStyle: {backgroundColor: Colors.magenta},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="FindAndSearchTransactionScreen"
          component={FindAndSearchTransactionScreen}
          options={() => ({
            title: 'Find & Search',
            headerStyle: {backgroundColor: Colors.darkViolet},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="MemoizedDataEntryScreen"
          component={MemoizedDataEntryScreen}
          options={() => ({
            title: 'Data Entry',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="UserManagmentScreen"
          component={UserManagmentScreen}
          options={() => ({
            title: 'User Managment',
            headerStyle: {backgroundColor: Colors.cyan},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="DivisionScreen"
          component={DivisionScreen}
          options={() => ({
            title: 'Divisions',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="AddOrEditDivisionScreen"
          component={AddOrEditDivisionScreen}
          options={() => ({
            title: 'Edit Division',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="MemoizedSubTypeListScreen"
          component={MemoizedSubTypeListScreen}
          options={() => ({
            title: 'Subtypes',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="MemoizedTypeListScreen"
          component={MemoizedTypeListScreen}
          options={() => ({
            title: 'Types',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />

        <Stack.Screen
          name="MemoizedLogsReportScreen"
          component={MemoizedLogsReportScreen}
          options={() => ({
            title: 'Logs',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
          <Stack.Screen
          name="SyncLogsReportScreen"
          component={SyncLogsReportScreen}
          options={() => ({
            title: 'Logs',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
          <Stack.Screen
          name="ErrorLogsReportScreen"
          component={ErrorLogsReportScreen}
          options={() => ({
            title: 'Logs',
            headerStyle: {backgroundColor: Colors.red},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
