import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HOME_SCREEN from 'App/src/screens/Home';
import SONGSDETAILS_SCREEN from 'App/src/screens/SongsDetail';
import { COLOR_CODES } from 'App/src/utility/Theme';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{
        headerStyle: {
          backgroundColor: COLOR_CODES.HEADER_COLOR,
        },
        headerTintColor: COLOR_CODES.WHITE,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          alignSelf: 'center'
        },
      }}>
          <Stack.Screen name="home" component={HOME_SCREEN} options={{ title: 'Songs' }} />
          <Stack.Screen name="details" component={SONGSDETAILS_SCREEN} options={{ title: 'Songs'}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default AppNavigator;