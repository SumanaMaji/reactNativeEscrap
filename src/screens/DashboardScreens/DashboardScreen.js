import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MemoizedGridTileList from '../../Components/GridTileList';
import * as Tiles from '../../constants/applinks';
import {requestUserPermission, notificationListener} from "../../utils/notificationService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = props => {
  const [userToken, setUserToken] = useState('');
  const userRole = useSelector(state => state.auth.role);
  useEffect(() => {
    readData('user_token');
  }, [userToken]);
  const readData = async user_token => {
    try {
      const userToken1 = await AsyncStorage.getItem(user_token);
      if (userToken1 !== null) {
        setUserToken(userToken1);
       requestUserPermission(userToken);
        notificationListener();
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  const getTiles = () => {
    
    switch (userRole) {
      case 'SuperAdmin':
        return Tiles.SUPER_ADMIN_TILES();
      case 'Admin':
        return Tiles.ADMIN_TILES();
      case 'Operator':
        return Tiles.OPERATOR_TILES();
      case 'Manager':
        return Tiles.MANAGER_TILES();
      case 'Vendor':
        return Tiles.VENDOR_TILES();
      default:
        return Tiles.OPERATOR_TILES();
    }
  };
  return <MemoizedGridTileList {...props} data={getTiles()} />;
};

DashboardScreen.navigationOptions = {
  headerTitle: 'Dashboard',
};

export default MemoizedDashboardScreen = React.memo(DashboardScreen);
