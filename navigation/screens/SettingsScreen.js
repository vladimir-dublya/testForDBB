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
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { assignUser } from '../../feautures/userSlice';
import * as FilesActions from '../../feautures/filesSlice';
import { FileCard } from '../../Components/Cards/FileCard.js';

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.dropbox.com/oauth2/authorize',
  tokenEndpoint: 'https://www.dropbox.com/oauth2/token',
};

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { entries, loading } = useSelector((state) => state.files);
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
      dispatch(assignUser(access_token));
    }
  }, [response]);

  React.useEffect(() => {
    if (token) {
      dispatch(FilesActions.initFiles(token));
    }
  }, [token]);

  return token ? (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={style.containerCards}>
          {entries.map((entity) => (
            <FileCard file={entity} />
          ))}
        </View>
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
