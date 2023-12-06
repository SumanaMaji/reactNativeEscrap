import React from 'react';
import {useSelector} from 'react-redux';
import MemoizedGridTileList from '../../Components/GridTileList';
import * as Tiles from '../../constants/applinks';

const DashboardScreen = props => {
  
  const userRole = useSelector(state => state.auth.role);

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
