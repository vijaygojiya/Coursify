import {Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {AppStackScreensProps} from '@/types/navigation';
import {AppButton, AppTextInput, ScreenContainer} from '@/components';
import {EyeHide, EyeShow, Facebook, Google, Lock, Message} from '@/assets';
import {useTranslation} from 'react-i18next';
import Routes from '@/router/routes';
import {loginSchema} from '@/utils/validation';
import {ZodError} from 'zod';
import {zodErrorSimplify} from '@/utils/helper';
import {useNavigation, useTheme} from '@react-navigation/native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {textVariants} from '@/styles';
import {fireAuth} from '@/services/firebase';
import {useMutation} from '@tanstack/react-query';
import BounceContainer from '@/components/BounceContainer';

const defaultValue = {
  email: '',
  password: '',
};
type inputKeys = keyof typeof defaultValue;

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const Login = ({}: AppStackScreensProps<'Login'>) => {
  //
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);
  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);
  const navigation = useNavigation();
  const {mutate, isPending} = useMutation({
    mutationFn: fireAuth.signInUserWithFirebase,
    onError: e => {
      console.log('=====+++===+++==', JSON.stringify(e, null, 9));
    },
  });

  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    email: null,
    password: null,
  });
  const {t} = useTranslation(['auth', 'common']);

  const {colors} = useTheme();

  const togglePassword = useCallback(() => {
    setSecureTextEntry(v => !v);
  }, []);

  const handleCreateAccount = () => {
    navigation.navigate(Routes.SignUp);
  };

  const handleForgotPassword = () => {
    navigation.navigate(Routes.ForgotPassword);
  };

  const handleOnSubmit = async () => {
    setErrors(defaultValue);

    try {
      loginSchema.parse(inputs);
      mutate({...inputs});
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      }
    }
  };

  const getInputConfig = (key: inputKeys) => {
    if (key === 'email') {
      return {
        label: t('labels.email'),
        placeholder: t('placeholders.email'),
        keyboardType: 'email-address' as const,
        returnKeyType: 'next' as const,
        leftIcon: <Message stroke={colors.neutral80} />,
      };
    }
    return {
      label: t('labels.password'),
      placeholder: t('placeholders.password'),
      returnKeyType: 'done' as const,
      leftIcon: <Lock stroke={colors.neutral80} />,
      onRightIconPress: togglePassword,
      rightIcon: isSecureTextEntry ? (
        <EyeHide stroke={colors.neutral80} />
      ) : (
        <EyeShow stroke={colors.neutral80} />
      ),
      secureTextEntry: isSecureTextEntry,
    };
  };

  const handleSubmitEditing = (key: inputKeys) => {
    if (key === 'email') {
      inputRefs.current.password?.focus();
    } else {
      handleOnSubmit();
    }
  };
  const handleLoginWithFacebook = async () => {
    try {
      await fireAuth.facebookLogin();
    } catch (error) {
      console.log(
        'error while sign in with facebook ',
        JSON.stringify(error, null, 8),
      );
    }
  };
  const handleLoginWithGoogle = async () => {
    try {
      const users = await fireAuth.googleSignIn();
      console.log('=+===++===++==++', JSON.stringify(users, null, 8));
    } catch (error) {
      console.log(
        'error while sign in with google ',
        JSON.stringify(error, null, 8),
      );
    }
  };
  const renderInputs = () => {
    return inputConfigs.map((inputKey, index) => {
      const config = getInputConfig(inputKey);

      return (
        <AppTextInput
          key={`login-form-field-${index}`}
          {...config}
          ref={ref => {
            const temp = inputRefs.current;
            inputRefs.current = {...temp, [inputKey]: ref};
          }}
          value={inputs[inputKey]}
          onSubmitEditing={() => {
            handleSubmitEditing(inputKey);
          }}
          error={errors[inputKey]}
          onChangeText={text => {
            setInputs(prev => ({...prev, [inputKey]: text}));
            setErrors(prev => ({...prev, [inputKey]: ''}));
          }}
        />
      );
    });
  };
  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text
          style={[styles.title, {color: colors.neutral100}, textVariants.h2]}>
          {t('loginScreen.title')}{' '}
          <Text style={[styles.coursify, {color: colors.primaryMain}]}>
            {t('common:appName')}
          </Text>
        </Text>
        <Text
          style={[
            textVariants.h3,
            {color: colors.neutral80},
            styles.loginTitle,
          ]}>
          {t('loginScreen.subTitle')}
        </Text>
        {renderInputs()}
        <Text
          onPress={handleForgotPassword}
          style={[
            textVariants.body,
            {color: colors.neutral80},
            styles.forgotPasswordText,
          ]}>
          {t('forgotPassword')}
        </Text>
        <AppButton
          isLoading={isPending}
          onPress={handleOnSubmit}
          title={t('login')}
        />
        <View style={styles.socialIconContainer}>
          <BounceContainer
            onPress={handleLoginWithFacebook}
            style={[styles.socialIcon, {borderColor: colors.infoBorder}]}>
            <Facebook />
          </BounceContainer>
          <BounceContainer
            onPress={handleLoginWithGoogle}
            style={[styles.socialIcon, {borderColor: colors.infoBorder}]}>
            <Google />
          </BounceContainer>
        </View>
        <View style={styles.spacer} />
        <Text
          style={[
            textVariants.body,
            styles.footerText,
            {color: colors.neutral100},
          ]}>
          {t('loginScreen.footerTitle')}{' '}
          <Text
            onPress={handleCreateAccount}
            style={[styles.createNewText, {color: colors.primaryMain}]}>
            {t('signUp')}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default Login;
