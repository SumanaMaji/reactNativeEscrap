import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Modal,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Loader/Loader';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageList from './ImageList';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

import {
  createTransactionAction,
  fetchTranactionToBeProccessed,
} from '../../redux/actions/transaction-action';

const Transaction = props => {
  const navigation = useNavigation();

  // useStates
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubType, setSelectedSubType] = useState('');
  const [selectedTypeByDivision, setSelectedTypeByDivision] = useState([]);
  const [selectedSubTypeByType, setSelectedSubTypeByType] = useState([]);
  const [gatePassDate, setGatePassDate] = useState(new Date());
  const [showGatePassDatePicker, setShowGatePassDatePicker] = useState(false);
  const [isGatePassDateAssigned, setGatePassDateAssigned] = useState(true);
  const [gatePassNumber, setGatePassNumber] = useState('');
  const [setlectedGatePassId, setSetlectedGatePassId] = useState('');
  const [partyName, setPartyName] = useState('');
  const [partyCode, setPartyCode] = useState('N/A');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [remarks, setRemarks] = useState('');
  const [photo, setPhoto] = useState([]);
  const [driverPhoto, setDriverPhoto] = useState([]);
  const [driverLicense, setDriverLicense] = useState([]);
  const [vehicleRC, setVehicleRC] = useState([]);
  const [challan, setChallan] = useState([]);
  const [hasGateDetails, setGateDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  // useSelectors
  const allDivisions = useSelector(state => state.divisions.divisions);
  const allTypes = useSelector(state => state.types.types);
  const allSubTypes = useSelector(state => state.subtypes.subtypes);
  const toBeProccessed = useSelector(
    state => state.transactions.toBeProccessed,
  );

  // refs
  const partyNameInputRef = createRef();
  const referenceNumberInputref = createRef();
  const remarkInputRef = createRef();
  // dispatch
  const dispatch = useDispatch();
  // useEffeect
  useEffect(() => {
    if (selectedDivision && gatePassDate) {
      const division = allDivisions.find(d => d._id === selectedDivision);
      if (division) {
        dispatch(
          fetchTranactionToBeProccessed(
            division.unit,
            Moment(gatePassDate).format('YYYY-MM-DD'),
          ),
        );
      }
    }
  }, [selectedDivision, gatePassDate]);

  const resetScreen = () => {
    setSetlectedGatePassId('');
    setGatePassNumber('');
    setPartyName('');
    setVehicleNumber('');
    setRemarks('');
    setPhoto([]);
    setLoading('');
    setErrortext('');
    setDriverPhoto([]);
    setDriverLicense([]);
    setVehicleRC([]);
    setChallan([]);
  };

  const handleDivisionChange = divId => {
    setSelectedDivision(divId);
    const types = getTypes(divId);

    setSelectedTypeByDivision(types.length === 0 ? [] : types);
    setSelectedSubTypeByType([]);
  };

  const handleTypeChange = typeId => {
    setSelectedType(typeId);
    const subtypes = getSubTypes(typeId);
    setSelectedSubTypeByType(subtypes.length === 0 ? [] : subtypes)
  };

  const handleGatePassDateChange = (event, selectedDate) => {
    setShowGatePassDatePicker(false);
    const currentDate = selectedDate || gatePassDate;
    setGatePassDate(currentDate);
    setGatePassDateAssigned(true);
  };

  const handleGatePassChange = gatepassId => {
    const gatePass = toBeProccessed.find(x => x._id === gatepassId);
    if (gatePass) {
      setSetlectedGatePassId(gatePass._id);
      setGatePassNumber(gatePass.gate_pass_no);
      setPartyName(gatePass.party_name ? gatePass.party_name : 'N/A');
      setVehicleNumber(gatePass.truck_no);
      setPartyCode(gatePass.party_code);
      setGateDetails(true);
    }
  };

  const getTypes = divisionId =>
    allTypes.filter(type => type.division === divisionId);

  const getSubTypes = typeId =>
    allSubTypes.filter(subtype => subtype.type === typeId);

  const addPhotos = image => {
    if (photo.length) {
      let lastImage = photo.reduce((prev, current) => {
        return prev.Id > current.Id ? prev : current;
      });
      image.Id = lastImage.Id + 1;
    } else {
      image.Id = 1;
    }
    image.DateTime = Date.now();
    setPhoto([...photo, image]);
  };
  const addPhoto = image => {
      setDriverPhoto([image]);
  };
  const addLicense = image => {
    setDriverLicense([image]);
  };
  const addRC = image => {
    setVehicleRC([image]);
  };
  const addChallan = image => {
    setChallan([image]);
  };
  const removeImage = id => {
    let images = photo.filter(img => {
      return img.Id != id;
    });

    setPhoto(images);
  };

  const selectMultipleFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          mediaType: 'image',
          includeBase64: true,
          compressImageQuality: 0.5,
        })
          .then(image => {
            addPhotos({
              base64: image.data,
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: image.mime,
            });
          })
          .catch(e => alert(e));
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const selectPhotoFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          mediaType: 'image',
          includeBase64: true,
          compressImageQuality: 0.3,
          cropping: true,
        })
          .then(image => {
                 ImageResizer.createResizedImage(image.path, Math.floor(image.width/2), Math.floor(image.height/2), 'JPEG', 80, 0)
            .then(response => {
            RNFS.readFile(response.path, 'base64')
              .then(res =>{
              addPhoto({
                base64: res,
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: 'image/jpeg',
              });
          })
            })
            .catch(err => {
              console.log("error"+err);
            });
          })
          .catch(e => alert(e));
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const selectLicenseFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          mediaType: 'image',
          includeBase64: true,
          compressImageQuality: 0.3,
          cropping: true,
        })
        .then(image => {
               ImageResizer.createResizedImage(image.path, Math.floor(image.width/2), Math.floor(image.height/2), 'JPEG', 80, 0)
          .then(response => {
          RNFS.readFile(response.path, 'base64')
            .then(res =>{
            addLicense({
              base64: res,
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: 'image/jpeg',
            });
        })
          })
          .catch(err => {
            console.log("error"+err);
          });
        })
          .catch(e => alert(e));
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const selectVechicleRCFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          mediaType: 'image',
          includeBase64: true,
          compressImageQuality: 0.3,
          cropping: true,
        })
        .then(image => {
               ImageResizer.createResizedImage(image.path, Math.floor(image.width/2), Math.floor(image.height/2), 'JPEG', 80, 0)
          .then(response => {
          RNFS.readFile(response.path, 'base64')
            .then(res =>{
            addRC({
              base64: res,
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: 'image/jpeg',
            });
        })
          })
          .catch(err => {
            console.log("error"+err);
          });
        })
          .catch(e => alert(e));
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const selectChallanFile = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          mediaType: 'image',
          includeBase64: true,
          compressImageQuality: 0.3,
          cropping: true,
        })
        .then(image => {
               ImageResizer.createResizedImage(image.path, Math.floor(image.width/2), Math.floor(image.height/2), 'JPEG', 80, 0)
          .then(response => {
          RNFS.readFile(response.path, 'base64')
            .then(res =>{
            addChallan({
              base64: res,
              uri: image.path,
              width: image.width,
              height: image.height,
              mime: 'image/jpeg',
            });
        })
          })
          .catch(err => {
            console.log("error"+err);
          });
        })
          .catch(e => alert(e));
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const closeForm = () => {
    resetScreen();
    props.GateModeHandler(0);
  };

  const handleSubmitButton = async () => {
    var gateOpt = props.GateMode;

    setErrortext('');
    if (selectedDivision.length == 0) {
      alert('Please select Division');
      return;
    }
    if (selectedType.length == 0) {
      alert('Please select Type');
      return;
    }
    if (selectedSubType.length == 0) {
      alert('Please select Sub Type');
      return;
    }
    if (!gatePassDate) {
      alert('Please fill ERP Reference Date');
      return;
    }

    if (!gatePassNumber) {
      alert('Please fill ERP Reference Number');
      return;
    }
    if (!vehicleNumber) {
      alert('Please fill Vehicle Number');
      return;
    }
    if (!partyName) {
      alert('Please fill Party Name');
      return;
    }
    if (driverPhoto == '') {
      alert('Please choose Driver Photo');
      return;
    }
    if (driverLicense == '') {
      alert('Please choose Driver License');
      return;
    }
    //Show Loader
    setLoading(true);

    let images = [];
    photo.forEach(fh => {
      images.push({
        base64: fh.base64,
        DateTime: fh.DateTime,
      });
    });

    let dataToSend = {
      division: selectedDivision,
      type: selectedType,
      subType: selectedSubType,
      vehicleNo: vehicleNumber,
      gateInOut: gateOpt,
      partyName: partyName,
      partyCode: partyCode,
      gatePassNumber: gatePassNumber,
      gatePassDate: Moment(gatePassDate).toISOString(),
      remark: remarks,
      images: images,
      photo: driverPhoto,
      licence: driverLicense,
      rc: vehicleRC,
      challan: challan,
    };
   
    try {
      await dispatch(createTransactionAction(dataToSend));
      setLoading(false);

      alert('Transaction Created successfully.');
      closeForm();
      navigation.navigate('TransactionEntryScreen');
    } catch (e) {
      setLoading(false);
      throw new Error(`Failed to create transaction ${e.message}`);
    }
  };

  const saveDataToStorage = (division, type, subtype, gatepassdate) => {
    AsyncStorage.setItem(
      StorageKey.UserData,
      JSON.stringify({
        division: division,
        type: type,
        subtype: subtype,
        gatepassdate: gatepassdate,
      }),
    );
  };
  
  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.GateMode > 0}>
        <Loader loading={loading} />
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <TouchableOpacity
                    style={styles.backbtn}
                    activeOpacity={0.5}
                    onPress={closeForm}>
                      <FontAwesome
                      name="arrow-left"
                      size={30}
                      color="white"
                      style={styles.plusIcon}
                    />
                  </TouchableOpacity>
                <View style={styles.input1}>
                  <Picker
                    dropdownIconColor="red"
                    dropdownIconRippleColor="purple"
                    selectedValue={selectedDivision}
                    onValueChange={(itemValue, itemIndex) =>
                      handleDivisionChange(itemValue)
                    }
                    mode="dropdown">
                    <Picker.Item label="Select Division" value="" />
                    {allDivisions && allDivisions.length > 0
                      ? allDivisions.map((item, index) => (
                          <Picker.Item
                            key={'division' + index}
                            label={`${item.division}(${item.unit})`}
                            value={item._id}
                          />
                        ))
                      : null}
                  </Picker>
                </View>
                <View style={styles.input}>
                  <Picker
                    dropdownIconColor="red"
                    dropdownIconRippleColor="purple"
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) =>
                      handleTypeChange(itemValue)
                    }
                    mode="dropdown">
                    <Picker.Item label="Select Type" value="" />
                    {selectedTypeByDivision.length > 0
                      ? selectedTypeByDivision.map((item, index) => (
                          <Picker.Item
                            key={'type' + index}
                            label={item.typeName}
                            value={item._id}
                          />
                        ))
                      : null}
                  </Picker>
                </View>
                <View style={styles.input}>
                  <Picker
                    dropdownIconColor="red"
                    dropdownIconRippleColor="purple"
                    selectedValue={selectedSubType}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedSubType(itemValue)
                    }
                    mode="dropdown">
                    <Picker.Item label="Select Sub Type" value="" />
                    {selectedSubTypeByType.length > 0
                      ? selectedSubTypeByType.map((item, index) => (
                          <Picker.Item
                            key={'subType' + index}
                            label={item.subTypeName}
                            value={item._id}
                          />
                        ))
                      : null}
                  </Picker>
                </View>

                {/* gate pass date */}
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setShowGatePassDatePicker(true);
                  }}>
                  <Text style={styles.dateText}>
                    {isGatePassDateAssigned
                      ? Moment(gatePassDate).format('DD-MMM-YYYY')
                      : 'Please select gate pass date.'}
                  </Text>
                </TouchableOpacity>
                {showGatePassDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={gatePassDate}
                    mode="date"
                    is24Hour={true}
                    display="calendar"
                    onChange={handleGatePassDateChange}
                    maximumDate={new Date()}
                  />
                )}

                {/* gate pass number */}
                {toBeProccessed && toBeProccessed.length > 0 ? (
                  <View style={styles.input}>
                    <Picker
                      dropdownIconColor="red"
                      dropdownIconRippleColor="purple"
                      selectedValue={setlectedGatePassId}
                      onValueChange={(itemValue, itemIndex) =>
                        handleGatePassChange(itemValue)
                      }>
                      <Picker.Item label="Select" value="" key={-1} />
                      {toBeProccessed
                        .sort(
                          (a, b) =>
                            parseInt(a.gate_pass_no) - parseInt(b.gate_pass_no),
                        )
                        .map((item, key) => (
                          <Picker.Item
                            label={`${item.gate_pass_no} (${item.truck_no} -${
                              item.party_name ? item.party_name : 'N/A'
                            })`}
                            value={item._id}
                            key={key}
                          />
                        ))}
                    </Picker>
                  </View>
                ) : (
                  <TextInput
                    style={styles.input}
                    onChangeText={text => setGatePassNumber(text)}
                    underlineColorAndroid="#f000"
                    placeholder="Gate Pass Number"
                    placeholderTextColor="black"
                    autoCapitalize="sentences"
                    keyboardType="default"
                    ref={referenceNumberInputref}
                    returnKeyType="next"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    value={gatePassNumber}
                    underlineColorAndroid="transparent"
                  />
                )}
                {/* party name */}
                <TextInput
                  style={styles.input}
                  onChangeText={text => setPartyName(text)}
                  underlineColorAndroid="#f000"
                  placeholder="Party Name"
                  placeholderTextColor="black"
                  keyboardType="default"
                  ref={partyNameInputRef}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={partyName}
                  editable={!hasGateDetails}
                />
                {/* vechile number */}
                <TextInput
                  style={styles.input}
                  onChangeText={text => setVehicleNumber(text)}
                  underlineColorAndroid="#f000"
                  placeholder="Vehicle Number"
                  placeholderTextColor="black"
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    partyNameInputRef.current &&
                    partyNameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                  value={vehicleNumber}
                  editable={!hasGateDetails}
                />
                {/* remarks */}
                <TextInput
                  style={styles.input}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={Remarks => setRemarks(Remarks)}
                  underlineColorAndroid="#f000"
                  placeholder="Remark"
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  ref={remarkInputRef}
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  value={remarks}
                />
                {/* driver photo */}
                <View style={styles.inputLabel}>
                <Text style={styles.label}>Driver Photo </Text>
                <View style={styles.imagessmall}>
                  <ImageList driverPhoto={driverPhoto}/>
                </View>
               
                <TouchableOpacity
                    onPress={() => selectPhotoFile()}
                   // onChange={() => onChange()}
                    style={styles.capturebtnNew}
                    disabled={photo.length >= 12}>
                    <FontAwesome
                      name="camera"
                      size={30}
                      color="white"
                      style={styles.plusIcon}
                    />
                  </TouchableOpacity>   
                </View>
                {/* driver license */}
                <View style={styles.inputLabel}>
                <Text style={styles.label}>Driver License</Text>
                <View style={styles.imagessmall}>
                  <ImageList driverLicense={driverLicense}/>
                </View>
                <TouchableOpacity
                    onPress={() => selectLicenseFile()}
                    style={styles.capturebtnNew}
                    disabled={photo.length >= 12}>
                    <FontAwesome
                      name="camera"
                      size={30}
                      color="white"
                      style={styles.plusIcon}
                    />
                  </TouchableOpacity>
                </View>
                {/* vehicle RC */}
                <View style={styles.inputLabel}>
                <Text style={styles.label}>Vehicle RC</Text>
                <View style={styles.imagessmall}>
                  <ImageList vehicleRC={vehicleRC}/>
                </View>
                <TouchableOpacity
                    onPress={() => selectVechicleRCFile()}
                    style={styles.capturebtnNew}
                    disabled={photo.length >= 12}>
                    <FontAwesome
                      name="camera"
                      size={30}
                      color="white"
                      style={styles.plusIcon}
                    />
                  </TouchableOpacity>
                </View>
                {/* challan */}
                <View style={styles.inputLabel}>
                <Text style={styles.label}>Challan</Text>
                <View style={styles.imagessmall}>
                  <ImageList challan={challan}/>
                </View>
                <TouchableOpacity
                    onPress={() => selectChallanFile()}
                    style={styles.capturebtnNew}
                    //onChange={this.handleChangeImage}
                    disabled={photo.length >= 12}>
                    <FontAwesome
                      name="camera"
                      size={30}
                      color="white"
                      style={styles.plusIcon} 
                    />  
                  </TouchableOpacity>
                </View>
                <ImageList removeImageHandler={removeImage} images={photo}/>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.submitbtn}
                    activeOpacity={0.5}
                    onPress={handleSubmitButton}>
                    <Text style={styles.btnText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => selectMultipleFile()}
                    style={styles.capturebtn}
                    disabled={photo.length >= 12}>
                    <FontAwesome
                      name="camera"
                      size={30}
                      color="white"
                      style={styles.plusIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.canceltbtn}
                    onPress={() => closeForm()}>
                    <Text style={styles.btnText}> Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 10,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 1,
    elevation: 1,
  },
  input1: {
    // width: 350,
    width: 335,
    height: 55,
    margin: 5,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
  },
  input: {
    width: 335,
    height: 55,
    margin: 8,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 17,
    paddingTop: 7,
    fontWeight: 'bold',
  },
  btngrp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  capturebtn: {
    height: 55,
    width: '20%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 15,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  btnTextBack: {
    color: 'white',
    fontSize: 16,
  },
  imagessmall:{
  position: 'absolute',
  top:      7,
  right:'19%',
},
  btnContainer: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitbtn: {
    height: 55,
    width: 120,
    backgroundColor: '#0cb318',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  backbtn: {
    flex: 1,
    alignSelf: "flex-start",
    marginTop: 10,
    height: 50,
    width: 60,
    backgroundColor: '#0096FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  canceltbtn: {
    height: 55,
    width: 120,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 15,
  },
  inputLabel: {
    width: 335,
    height: 55,
    margin: 8,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: 'black',
    fontSize: 18,
  },
  capturebtnNew: {
    height: 45,
    width: '15%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginLeft: 'auto',
    marginTop : -4,
  },
  cardimageLarge:{
    backgroundColor: '#ccc',
    height: 50,
    width: 50,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
});

export default Transaction;
