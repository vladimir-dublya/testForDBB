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
import { Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { assignUser } from '../../feautures/userSlice';

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });
// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.dropbox.com/oauth2/authorize',
  tokenEndpoint: 'https://www.dropbox.com/oauth2/token',
};

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
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

  return (
    <>
      <Button
        disabled={!request}
        title='Login'
        onPress={() => {
          promptAsync({ useProxy });
        }}
      />
      <Button disabled={!request} title='GetFiles' />
    </>
  );
}
