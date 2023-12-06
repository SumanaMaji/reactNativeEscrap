import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import {
  fetchStatusReportAction,
  clearFilteredReportAction,
} from '../../../redux/actions/report-action';
import Colors from '../../../constants/colors';
import _ from 'underscore';
import Card from '../../../Components/Card';
import NoRecordFound from '../norecord-found';
import Loader from '../../../Components/Loader/Loader';

const StatusReportScreen = ({navigation, route}) => {
  const userRole = useSelector(state => state.auth.role);
  
  const passNo = (route.params) ? (route.params.passNo) : '';
  const division = (route.params) ? (route.params.divisionName) : '';
  
  const [searchText, setSearchText] = useState('');

  const [selectedDivision, setSelectedDivision] = useState('');
  const [loading, setLoading] = useState(false);  

  const filteredRecord = useSelector(state => state.reports.filteredRecord);
  const fetchInProgress = useSelector(state => state.reports.fetchInProgress);
 
  const allDivisions = useSelector(state => state.divisions.divisions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearFilteredReportAction());
  }, []);

  useEffect(() => {
    if(passNo){
      setSearchText(passNo);
      dispatch(fetchStatusReportAction(passNo, division));
    }
    if (
      searchText.length > 0 &&
      selectedDivision.length > 0 &&
      searchText.length >= 6
    ) {
        dispatch(fetchStatusReportAction(searchText, selectedDivision));  
    } else {
      dispatch(clearFilteredReportAction());
    }
  }, [searchText, selectedDivision]);

  return (
    <View style={styles.container}>
        
      {passNo ? null :
      <SafeAreaView>
        <View style={styles.searchBox}>
          <Picker
            style={{
              width: 150,
              backgroundColor: 'white',
            }}
            selectedValue={selectedDivision}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDivision(itemValue)
            }>
            <Picker.Item label="Select" value="" key={-1} />
            {allDivisions.map((item, key) => (
              <Picker.Item label={item.unit} value={item.unit} key={key} />
            ))}
          </Picker>
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              fontWeight: 'bold',
              backgroundColor: 'white',
            }}
            placeholder="Search - TRK/GP"
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
        </View>
      </SafeAreaView>
}
  <Loader loading={fetchInProgress} />  
  { fetchInProgress ? null
   : filteredRecord && filteredRecord.gatedetails ? (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <>
        <View style={styles.sectionContainer}>
            <View style={styles.cardTitle}>
              <Text style={styles.titleText}>Eway Bill Details</Text>
            </View>
            {filteredRecord.ewaybill.map((ewaybill, index) => {  
            return (
            <Card key={index} style={styles.card}>
              <View style={styles.row}>
              <View>
                  <Text>Eway Bill No</Text>
                  <Text style={styles.value}>
                    {ewaybill.eway_bill_no}
                  </Text>
                </View>
                <View>
                  <Text>Bill Date</Text>
                  <Text style={styles.value}>
                    {moment(ewaybill.eway_bill_date)
                      .format('DD/MM/YYYY')
                      .toString()}
                  </Text>
                </View>
                <View>
                  <Text>Bill Ty No</Text>
                  <Text style={styles.value}>
                  {ewaybill.bill_ty_no}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text>Place</Text>
                  <Text style={styles.value}>
                    {ewaybill.sup_place}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text>Distance</Text>
                  <Text style={styles.value}>
                    {ewaybill.distance}
                  </Text>
                </View>
              </View>
            </Card>
              );
            })}
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.cardTitle}>
              <Text style={styles.titleText}>Gate Details</Text>
            </View>
            {filteredRecord.gatedetails.map((gatedetails, index) => {  
            return (
            <Card key={index} style={styles.card}>
              <View style={styles.row}>
                <View>
                  <Text>Date</Text>
                  <Text style={styles.value}>
                    {moment(gatedetails.gate_pass_date)
                      .format('DD/MM/YYYY')
                      .toString()}
                  </Text>
                </View>
                <View>
                  <Text>Gate Pass No</Text>
                  <Text style={styles.value}>
                    {gatedetails.gate_pass_no}
                  </Text>
                </View>
                <View>
                  <Text>Truck No</Text>
                  <Text style={styles.value}>
                    {gatedetails.truck_no}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text>Party Name</Text>
                  <Text style={styles.value}>
                    {gatedetails.party_name}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text>Bill No & Bill Date </Text>
                  <Text style={styles.value}>{`${
                    gatedetails.bill_no
                  } ( ${moment(gatedetails.bill_date)
                    .format('DD/MM/YYYY')
                    .toString()} )`}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text>Item name</Text>
                  <Text style={styles.value}>
                    {gatedetails.itnm}
                  </Text>
                </View>
                <View>
                  <Text>Quantity</Text>
                  <Text style={styles.value}>
                    {gatedetails.gate_pass_qty}
                  </Text>
                </View>
              </View>
            </Card>
              );
            })}
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.cardTitle}>
              <Text style={styles.titleText}>Gross Tare</Text>
            </View>
            {filteredRecord.grosstare && (
            <Card style={styles.card}>
              <View style={styles.row}>
                <View>
                  <Text>Gate Pass No.</Text>
                  <Text style={styles.value}>
                    {filteredRecord.grosstare.gate_pass_no}
                  </Text>
                </View>
                <View>
                  <Text>Gross Weight</Text>
                  <Text style={styles.value}>
                    {filteredRecord.grosstare.gross_wt}
                  </Text>
                </View>
                <View>
                  <Text>Tare weight</Text>
                  <Text style={styles.value}>
                    {filteredRecord.grosstare.tare_wt}
                  </Text>
                </View>
              </View>
            </Card>
               )}
          </View>
           {/* PCR */}   
          {filteredRecord.pcr && filteredRecord.pcr.length > 0 && (
             (userRole != 'Vendor') ? (
            <View style={styles.sectionContainer}>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>PCR</Text>
              </View>
              {filteredRecord.pcr.map((pcr, index) => {
                return (
                  <Card key={index} style={styles.card}>
                    <View style={styles.row}>
                      <View>
                        <Text>Pcr No</Text>
                        <Text style={styles.value}>{pcr.id}</Text>
                      </View>
                      <View>
                        <Text>Po No.</Text>
                        <Text style={styles.value}>
                          {pcr.purchase_order_no}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View>
                        <Text>Qty</Text>
                        <Text style={styles.value}>{pcr.qty}</Text>
                      </View>
                      <View>
                        <Text>Rate</Text>
                        <Text style={styles.value}>{pcr.rate}</Text>
                      </View>
                      <View>
                        <Text>Value</Text>
                        <Text style={styles.value}>{pcr.val}</Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
            ) : null 
          )}
         {/* Purchase Order */}   
          {filteredRecord.purchaseorder && filteredRecord.purchaseorder.length > 0 && (
            (userRole != 'Vendor') ? (
            <View style={styles.sectionContainer}>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>Purchse Order</Text>
              </View>
              {filteredRecord.purchaseorder.map((purchaseOrder, index) => {
                return (
                  <Card key={index} style={styles.card}>
                    <View style={styles.row}>
                      <View>
                        <Text>Order no.</Text>
                        <Text style={styles.value}>
                          {purchaseOrder.order_no}
                        </Text>
                      </View>
                      <View>
                        <Text>Category</Text>
                        <Text style={styles.value}>
                          {purchaseOrder.category_name}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.row}>
                      <View>
                        <Text>Rate</Text>
                        <Text style={styles.value}>
                          {purchaseOrder.rate}
                        </Text>
                      </View>
                      <View>
                        <Text>Qty</Text>
                        <Text style={styles.value}>
                          {purchaseOrder.qty}
                        </Text>
                      </View>
                      <View>
                        <Text>Recv.Qty</Text>
                        <Text style={styles.value}>
                          {purchaseOrder.rec_qty}
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
             ) : null 
          )}
          {/* Scrap Quality */}
          {filteredRecord.scrapquality && filteredRecord.scrapquality.length > 0 && (
            <View style={styles.sectionContainer}>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>Scrap Quality</Text>
              </View>
              {filteredRecord.scrapquality.map((scrapQuality, index) => {
                return (
                  <Card key={index} style={styles.card}>
                    <View style={styles.row}>
                      <View>
                        <Text>Scrap ID</Text>
                        <Text style={styles.value}>
                          {scrapQuality.divisionId}
                        </Text>
                      </View>
                      <View>
                        <Text>Weight</Text>
                        <Text style={styles.value}>
                          {scrapQuality.weight}
                        </Text>
                      </View>
                      <View>
                        <Text>Percent</Text>
                        <Text style={styles.value}>{scrapQuality.per}</Text>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View>
                        <Text>Category Name</Text>
                        <Text style={styles.value}>
                          {scrapQuality.category_name}
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          )}
          {/* Debit Note */}
          {filteredRecord.debitnote && filteredRecord.debitnote.length > 0 && (
            <View style={styles.sectionContainer}>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>Debit Notes</Text>
              </View>
              {filteredRecord.debitnote.map((debitnote, index) => {
                return (
                  <Card key={index} style={styles.card}>
                    <View style={styles.row}>
                      <View>
                        <Text>Debit Note No.</Text>
                        <Text style={styles.value}>{debitnote.id}</Text>
                      </View>
                      <View>
                        <Text>Category Name</Text>
                        <Text style={styles.value}>
                          {debitnote.catg_name}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View>
                        <Text>Qty</Text>
                        <Text style={styles.value}>{debitnote.qty}</Text>
                      </View>
                      <View>
                        <Text>Rate</Text>
                        <Text style={styles.value}>{debitnote.rate}</Text>
                      </View>
                      <View>
                        <Text>Value</Text>
                        <Text style={styles.value}>{debitnote.val}</Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          )}
        </>
      </ScrollView>
    </SafeAreaView>
  ) : (   
    <NoRecordFound></NoRecordFound>
  )}
    </View>
  );
};

export default StatusReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 5,
  },
  searchBox: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 2,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  searchIconStyle: {
    marginTop: 5,
  },
  scrollView: {
    marginBottom: 100,
    marginHorizontal: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    padding: 5,
    margin: 5,
  },
  row: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContainer: {backgroundColor: 'red', borderRadius: 10, marginTop: 5},
  cardTitle: {marginLeft: 10, height: 25},
  titleText: {fontWeight: 'bold', fontSize: 20, color: Colors.white},
  value: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
