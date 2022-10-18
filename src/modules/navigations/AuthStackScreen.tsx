import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChooseNicknameScreen from '../screens/chooseNicknameScreen';
import ChooseThemeScreen from '../screens/chooseThemeScreen';
import ShowNumberOrderScreen from '../screens/showNumberOrderScreen';
import TutorialHomeScreen from '../screens/tutorialScreen/homeScreen';
import TutorialLoginScreen from '../screens/tutorialScreen/loginScreen';
import { RouteNames } from './routeName';

export type AuthStackParamList = {
    TutorialLoginScreen: undefined,
    TutorialHomeScreen: undefined,
    ChooseNicknameScreen: {id: any}
    ChooseThemeScreen: undefined
    ShowNumberOrderScreen: {stt: number}
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
    return <AuthStack.Navigator screenOptions={{gestureEnabled: false}}>
        <AuthStack.Screen name={RouteNames.TutorialHomeScreen} component={TutorialHomeScreen}  options={{header: () => null}}/>
        <AuthStack.Screen name={RouteNames.ChooseThemeScreen} component={ChooseThemeScreen} options={{header: () => null}}/>
        <AuthStack.Screen name={RouteNames.ShowNumberOrderScreen} component={ShowNumberOrderScreen} options={{header: () => null}}/> 
        <AuthStack.Screen name={RouteNames.ChooseNicknameScreen} component={ChooseNicknameScreen} options={{header: () => null}}/>
    </AuthStack.Navigator>
};

export default AuthStackScreen;