import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import images from 'src/assets/images';
import {AppButton} from 'src/modules/components/appButton';
import {AppText} from 'src/modules/components/appText';
import {AuthStackParamList} from 'src/modules/navigations/AuthStackScreen';
import {MainStackParamList} from 'src/modules/navigations/MainStackScreen';
import {RouteNames} from 'src/modules/navigations/routeName';
import theme from '../../../shared/theme';

const ChooseThemeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const topic = [
    {id: 0, image: images.dreamy, name: 'Mộng Mơ'},
    {id: 1, image: images.fashion, name: 'Thời trang'},
    {id: 2, image: images.art, name: 'Nghệ thuật'},
    {id: 3, image: images.dark, name: 'Dark & Cool'},
  ];

  return (
    <View style={{flex: 1}}>
      <Image
        style={styles.img}
        source={images.anh2}
      />
     

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          width: '100%',
          top: 80,
          marginLeft: theme.dimensions.makeResponsiveSize(20),
        }}>
        <View
          style={{
            borderBottomWidth: 2,
            width: '15%',
            height: 70,
            borderBottomColor: '#FFF',
            top: theme.dimensions.p4,
          }}>
          <AppButton
            text="< Quay lại"
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
            }}
            textStyle={{
              textTransform: 'uppercase',
              fontFamily: theme.font.Bold,
            }}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginHorizontal: theme.dimensions.makeResponsiveSize(10),
          bottom: -30,
          marginBottom: theme.dimensions.p16,
        }}>
        {topic.map((el, key) => {
          return (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() =>
                navigation.navigate(RouteNames.ChooseNicknameScreen, {
                  id: el.id,
                })
              }>
              <Image
                style={{width: theme.dimensions.deviceWidth*0.45, height: 220, borderRadius: 30}}
                source={el.image}
              />
              <AppText
                children={el.name}
                style={{
                  paddingBottom: theme.dimensions.makeResponsiveSize(2),
                  // color: "#eecefd",
                  textTransform: 'uppercase',
                  fontSize: 20,
                  fontFamily: theme.font.Bold,
                  color: 'white',
                }}
              />
            </TouchableOpacity>
          );
        })}
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
    width: '50%',
    fontSize: theme.dimensions.makeResponsiveSize(14),
    textAlign: 'center',
    paddingTop: theme.dimensions.p24,
    color: theme.color.white,
    textTransform: 'uppercase',
    fontFamily: theme.font.Medium,
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
    width: theme.dimensions.deviceWidth * 0.52,
    height: theme.dimensions.deviceHeight * 0.12,
    flexWrap:"wrap",
    top: theme.dimensions.deviceHeight*0.15,
  },
 
});

export default ChooseThemeScreen;
