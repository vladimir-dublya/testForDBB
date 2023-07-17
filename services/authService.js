import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();
const useProxy = Platform.select({ web: false, default: true });

const discovery = {
  authorizationEndpoint: 'https://www.dropbox.com/oauth2/authorize',
  tokenEndpoint: 'https://www.dropbox.com/oauth2/token',
};

class AuthService {
  //   login() {
  //     try {
  //       const [request, response, promptAsync] = useAuthRequest(
  //         {
  //           responseType: ResponseType.Token,
  //           clientId: '4fs99nyku6i8p94',
  //           scopes: [],
  //           usePKCE: false,
  //           redirectUri: makeRedirectUri({
  //             scheme: 'testForDBB',
  //             useProxy,
  //           }),
  //         },
  //         discovery,
  //       );
  //       promptAsync({ useProxy });
  //     } catch (e) {
  //       console.log('error: ', e);
  //     }
  //     console.log('Starting');
  //   }
}

export const authService = new AuthService();
