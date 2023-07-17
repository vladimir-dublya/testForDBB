import * as React from 'react';
import { View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function HomeScreen({ navigation }) {
  const docPicker = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      console.log('Selected file:', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picker cancelled');
      } else {
        console.log('Error:', err);
      }
    }
  };

  return (
    <View
      style={{
        width: '30%',
        justifyContent: 'center',
      }}
    >
      <Button title='Select File' onPress={docPicker} />
    </View>
  );
}
