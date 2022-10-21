import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import images from 'src/assets/images';
import { AppText } from 'src/modules/components/appText';
import { AuthStackParamList } from 'src/modules/navigations/AuthStackScreen';
import { RouteNames } from 'src/modules/navigations/routeName';
import theme from 'src/shared/theme';

const TutorialHomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View>
      <Image
        style={styles.img}
        source={images.anhdau}
      />
      

      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          bottom: theme.dimensions.makeResponsiveSize(40),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.ChooseThemeScreen)}
          style={{
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center',
          }}>
          <Image source={images.button} style={{width: 250, height: 60}} />
          <AppText
            children="Start"
            style={{
              textTransform: 'uppercase',
              fontSize: theme.fontSize.p12,
              fontFamily: theme.font.Bold,
              position: 'absolute',
              color: '#FFF',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  btnStart: {
    position: 'absolute',
    bottom: theme.dimensions.makeResponsiveSize(20),
    left: theme.dimensions.makeResponsiveSize(144),
  },
  header: {
    position: 'absolute',
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: theme.dimensions.makeResponsiveSize(12),
    top: theme.dimensions.p12,
  },
  logo: {
    width: theme.dimensions.deviceWidth * 0.2,
    height: theme.dimensions.deviceHeight * 0.08,
  },
  text: {
    width: theme.dimensions.deviceWidth * 0.7,
    height: theme.dimensions.deviceHeight * 0.2,
    position: 'absolute',
    top: theme.dimensions.deviceHeight * 0.35,
  },
});

export default TutorialHomeScreen;
