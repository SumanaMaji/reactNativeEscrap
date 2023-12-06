import React from 'react';
import {FlatList} from 'react-native';
import GridTile from './GridTile';

const GridTileList = (props) => {

    const renderTileItem = ({item}) => {
      console.log(item);
        return (
          <GridTile
            title={item.title}
            color={item.color}
            icon={item.icon}
            onSelect={() => {
              props.navigation.navigate(item.navigateTo);
            }}
          />
        );
      };
    
      return (
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={props.data}
          renderItem={renderTileItem}
          numColumns={2}
        />
      );

}

export default MemoizedGridTileList = React.memo(GridTileList);