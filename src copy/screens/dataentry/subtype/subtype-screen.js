import React, {useState} from 'react';
import MemoizedSubTypeList from './subtype-list';
import MemoizedAddSubTypeScreen from './add-subtype';
import EditSubTypeScreen from './edit-subtype';
import FloatingActionButton from '../../../Components/FloatingActionButton';
import CustomModal from '../../../Components/Modal';
//
const SubTypeListScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [selectedSubType, setSelectedSubType] = useState(null);
  //
  const handleAddSubType = () => {
    setModalVisible(true);
    setIsInEditMode(false);
  };
  //
  const handleHideModal = () => {
    setModalVisible(false);
  };
  //
  const handleEditSubType = subtype => {
    setSelectedSubType(subtype);
    setIsInEditMode(true);
    setModalVisible(true);
  };

  return (
    <>
      <MemoizedSubTypeList {...props} handleEditSubType={handleEditSubType} />
      {!modalVisible && (
        <FloatingActionButton click={handleAddSubType}></FloatingActionButton>
      )}

      {modalVisible && (
        <CustomModal
          title={isInEditMode ? 'Edit Sub Type' : 'Add Sub Type'}
          visible={modalVisible}
          hide={handleHideModal}>
          {isInEditMode ? (
            <EditSubTypeScreen subtype={selectedSubType} hide={handleHideModal} />
          ) : (
            <MemoizedAddSubTypeScreen hide={handleHideModal} />
          )}
        </CustomModal>
      )}
    </>
  );
};

export default MemoizedSubTypeListScreen = React.memo(SubTypeListScreen);
