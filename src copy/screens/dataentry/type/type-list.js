import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from 'react-native-dialog';
import MemoizedTypeItem from './type-item';
import {
  deleteTypeAction,
  clearTypeMessageAction,
} from '../../../redux/actions/type-action';
//
const TypeList = props => {
  // useState
  const [showActionAlert, setShowActionAlert] = useState(false);
  const [typeToDelete, setTypeToDelete] = useState(null);
  // useSelector
  const allTypes = useSelector(state => state.types.types);


  const typeActionMessage = useSelector(state => state.types.typeActionMessage);
  // redux
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    if (typeActionMessage.length > 0) {
      dispatch(clearTypeMessageAction());
      Alert.alert('Type', typeActionMessage);
    }
  }, [typeActionMessage]);

  const handleTypeDelete = typeToDelete => {
    setTypeToDelete(typeToDelete);
    setShowActionAlert(true);
  };

  const handleDialogOk = () => {
    setShowActionAlert(false);
    dispatch(deleteTypeAction(typeToDelete._id));
  };
  const handleDialogCancel = () => {
    setShowActionAlert(false);
  };
  return (
    <>
      <Dialog.Container visible={showActionAlert}>
        <Dialog.Title>Type</Dialog.Title>
        <Dialog.Description>
          {typeToDelete
            ? 'Are you sure to delete this type ?'
            : typeActionMessage}
        </Dialog.Description>
        {typeToDelete && (
          <Dialog.Button label="Cancel" onPress={handleDialogCancel} />
        )}
        <Dialog.Button label="OK" onPress={handleDialogOk} />
      </Dialog.Container>
      <ScrollView style={{marginTop: 15}}>
        <SafeAreaView style={styles.container}>
          {allTypes.map(type => (
            <MemoizedTypeItem
              {...props}
              typeItem={type}
              key={type._id}
              handleTypeDelete={handleTypeDelete}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default MemoizedTypeList = React.memo(TypeList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
  },
});
