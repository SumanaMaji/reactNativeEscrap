import React from 'react';
import MemoizedGridTileList from '../../Components/GridTileList';
import * as Tiles from '../../constants/applinks';

const DataEntryScreen = props => {
  return <MemoizedGridTileList {...props} data={Tiles.DATA_ENTRY_TILES()} />;
};

DataEntryScreen.navigationOptions = {
  headerTitle: 'Data Entry',
};

export default MemoizedDataEntryScreen = React.memo(DataEntryScreen);