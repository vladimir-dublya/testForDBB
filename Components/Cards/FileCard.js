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
  SafeAreaView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import * as FilesActions from '../../feautures/filesSlice';

export const FileCard = ({ file }) => {
  const { loadingInfo, info, path, token, error } = useSelector(
    (state) => state.files,
  );
  const [date, setDate] = React.useState();
  const dispatch = useDispatch();
  const [move, setMove] = React.useState(false);
  const [moveTo, setMoveTo] = React.useState('');
  const handleOpen = () => {
    if (file['.tag'] === 'folder') {
      dispatch(FilesActions.movePathForward(file.name));

      dispatch(FilesActions.initFiles());
    }
  };

  const [isContextMenuVisible, setContextMenuVisible] = React.useState(false);

  const showContextMenu = () => {
    setContextMenuVisible(true);
    if (file['.tag'] === 'file') {
      dispatch(FilesActions.getInfo(file));
      console.log('infoDate:', info.data.client_modified);
      const date = new Date(info.data.client_modified);
      setDate(date.toLocaleString('en-GB', { timeZone: 'UTC' }));
    }
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };

  const handleMenuItemPress = () => {
    dispatch(FilesActions.deleteFile(file));
  };

  const handleOpenMove = () => {
    setMove(!move);
  };

  const handleSubmitMove = () => {
    dispatch(FilesActions.getMove({ fileName: file.name, toPath: moveTo }));
  };

  return (
    <>
      <View style={styles.card}>
        <Ionicons
          name={
            file['.tag'] === 'file'
              ? 'ios-document-outline'
              : 'ios-folder-open-outline'
          }
          size={50}
          color='#7fa5e3'
          onPress={() => handleOpen()}
        />
        <Text>{file.name}</Text>
        <Ionicons
          name='ellipsis-horizontal-outline'
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
              <SafeAreaView style={styles.input_container}>
                <Text onPress={handleOpenMove}>Move File</Text>
                {move && (
                  <>
                    <TextInput
                      placeholder='To'
                      onChangeText={setMoveTo}
                      value={moveTo}
                      style={styles.input}
                    />
                    <Button title='Submit Move' onPress={handleSubmitMove} />
                  </>
                )}
              </SafeAreaView>
              {file['.tag'] === 'file' && (
                <View style={styles.info}>
                  <Text style={styles.info_text}>Last Modified: </Text>
                  <Text style={styles.info_text}>{date}</Text>
                  <Text style={styles.info_text}>
                    Size: {info.data.size} Kb
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: 10,
  },
  info_text: {
    color: 'grey',
    fontSize: 12,
  },
  input_container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    gap: 3,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    height: 35,
    padding: 10,
    borderColor: 'black',
  },
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
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  menuItem: {
    padding: 10,
    width: 200,
  },
});
