import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {EmitType} from 'src/shared/helpers/constant';
import NavigationService from '../shared/helpers/NavigationService';
import {configureLocalization} from '../shared/localization';
import RootNavigator from './navigations/RootNavigator';
import {persistor, store} from './redux/store';
import SplashScreen from 'react-native-splash-screen';
import {AppText} from './components/appText';
import theme from 'src/shared/theme';
import CodePush from 'react-native-code-push';

export const appState = {
  readyForAuth: false,
};

const App = () => {
  const subscription = DeviceEventEmitter.addListener(
    EmitType.AppReadyForAuth,
    () => {
      appState.readyForAuth = true;
    },
  );

  useEffect(() => {
    configureLocalization('vn');
    SplashScreen.hide();
    return () => {
      subscription?.remove();
    };
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={(ref: NavigationContainerRef<any>) =>
            NavigationService.setTopLevelNavigator(ref)
          }>
          <View style={{flex: 1}}>
            <RootNavigator />
            {/* <MessageAlert /> */}
            {/* <Toast position={'bottom'} config={toastConfig} /> */}
            <AppText
              children="1.0.3"
              style={{
                position: 'absolute',
                bottom: theme.dimensions.makeResponsiveSize(4),
                right: theme.dimensions.makeResponsiveSize(6),
                fontSize: theme.fontSize.p8,
                color:'#eeeee4'
              }}
            />
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default CodePush(App)
