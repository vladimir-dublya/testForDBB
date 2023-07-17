import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';

const home = 'Home';
const files = 'Files';
const create = 'Create';
const photos = 'Photos';
const account = 'Account';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const handleClickOnAnotherTab = (e) => {
    e.preventDefault();
    alert('Not implemented');
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={files}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === home) {
              iconName = 'home';
            } else if (rn === files) {
              iconName = 'md-folder';
            } else if (rn === create) {
              iconName = 'md-add-circle';
            } else if (rn === photos) {
              iconName = 'md-image';
            } else if (rn === account) {
              iconName = 'md-person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name={home}
          component={SettingsScreen}
          // listeners={{
          //   tabPress: handleClickOnAnotherTab,
          // }}
        />
        <Tab.Screen name={files} component={HomeScreen} />
        <Tab.Screen
          name={create}
          component={''}
          listeners={{
            tabPress: handleClickOnAnotherTab,
          }}
        />
        <Tab.Screen
          name={photos}
          component={''}
          listeners={{
            tabPress: handleClickOnAnotherTab,
          }}
        />
        <Tab.Screen
          name={account}
          component={''}
          listeners={{
            tabPress: handleClickOnAnotherTab,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
