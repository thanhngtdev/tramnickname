import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteNames } from './routeName';
import TutorialHomeScreen from '../screens/tutorialScreen/homeScreen';
import TutorialLoginScreen from '../screens/tutorialScreen/loginScreen';
import ChooseNicknameScreen from '../screens/chooseNicknameScreen';
import ChooseThemeScreen from '../screens/chooseThemeScreen';
import ShowNumberOrderScreen from '../screens/showNumberOrderScreen';

export type MainStackParamList = {
    TutorialHomeScreen: undefined,
    TutorialLoginScreen: undefined,
    ChooseNicknameScreen: undefined
    ChooseThemeScreen: undefined
    ShowNumberOrderScreen: undefined
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
    return <MainStack.Navigator>
        {/* <MainStack.Screen name={RouteNames.TutorialHomeScreen} component={TutorialHomeScreen} />
        <MainStack.Screen name={RouteNames.TutorialLoginScreen} component={TutorialLoginScreen} /> */}
        {/* <MainStack.Screen name={RouteNames.ChooseNicknameScreen} component={ChooseNicknameScreen} />
        <MainStack.Screen name={RouteNames.ChooseThemeScreen} component={ChooseThemeScreen} />
        <MainStack.Screen name={RouteNames.ShowNumberOrderScreen} component={ShowNumberOrderScreen} /> */}
    </MainStack.Navigator>
};

export default MainStackScreen;