import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import * as FilesActions from '../../feautures/filesSlice';

export const FileCard = ({ file }) => {
  const { token } = useSelector((state) => state.user);
  const { loadingInfo, info } = useSelector((state) => state.files);
  const [date, setDate] = React.useState();
  const dispatch = useDispatch();
  const handleOpen = () => {
    file['.tag'] === 'folder' &&
      dispatch(FilesActions.initFiles(token, file.name));
  };

  const [isContextMenuVisible, setContextMenuVisible] = React.useState(false);

  const showContextMenu = () => {
    setContextMenuVisible(true);
    dispatch(FilesActions.getInfo({ token, file }));
    const date = new Date(info.data.client_modified);
    setDate(date.toLocaleString('en-GB', { timeZone: 'UTC' }));
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleMenuItemPress = () => {
    dispatch(FilesActions.deleteFile({ token, file }));
  };

  return (
    <>
      <View style={style.card}>
        <Ionicons
          name={
            file['.tag'] === 'file'
              ? 'ios-document-outline'
              : 'ios-folder-open-outline'
          }
          size={50}
          color='#7fa5e3'
        />
        <Text>{file.name}</Text>
        <Ionicons
          name='ios-options-outline'
          size={25}
          onPress={showContextMenu}
        />
      </View>

      <Modal
        visible={isContextMenuVisible}
        transparent={true}
        onRequestClose={hideContextMenu}
      >
        {loadingInfo ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableWithoutFeedback onPress={hideContextMenu}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            <View style={styles.menu}>
              <Text style={styles.menuItem} onPress={handleMenuItemPress}>
                Delete File
              </Text>
              {file['.tag'] === 'file' && (
                <>
                  <Text style={styles.menuItem}>Last Modified: </Text>
                  <Text style={styles.menuItem}>{date}</Text>
                  <Text style={styles.menuItem}>Size: </Text>
                  <Text style={styles.menuItem}>{info.data.size}Mb</Text>
                </>
              )}
            </View>
          </>
        )}
      </Modal>
    </>
  );
};

const style = StyleSheet.create({
  card: {
    flex: 1,
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  menuItem: {
    padding: 10,
    width: 130,
  },
});
