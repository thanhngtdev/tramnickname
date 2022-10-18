import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import images from 'src/assets/images';
import { AppButton } from 'src/modules/components/appButton';
import { MainStackParamList } from 'src/modules/navigations/MainStackScreen';
import { RouteNames } from 'src/modules/navigations/routeName';
import theme from 'src/shared/theme';

const TutorialLoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    
    return (
        <View>
          <Image style={styles.img} source={images.anh1} />
          {/* <AppButton
            text="Tiếp tục"
            onPress={() => navigation.navigate(RouteNames.ChooseThemeScreen)}
            style={{position: 'absolute', backgroundColor: 'red'}}
          /> */}
        </View>
      );
}

const styles = StyleSheet.create({
    img: {
        position: 'relative'
    }
});

export default TutorialLoginScreen;