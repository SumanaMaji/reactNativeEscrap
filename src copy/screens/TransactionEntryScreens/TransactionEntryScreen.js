import React, {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors} from '../../constants';
import Transaction from '../../Components/Transaction/Transaction';
import TransactionCard from '../../Components/Transaction/TransactionCard';

const TransactionEntryScreen = () => {
  const [gateMode, setGateMode] = useState(0);
  const allTransactions = useSelector(state => state.transactions.transactions);
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.greenbutton}
          title="INSIDE GATE"
          color={Colors.green}
          onPress={() => {
            setGateMode(1);
          }}>
          <Text style={styles.btnText}>INSIDE GATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.redbutton}
          color={Colors.red}
          title="OUTSIDE GATE"
          onPress={() => {
            setGateMode(2);
          }}>
          <Text style={styles.btnText}>OUTSIDE GATE</Text>
        </TouchableOpacity>
      </View>

      {/* this modal for inside Gate start */}
      <Transaction GateMode={gateMode} GateModeHandler={setGateMode} />
      {allTransactions && (
        <ScrollView>
          {allTransactions.map((rowData, index) => (
            <TransactionCard data={rowData} key={index} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TransactionEntryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  btnContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:'97%',
    marginLeft:6
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#fff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  greenbutton: {
    width: '48%',
    marginTop: 10,
    backgroundColor: 'green',
    padding: 15,
    marginLeft:5,
    marginRight:5,
    borderRadius: 10,
    textAlign: 'center',
  },
  redbutton: {
    width: '48%',
    marginLeft:5,
    marginRight:5,
    marginTop: 10,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
  },
  closebutton: {
    backgroundColor: 'red',
    padding: 2,
    color: 'white',
    borderRadius: 100,
    position: 'absolute',
    right: 5,
    top: 5,
    marginBottom: 10,
  },
  green: {
    backgroundColor: Colors.green,
  },
  red: {
    backgroundColor: Colors.red,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
});
