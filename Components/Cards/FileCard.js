import React from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import * as FilesActions from '../../feautures/filesSlice';
export const FileCard = ({ file }) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOpen = () => {
    file['.tag'] === 'folder' &&
      dispatch(FilesActions.initFiles(token, file.name));
  };

  return (
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
      <Ionicons name='ios-options-outline' size={25} />
    </View>
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
