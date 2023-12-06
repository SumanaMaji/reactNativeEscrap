import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchTranactionBySearchTextAction,
  clearTransactionBySearchTextAction,
} from '../../../redux/actions/report-action';
import TransactionCard from '../../../Components/Transaction/TransactionCard';
import Colors from '../../../constants/colors';
import NoRecordFound from '../norecord-found';
import useDebounce from '../../../hooks/useDebounce';

const FindAndSearchTransactionScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const debouncedValue = useDebounce(searchText, 500);
  const allFilteredResults = useSelector(
    state => state.reports.filteredByTextSearch,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedValue.length >= 6) {
      dispatch(fetchTranactionBySearchTextAction(debouncedValue));
    } else {
      dispatch(clearTransactionBySearchTextAction());
    }
  }, [debouncedValue]);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.searchbox}>
          <TextInput
            autoFocus={true}
            style={styles.searchText}
            placeholder="Erp Ref No / Vehicle No"
            onChangeText={searchText => setSearchText(searchText)}
          />
        </View>
        {allFilteredResults.length > 0 ? (
          allFilteredResults.map((rowData, index) => (
            <TransactionCard data={rowData} key={index}></TransactionCard>
          ))
        ) : (
          <NoRecordFound></NoRecordFound>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FindAndSearchTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
  searchbox: {
    margin: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },

  searchText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 2,
  },
});
