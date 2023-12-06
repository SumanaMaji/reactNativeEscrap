import React from 'react';
import MemoizedGridTileList from '../../Components/GridTileList';
import * as Tiles from '../../constants/applinks';

const LogsReportScreen = props => {
    return <MemoizedGridTileList {...props} data={Tiles.DATA_ENTRY_TILES()} />;
  };
  
  LogsReportScreen.navigationOptions = {
    headerTitle: 'Logs',
  };
  
  export default MemoizedLogsReportScreen = React.memo(LogsReportScreen);