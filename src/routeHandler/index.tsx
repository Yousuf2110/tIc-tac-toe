import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Game from '../screens/game';
import {SCREEN} from '../constants/screen';
import CompGame from '../screens/compGame';
import PrivacyPolicy from '../screens/privacyPolicy';
import TermsConditions from '../screens/term&Condition';
import Splash from '../screens/splash';

const Stack = createNativeStackNavigator();

const RouteHandler = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={SCREEN.SPLASH} component={Splash} />
        <Stack.Screen name={SCREEN.HOME} component={Home} />
        <Stack.Screen name={SCREEN.GAME} component={Game} />
        <Stack.Screen name={SCREEN.COMP_GAME} component={CompGame} />
        <Stack.Screen name={SCREEN.PRIVACY_POLICY} component={PrivacyPolicy} />
        <Stack.Screen
          name={SCREEN.TERMS_CONDITIONS}
          component={TermsConditions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteHandler;
