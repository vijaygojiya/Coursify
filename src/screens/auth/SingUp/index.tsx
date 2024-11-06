import {Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {AppStackScreensProps} from '@/types/navigation';
import {AppButton, AppTextInput, ScreenContainer} from '@/components';
import {Profile, Message, Lock, EyeHide, EyeShow} from '@/assets';
import {zodErrorSimplify} from '@/utils/helper';
import {signupSchema} from '@/utils/validation';
import {useTranslation} from 'react-i18next';
import {ZodError} from 'zod';
import Routes from '@/router/routes';
import {useNavigation, useTheme} from '@react-navigation/native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import {fireAuth} from '@/services/firebase';
import {useMutation} from '@tanstack/react-query';

const defaultValue = {
  name: '',
  email: '',
  password: '',
};

type inputKeys = keyof typeof defaultValue;

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const SignUp = ({}: AppStackScreensProps<'SignUp'>) => {
  //
  const [isVisible, setVisible] = useState(true);
  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);
  const {mutate, isPending} = useMutation({
    mutationFn: fireAuth.createUserInFirebase,
    onError: e => {
      console.log('e', e);
    },
  });

  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    name: null,
    email: null,
    password: null,
  });

  const {t} = useTranslation(['auth', 'common']);
  const {colors} = useTheme();
  const navigation =
    useNavigation<AppStackScreensProps<'SignUp'>['navigation']>();

  const togglePassword = useCallback(() => {
    setVisible(v => !v);
  }, []);

  const handleSubmit = async () => {
    setErrors(defaultValue);
    try {
      const result = signupSchema.parse(inputs);
      mutate({...result});
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      } else {
        const fireError = error as ReactNativeFirebase.NativeFirebaseError;
        if (fireError.code === 'auth/email-already-in-use') {
          setErrors(prev => ({
            ...prev,
            email:
              'Account with this email already exists. Please use a different email or log in with this one.',
          }));
        }
      }
    }
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate(Routes.Login);
  };

  const getInputConfig = (key: inputKeys) => {
    if (key === 'name') {
      return {
        label: t('labels.name'),
        placeholder: t('placeholders.name'),
        keyboardType: 'default' as const,
        returnKeyType: 'next' as const,
        leftIcon: <Profile stroke={colors.neutral80} />,
      };
    }
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
      rightIcon: isVisible ? (
        <EyeHide stroke={colors.neutral80} />
      ) : (
        <EyeShow stroke={colors.neutral80} />
      ),
      secureTextEntry: isVisible,
    };
  };

  const handleSubmitEditing = (key: inputKeys) => {
    if (key === 'name') {
      inputRefs.current.email?.focus();
    } else if (key === 'email') {
      inputRefs.current.password?.focus();
    } else {
      handleSubmit();
    }
  };

  const renderInputs = () => {
    return inputConfigs.map((inputKey, index) => {
      const config = getInputConfig(inputKey);
      return (
        <AppTextInput
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
          key={index}
        />
      );
    });
  };

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, {color: colors.neutral100}]}>
          {t('signUpScreen.subTitle')}{' '}
          <Text style={[styles.coursify, {color: colors.primaryMain}]}>
            {t('common:appName')}
          </Text>
        </Text>
        <Text style={[styles.loginTitle, {color: colors.neutral80}]}>
          {t('signUpScreen.title')}
        </Text>
        {renderInputs()}
        <AppButton
          isLoading={isPending}
          onPress={handleSubmit}
          title={t('signUp')}
        />
        <View style={styles.spacer} />
        <Text style={[styles.footerText, {color: colors.neutral100}]}>
          {t('signUpScreen.footerTitle')}{' '}
          <Text
            onPress={handleAlreadyHaveAccount}
            style={[styles.createNewText, {color: colors.primaryMain}]}>
            {t('login')}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default SignUp;
