import React, {useCallback, useRef, useState} from 'react';
import {useAuth} from '@/hooks';
import {
  AppleIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  FacebookIcon,
  GoogleIcon,
  LockIcon,
  MainIcon,
} from '@/assets';
import {TextInput} from 'react-native-gesture-handler';
import {authErrorRegex, loginSchema, zodErrorSimplify} from '@/utils';
import {ZodError} from 'zod';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import styles from './styles';
import {AppButton, AppTextInput, FullScreenLoader} from '@/components';
import {Pressable, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {AppScreenProps} from '@/typings/navigation';
import {AppRoutes} from '@/navigation';
import {useMutation} from '@tanstack/react-query';
import {googleSignIn, signInUserWithFirebase} from '@/services/firebase';
import {toast} from 'sonner-native';
import {isErrorWithCode} from '@react-native-google-signin/google-signin';
import {isIos} from '@/utils/constant';

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

const Login = ({navigation}: AppScreenProps<'Login'>) => {
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);

  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  const {bottom, top} = useSafeAreaInsets();
  const {colors} = useTheme();

  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    email: null,
    password: null,
  });

  const {mutate, isPending} = useMutation({
    mutationFn: signInUserWithFirebase,
    onSuccess: () => {
      toast.dismiss();
    },
    onError: error => {
      if (authErrorRegex.test(error.message)) {
        const message = error.message.split(authErrorRegex)[1];
        toast.error(message.trim());
      } else {
        toast.error('Something went wrong!');
      }
    },
  });
  const {mutate: onGooglePress, isPending: isSigning} = useMutation({
    mutationFn: googleSignIn,
    onError: error => {
      if (authErrorRegex.test(error.message)) {
        const message = error.message.split(authErrorRegex)[1];
        toast.error(message.trim());
      } else if (isErrorWithCode(error)) {
        toast.error(error.message);
      }
    },
  });

  const handleSubmit = useCallback(() => {
    try {
      loginSchema.parse(inputs);
      mutate(inputs);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      }
    }
  }, [inputs, mutate]);

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

  const handleDontHaveAccount = useCallback(() => {
    navigation.navigate(AppRoutes.SignUp);
  }, [navigation]);

  const handleLoginWithGoogle = useCallback(() => {
    onGooglePress();
  }, [onGooglePress]);

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
      <View style={styles.spacer} />
      <Text style={[styles.appTitle, {color: colors.neutral100}]}>
        Welcome Back!{'\n'}
        <Text style={{color: colors.primary}}>Coursify</Text>
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
      <Pressable style={styles.forgotPasswordContainer}>
        <Text style={[styles.forgotPassword, {color: colors.primary}]}>
          Forgot password?
        </Text>
      </Pressable>
      <AppButton onPress={handleSubmit} title="Login" isLoading={isPending} />
      <View style={styles.orRowContainer}>
        <View style={[styles.line, {backgroundColor: colors.neutral40}]} />
        <Text style={[styles.orText, {color: colors.neutral70}]}>OR</Text>
        <View style={[styles.line, {backgroundColor: colors.neutral40}]} />
      </View>

      <View style={styles.socialIconContainer}>
        <Pressable
          onPress={handleLoginWithGoogle}
          style={[styles.iconContainer, {borderColor: colors.border}]}>
          <GoogleIcon fill={colors.primary} />
        </Pressable>
        <Pressable style={[styles.iconContainer, {borderColor: colors.border}]}>
          <FacebookIcon fill={colors.primary} />
        </Pressable>
        {isIos ? (
          <Pressable
            style={[styles.iconContainer, {borderColor: colors.border}]}>
            <AppleIcon fill={colors.primary} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.spacer} />
      <Pressable hitSlop={{top: 10, bottom: 5}} onPress={handleDontHaveAccount}>
        <Text style={[styles.footerText, {color: colors.text}]}>
          Don't have an account?{'  '}
          <Text style={[styles.createAccountText, {color: colors.primary}]}>
            create new account.
          </Text>
        </Text>
      </Pressable>
      <FullScreenLoader loading={isSigning} />
    </KeyboardAwareScrollView>
  );
};

export default Login;
