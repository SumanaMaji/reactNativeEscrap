import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from 'react-native-dialog';
import MemoizedSubTypeItem from './subtype-item';
import {
  deleteSubTypeAction,
  clearSubTypeMessageAction,
} from '../../../redux/actions/subtype-action';
//
const SubTypeList = props => {
  // useState
  const [showActionAlert, setShowActionAlert] = useState(false);
  const [subtypeToDelete, setSubTypeToDelete] = useState(null);
  // useSelector
  const allSubTypes = useSelector(state => state.subtypes.subtypes);
  const subtypeActionMessage = useSelector(
    state => state.subtypes.subtypeActionMessage,
  );
  // redux
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    if (subtypeActionMessage.length > 0) {
      dispatch(clearSubTypeMessageAction());
      Alert.alert('Type', subtypeActionMessage);
    }
  }, [subtypeActionMessage]);

  const handleSubTypeDelete = subtypeToDelete => {
    setSubTypeToDelete(subtypeToDelete);
    setShowActionAlert(true);
  };

  const handleDialogOk = () => {
    setShowActionAlert(false);
    dispatch(deleteSubTypeAction(subtypeToDelete._id));
  };
  const handleDialogCancel = () => {
    setShowActionAlert(false);
  };
  return (
    <>
      <Dialog.Container visible={showActionAlert}>
        <Dialog.Title>Type</Dialog.Title>
        <Dialog.Description>
          {subtypeToDelete
            ? 'Are you sure to delete this type ?'
            : subtypeActionMessage}
        </Dialog.Description>
        {subtypeToDelete && (
          <Dialog.Button label="Cancel" onPress={handleDialogCancel} />
        )}
        <Dialog.Button label="OK" onPress={handleDialogOk} />
      </Dialog.Container>
      <ScrollView style={{marginTop: 15}}>
        <SafeAreaView style={styles.container}>
          {allSubTypes.map(subtype => (
            <MemoizedSubTypeItem
              {...props}
              subtypeItem={subtype}
              key={subtype._id}
              handleSubTypeDelete={handleSubTypeDelete}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default MemoizedSubTypeList = React.memo(SubTypeList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
  },
});
