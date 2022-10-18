import {useNavigation, useRoute} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import images from 'src/assets/images';
import {AppButton} from 'src/modules/components/appButton';
import {AppInput} from 'src/modules/components/appInput';
import {AppText} from 'src/modules/components/appText';
import { AuthStackParamList } from 'src/modules/navigations/AuthStackScreen';
import {RouteNames} from 'src/modules/navigations/routeName';
import {postInfoUserRequest} from 'src/modules/redux/actions/tutorialAction/user';
import * as yup from 'yup';
import theme from '../../../shared/theme';

const ChooseNicknameScreen = () => {
  const dispatch = useDispatch();
  const router: any = useRoute();
  console.log('router', router);

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const validationSchema = yup.object().shape({
    input: yup.string().required('Vui lòng nhập nickname'),
  });

  const onSubmit = (values: any, setSubmitting: any) => {
    dispatch(
      postInfoUserRequest(
        {user_name: values.input, color_subject: router.params.id},
        {
          onSuccess: (data: any) => {
            navigation.navigate(RouteNames.ShowNumberOrderScreen, {stt: data.index});
          },
        },
      ),
    );
  };

  return (
    <View style={{flex: 1}}>
      <Image style={styles.img} source={images.backgroundImg} resizeMode="stretch" />
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={images.IconNickname}
          resizeMode="stretch"
        />
          <Image style={styles.text} source={images.TextScreen3} />
        <Image
          style={styles.logo}
          source={images.IconTP}
          resizeMode="stretch"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          width: '100%',
          top: 70,
          marginLeft: 20,

        }}>
        <View
          style={{
            borderBottomWidth: 2,
            width: '15%',
            marginLeft: 20,
            height: 70,
            borderBottomColor:"#FFF",
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
          width: '100%',
          top:'40%'
        }}>
        <Formik
          initialValues={{input: ''}}
          onSubmit={(values, {setSubmitting}) => {
            onSubmit(values, setSubmitting);
          }}
          validationSchema={validationSchema}
          validateOnChange={true}
          enableReinitialize>
          {({values, errors, handleChange, handleSubmit, isSubmitting}) => {
            return (
              <View style={{ alignItems:"center"}}>
                <AppInput
                  placeholder="Nickname"
                  inputStyle={{
                    backgroundColor: '#a906e9',
                    borderRadius: 30,
                    height: theme.dimensions.p28,
                    paddingHorizontal: theme.dimensions.p16,
                    fontFamily: theme.font.Medium,
                    color:'#FFF',
                  }}
                  containerStyle={{
                    paddingHorizontal: theme.dimensions.makeResponsiveSize(58),
                  }}
                  placeholderTextColor={'#f7b3ff'}
                  value={values.input}
                  onChangeText={handleChange('input')}
                />
                    <Image source={images.suggest} style={{}}/>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{alignItems: 'center', position: 'relative'}}>
                  <Image
                    source={images.button}
                    style={{width: 300, height: 50}}
                  />
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
            );
          }}
        </Formik>

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
    position:"absolute",
    width: theme.dimensions.deviceWidth * 0.9,
    height: theme.dimensions.deviceHeight * 0.12,
    top: theme.dimensions.deviceHeight*0.18,
    left: theme.dimensions.p12
  },
});

export default ChooseNicknameScreen;
