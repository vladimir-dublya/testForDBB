import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { LoginScreen } from './navigation/screens/LoginScreen';

function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}

export default App;
