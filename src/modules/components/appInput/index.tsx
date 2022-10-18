import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Input, InputProps} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../../../shared/theme';

interface IAppInput extends InputProps {}

export const AppInput = React.memo((props: IAppInput) => {
  const inputRef = useRef(null);
  const {
    inputContainerStyle,
    inputStyle,
    labelStyle,
    errorStyle,
    errorMessage,
  } = props;

  return (
    <Input
      {...props}
      ref={inputRef}
      autoCompleteType={''}
      allowFontScaling={false}
      spellCheck={false}
      autoCorrect={false}
      inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
      inputStyle={[
        styles.inputStyle,
        inputStyle,
        Boolean(errorMessage) && {color: theme.color.red},
      ]}
      labelStyle={[styles.labelStyle, labelStyle]}
      errorStyle={[styles.errorStyle, errorStyle]}
    />
  );
});

const styles = StyleSheet.create({
  container: {},
  inputContainerStyle: {
    // width: "100%",
    borderBottomWidth:2,
    borderColor: "#fa5deb",
    borderWidth: 2,
    borderRadius: 30,
  },
  inputStyle: {
    fontFamily: theme.font.Regular,
    fontSize: theme.fontSize.p16,
    paddingHorizontal: theme.dimensions.p4,
  },
  labelStyle: {
    // fontSize: theme.fontSize.p16
  },
  errorStyle: {
    fontSize: theme.fontSize.p12,
    color: theme.color.red,
  },
});
