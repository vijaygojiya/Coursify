import {Text} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AppButton, AppTextInput, ScreenContainer} from '@/components';
import styles from './styles';
import {Message} from '@/assets';
import {useTheme} from '@react-navigation/native';
import {AppStackScreensProps} from '@/types/navigation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = ({}: AppStackScreensProps<'ForgotPassword'>) => {
  const [email, setEmail] = useState('');
  const {t} = useTranslation(['auth']);
  const {colors} = useTheme();

  return (
    <ScreenContainer style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t('forgotPasswordScreen.title')}</Text>
        <Text style={styles.subtitle}>
          {t('forgotPasswordScreen.subTitle')}
        </Text>
        <AppTextInput
          leftIcon={<Message stroke={colors.neutral80} />}
          value={email}
          label={t('labels.email')}
          placeholder={t('placeholders.email')}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <AppButton
          disabled={!email}
          // onPress={handleResetPassword}
          title={t('forgotPasswordScreen.resetPassword')}
        />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default ForgotPassword;
