import {useNavigation, useRoute} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Formik} from 'formik';
import React from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
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
      <Image style={styles.img} source={images.anh3} resizeMode="stretch" />
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          width: '100%',
          top: 80,
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
          top:'38%'
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
                  autoCapitalize={"characters"}
                />
                {/* {errors.input ? Alert.alert('Vui lòng nhập nickname') : null} */}
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{alignItems: 'center', position: 'relative',top: theme.dimensions.deviceHeight*0.37}}>
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
    width: theme.dimensions.deviceWidth * 0.22,
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
