import React, {useState} from 'react';
import MemoizedTypeList from './type-list';
import MemoizedAddTypeScreen from './add-type';
import EditType from './edit-type';
import FloatingActionButton from '../../../Components/FloatingActionButton';
import CustomModal from '../../../Components/Modal';
//
const TypeListScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  //
  const handleAddType = () => {
    setModalVisible(true);
    setIsInEditMode(false);
  };
  //
  const handleHideModal = () => {
    setModalVisible(false);
  };
  //
  const handleEditType = type => {
    setSelectedType(type);
    setIsInEditMode(true);
    setModalVisible(true);
  };

  return (
    <>
      <MemoizedTypeList {...props} handleEditType={handleEditType} />
      {!modalVisible && (
        <FloatingActionButton click={handleAddType}></FloatingActionButton>
      )}

      {modalVisible && (
        <CustomModal
          title={isInEditMode ? 'Edit Type' : 'Add Type'}
          visible={modalVisible}
          hide={handleHideModal}>
          {isInEditMode ? (
            <EditType type={selectedType} hide={handleHideModal} />
          ) : (
            <MemoizedAddTypeScreen hide={handleHideModal} />
          )}
        </CustomModal>
      )}
    </>
  );
};

export default MemoizedTypeListScreen = React.memo(TypeListScreen);
