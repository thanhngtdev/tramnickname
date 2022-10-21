import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image, StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import images from 'src/assets/images';
import { AppText } from 'src/modules/components/appText';
import { AuthStackParamList } from 'src/modules/navigations/AuthStackScreen';
import { RouteNames } from 'src/modules/navigations/routeName';
import theme from 'src/shared/theme';

interface ITest {
  name: string;
}

const ShowNumberOrderScreen = () => {
  const router: any = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={{flex: 1}}>
      <Image style={styles.img} source={images.lastscreen}  />
      <View style={{flexDirection: 'row', position: 'absolute', width: '100%'}}>
        <AppText
          children={router.params.stt}
          style={{
            width: '100%',
            textAlign: 'center',
            top: theme.dimensions.deviceHeight * 0.5,
            fontFamily: theme.font.Bold,
            fontSize: 190,
            color: '#FFF',
            opacity:0.9
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          bottom: 100,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(RouteNames.TutorialHomeScreen)}
          style={{alignItems: 'center', position: 'absolute'}}>
          <Image source={images.button} style={{width: 300, height: 50}} />
          <AppText
            children="hoàn thành"
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
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  title: {
    width: '100%',
    fontSize: theme.dimensions.makeResponsiveSize(14),
    color: theme.color.white,
    top: 120,
    paddingHorizontal: theme.dimensions.p32,
    textAlign: 'center',
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
    position:"absolute",
    width: theme.dimensions.deviceWidth * 0.9,
    height: theme.dimensions.deviceHeight * 0.31,
    top: theme.dimensions.deviceHeight*0.18,
    left: theme.dimensions.p12
  },
});

export default ShowNumberOrderScreen;
