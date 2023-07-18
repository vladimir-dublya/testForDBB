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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={style.path}>{path}</Text>
          <View style={style.containerCards}>
            {entries.map((entity) => (
              <FileCard file={entity} />
            ))}
          </View>
          <Ionicons
            name='home-outline'
            style={style.iconHome}
            size={55}
            onPress={handleBack}
          />
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

  path: {
    height: 20,
    fontSize: 10,
    width: '100%',
  },
  iconHome: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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
