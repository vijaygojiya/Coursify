import {Text, TextInput, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {AppStackScreensProps} from '@/types/navigation';
import {AppButton, AppTextInput, ScreenContainer} from '@/components';
import {EyeHide, EyeShow, Lock, Message} from '@/assets';
import {useTranslation} from 'react-i18next';
import Routes from '@/router/routes';
import {loginSchema} from '@/utils/validation';
import {ZodError} from 'zod';
import {zodErrorSimplify} from '@/utils/helper';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {textVariants} from '@/styles';

const defaultValue = {
  email: '',
  password: '',
};
type inputKeys = keyof typeof defaultValue;

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const Login = ({navigation}: AppStackScreensProps<'Login'>) => {
  //
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);
  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);
  const [isLoading, setLoading] = useState(false);

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
    //TO:DO navigate to forgot password screen
  };

  const handleOnSubmit = async () => {
    setErrors(defaultValue);
    setLoading(true);
    try {
      loginSchema.parse(inputs);
      // await signInUserWithFirebase(inputs.email, inputs.password);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      }
    } finally {
      setLoading(false);
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
        <Text style={[styles.title, textVariants.h2]}>
          {t('loginScreen.title')}{' '}
          <Text style={styles.coursify}>{t('common:appName')}</Text>
        </Text>
        <Text style={[textVariants.h3, styles.loginTitle]}>
          {t('loginScreen.subTitle')}
        </Text>
        {renderInputs()}
        <Text
          onPress={handleForgotPassword}
          style={[textVariants.body, styles.forgotPasswordText]}>
          {t('forgotPassword')}
        </Text>
        <AppButton
          isLoading={isLoading}
          onPress={handleOnSubmit}
          title={t('common:login')}
        />
        <View style={styles.spacer} />
        <Text style={[textVariants.body, styles.footerText]}>
          {t('loginScreen.footerTitle')}{' '}
          <Text onPress={handleCreateAccount} style={styles.createNewText}>
            {t('signUp')}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default Login;
