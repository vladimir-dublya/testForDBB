// 4fs99nyku6i8p94
// testForDBB

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from 'expo-auth-session';
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  AsyncStorage,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as FilesActions from '../../feautures/filesSlice';
import { FileCard } from '../../Components/Cards/FileCard.js';
import * as DocumentPicker from 'expo-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.dropbox.com/oauth2/authorize',
  tokenEndpoint: 'https://www.dropbox.com/oauth2/token',
};

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { entries, loading, path, token, loadingInfo } = useSelector(
    (state) => state.files,
  );
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '4fs99nyku6i8p94',
      // There are no scopes so just pass an empty array
      scopes: [],
      // Dropbox doesn't support PKCE
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'testForDBB',
        useProxy,
      }),
    },
    discovery,
  );

  const docPicker = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();

      const formData = new FormData();
      formData.append('file', res);
      dispatch(FilesActions.uploadFile({ token, formData }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picker cancelled');
      } else {
        console.log('Error:', err);
      }
    }
  };

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      dispatch(FilesActions.assignUser(access_token));
    }
  }, [response]);

  React.useEffect(() => {
    dispatch(FilesActions.initFiles());
  }, [token]);

  const handleBack = () => {
    dispatch(FilesActions.moveHome());
    dispatch(FilesActions.initFiles());
  };

  return token ? (
    <>
      {loading && loadingInfo ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={style.containerCards}>
            {entries.map((entity) => (
              <FileCard file={entity} />
            ))}
          </View>
          <Ionicons name='home-outline' size={55} onPress={handleBack} />
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
            }}
          >
            <Button title='Select File' onPress={docPicker} />
          </View>
        </>
      )}
    </>
  ) : (
    <View style={style.containerLogin}>
      <Button
        disabled={!request}
        title='Login'
        onPress={() => {
          promptAsync({ useProxy });
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  containerCards: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  containerLogin: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
