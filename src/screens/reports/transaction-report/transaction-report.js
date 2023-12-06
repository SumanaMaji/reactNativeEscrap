import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Loader from '../../../Components/Loader/Loader';
import TransactionCard from '../../../Components/Transaction/TransactionCard';
import {useSelector, useDispatch} from 'react-redux';
import {fetchTranactionByTimeRangeAction,
  fetchTranactionBySearchTextAction,
  clearTransactionBySearchTextAction,
  fetchTranactionBySearchDateCode,
  clearTransactionBySearchDateCodeAction,
} from '../../../redux/actions/report-action';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

// components
import AutoSearchText from '../../../Components/AutoSearchText';

const TransactionReportScreen = ({navigation}) => {

  const userRole = useSelector(state => state.auth.role);

  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 1)),
  );
  const [fromDatePickerMode, setFromDatePickerMode] = useState('date');
  const [fromDatePickerVisibility, setFromDatePickerVisibility] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [toDatePickerMode, setToDatePickerMode] = useState('date');
  const [toDatePickerVisibility, setToDatePickerVisibility] = useState(false);
  const [suggestionFlag, setSuggestionFlag] = useState(false);

  //const debouncedValue = useDebounce(searchText, 500);
  const allFilteredResults = useSelector(
    state => state.reports.filteredByTextSearch,
  );

  const allFilteredDateCodeResults = useSelector(
    state => state.reports.filteredByDateCodeSearch,
  );
  
  // useSelector
  const allfilteredTransaction = useSelector(
    state => state.reports.filteredByTimeRange,
  );
 
  // dispatch
  const dispatch = useDispatch();

  // useEffects
  useEffect(() => {
    if (fromDate && toDate) {
      setLoading(true);
      dispatch(clearTransactionBySearchDateCodeAction());
      dispatch(
        fetchTranactionByTimeRangeAction(
          fromDate.toISOString(),
          toDate.toISOString(),
        ),
      );
      setLoading(false);
    }
  }, [fromDate, toDate]);

  // event : to date change
  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setToDatePickerVisibility(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  // event : from date change
  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setFromDatePickerVisibility(Platform.OS === 'ios');
    setFromDate(currentDate);
  };

  const showMode = (control, currentMode) => {
    if (control === 'toDate') {
      setToDatePickerVisibility(true);
      setToDatePickerMode(currentMode);
    } else if (control === 'fromDate') {
      setFromDatePickerVisibility(true);
      setFromDatePickerMode(currentMode);
    }
  };

  const showDatepicker = control => {
    showMode(control, 'date');
  };
  const gotToList= (txt) => {
    console.log("text"+txt);
    if (txt) {
      setLoading(true);
      dispatch(
        fetchTranactionBySearchDateCode(
          fromDate.toISOString(),
          toDate.toISOString(),
          txt
        ),
      );
      setLoading(false);
      setSuggestionFlag(true);
    }
    else{
      setSuggestionFlag(false);
    }
  };
    // event: clear data
    const gotToClearPress = useCallback(() => {
          if (fromDate && toDate) {
            setLoading(true);
            dispatch(clearTransactionBySearchDateCodeAction());
            dispatch(
              fetchTranactionByTimeRangeAction(
                fromDate.toISOString(),
                toDate.toISOString(),
              ),
            );
            setLoading(false);
            setSuggestionFlag(false);
          }
      });

  return (
    <View style={styles.container}>
      <View style={styles.cardview}>
        <View style={styles.cardleft}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              showDatepicker('fromDate');
            }}>
            <Text style={styles.dateText}>
              {Moment(fromDate).format('DD-MMM-YYYY')}
            </Text>
          </TouchableOpacity>
          {fromDatePickerVisibility && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fromDate}
              mode={fromDatePickerMode}
              is24Hour={true}
              display="calendar"
              onChange={onFromDateChange}
              maximumDate={new Date()}
            />
          )}
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              showDatepicker('toDate');
            }}>
            <Text style={styles.dateText}>
              {Moment(toDate).format('DD-MMM-YYYY')}
            </Text>
          </TouchableOpacity>
          {toDatePickerVisibility && (
            <DateTimePicker
              testID="dateTimePicker"
              value={toDate}
              mode={toDatePickerMode}
              is24Hour={true}
              display="calendar"
              onChange={onToDateChange}
              maximumDate={new Date()}
              minimumDate={fromDate}
            />
          )}       
        </View>
      </View>
      {(userRole != 'Vendor') ? (
      <View style={styles.cardview}>
      <AutoSearchText goToTransactionReportHandler={gotToList} goToTransactionReportClearHandler={gotToClearPress}/>
      </View>
      ) : null }
     
      <Loader loading={loading} />
      <ScrollView> 
        {
          suggestionFlag ?
          (allFilteredDateCodeResults.map((rowData, index) => (
            <TransactionCard data={rowData} key={index} />
          )) )
          :
          (
            allfilteredTransaction.map((rowData, index) => (
              <TransactionCard data={rowData} key={index} />
            ))
          )
        }
        {/* {allfilteredTransaction &&  allFilteredDateCodeResults == '' && allFilteredDateCodeResults.length == 0 ? 
        allfilteredTransaction.map((rowData, index) => (
          <TransactionCard data={rowData} key={index} />
        ))
        :  allFilteredDateCodeResults ? 
        allFilteredDateCodeResults.map((rowData, index) => (
          <TransactionCard data={rowData} key={index} />
        )) 
        : 'null'} */}
        
        {/* do not removed */ }
           {/* {allFilteredDateCodeResults &&
          allFilteredDateCodeResults.map((rowData, index) => (
            <TransactionCard data={rowData} key={index} />
          ))} */}
          
      </ScrollView>
    </View>
  );
};

export default TransactionReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
  btngrp: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dateText: {
    fontSize: 17,
    paddingTop: 7,
    fontWeight: 'bold',
  },

  input: {
    width: 168,
    height: 55,
    // backgroundColor: '#42A5F5',
    margin: 4,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputBox: {
    width: 300,
    height: 55,
    // backgroundColor: '#42A5F5',
    margin: 4,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchIconStyle: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    // marginTop: 15,
    // marginRight: 20,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  cardview: {
    width: '98%',
    marginTop: 5,
    flexDirection: 'row',
    display: 'flex',
    marginLeft: 5,
    marginRight: 5,
  },
  cardleft: {
    flex: 1,
    //borderRightWidth: 0,
    width: 350,
    flexDirection: 'row',
    //borderLeftWidth:0,
  },
  cardright: {
    width: 200,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
  },
  Icon:{
    marginLeft: 4,
    marginRight: 4,
  },
});
