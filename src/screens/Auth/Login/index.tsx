import React, {useCallback, useRef, useState} from 'react';
import {useAuth} from '@/hooks';
import {
  EyeCloseIcon,
  EyeOpenIcon,
  LockIcon,
  LoginVector,
  MainIcon,
} from '@/assets';
import {TextInput} from 'react-native-gesture-handler';
import {loginSchema, zodErrorSimplify} from '@/utils';
import {ZodError} from 'zod';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import styles from './styles';
import {AppButton, AppTextInput} from '@/components';
import {Pressable, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const defaultValue = {
  email: '',
  password: '',
};
type inputKeys = keyof typeof defaultValue;

const LeftIcons = {
  email: MainIcon,
  password: LockIcon,
};
const Labels = {
  email: 'Email',
  password: 'Password',
};
const Placeholders = {
  email: 'Enter your email',
  password: 'Enter your password',
};

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const Login = () => {
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);

  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  const {login} = useAuth();
  const {bottom, top} = useSafeAreaInsets();
  const {colors} = useTheme();
  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    email: null,
    password: null,
  });

  const handleSubmit = useCallback(() => {
    try {
      loginSchema.parse(inputs);
      login();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      }
    }
  }, [inputs, login]);

  const handleSubmitEditing = useCallback(
    (key: inputKeys) => {
      if (key === 'email') {
        inputRefs.current.password?.focus();
      } else {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      overScrollMode="never"
      keyboardShouldPersistTaps="handled"
      bottomOffset={22}
      contentContainerStyle={[
        styles.content,
        {paddingTop: top, paddingBottom: bottom},
      ]}
      disableScrollOnKeyboardHide={true}>
      <LoginVector width={226} height={220} style={{alignSelf: 'center'}} />
      <Text
        style={{
          fontSize: 26,
          fontWeight: '500',
          alignSelf: 'center',
          color: colors.primary,
        }}>
        Welcome Back
      </Text>
      {inputConfigs.map((inputKey, index) => {
        const isPassword = inputKey === 'password';
        const LeftIcon = LeftIcons[inputKey];
        return (
          <AppTextInput
            key={`login-form-field-${index}`}
            ref={ref => {
              const temp = inputRefs.current;
              inputRefs.current = {...temp, [inputKey]: ref};
            }}
            value={inputs[inputKey]}
            returnKeyType={index + 1 === inputConfigs.length ? 'done' : 'next'}
            onSubmitEditing={() => {
              handleSubmitEditing(inputKey);
            }}
            error={errors[inputKey]}
            onChangeText={text => {
              setInputs(prev => ({...prev, [inputKey]: text}));
              setErrors(prev => ({...prev, [inputKey]: ''}));
            }}
            leftIcon={<LeftIcon />}
            rightIcon={
              isPassword ? (
                isSecureTextEntry ? (
                  <EyeCloseIcon />
                ) : (
                  <EyeOpenIcon />
                )
              ) : null
            }
            secureTextEntry={isPassword && isSecureTextEntry}
            onRightIconPress={() => {
              if (isPassword) {
                setSecureTextEntry(v => !v);
              }
            }}
            label={Labels[inputKey]}
            placeholder={Placeholders[inputKey]}
          />
        );
      })}
      <Pressable style={{alignSelf: 'flex-end'}}>
        <Text style={{fontSize: 14, color: colors.primary, marginBottom: 18}}>
          Forgot password?
        </Text>
      </Pressable>
      <AppButton title="Login" />
      <View style={{flex: 1}} />
      <Pressable
        style={{alignSelf: 'center'}}
        hitSlop={{top: 10, bottom: 5}}
        onPress={() => {}}>
        <Text style={[styles.footerText, {color: colors.text}]}>
          Don't have an account?{'  '}
          <Text style={[styles.createAccountText, {color: colors.primary}]}>
            create new account.
          </Text>
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default Login;
