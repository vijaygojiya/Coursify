import { Pressable, Text, TextInput, View } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  ChevronIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  LockIcon,
  MainIcon,
  UserIcon,
} from "@/assets";
import { signupSchema, zodErrorSimplify } from "@/utils";
import { ZodError } from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { AppButton, AppTextInput } from "@/components";
import { AppScreenProps } from "@/typings/navigation";
import { useMutation } from "@tanstack/react-query";
import { signUpWithEmail } from "@/services/supabase";
import { toast } from "sonner-native";
import { isAuthError } from "@supabase/supabase-js";

const defaultValue = {
  name: "",
  email: "",
  password: "",
};
type inputKeys = keyof typeof defaultValue;

const LeftIcons = {
  name: UserIcon,
  email: MainIcon,
  password: LockIcon,
};

const Labels = {
  name: "Name",
  email: "Email",
  password: "Password",
};
const Placeholders = {
  name: "Enter your full name",
  email: "Enter your email",
  password: "Enter your password",
};

const inputConfigs: inputKeys[] = Object.keys(defaultValue) as inputKeys[];

const SignUp = ({ navigation }: AppScreenProps<"SignUp">) => {
  const [isSecureTextEntry, setSecureTextEntry] = useState(true);

  const [inputs, setInputs] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);

  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();

  const inputRefs = useRef<Record<inputKeys, null | TextInput>>({
    email: null,
    password: null,
    name: null,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: signUpWithEmail,
    onSuccess: (user) => {},
    onError: (error) => {
      if (isAuthError(error)) {
        toast.error(error.message);
      }
    },
  });

  const handleSubmit = useCallback(() => {
    try {
      signupSchema.parse(inputs);
      mutate(inputs);
    } catch (error) {
      console.log("------error", JSON.stringify(error, null, 8));
      if (error instanceof ZodError) {
        const validationErrors = zodErrorSimplify<typeof defaultValue>(error);
        setErrors(validationErrors);
      }
    }
  }, [inputs, mutate]);

  const handleSubmitEditing = useCallback(
    (key: inputKeys) => {
      if (key === "email") {
        inputRefs.current.password?.focus();
      } else if (key === "name") {
        inputRefs.current.email?.focus();
      } else {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handelAlreadyHaveAccount = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={navigation.goBack}
        hitSlop={10}
        style={{ marginTop: top, marginStart: 16 }}
      >
        <ChevronIcon height={34} width={34} />
      </Pressable>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        bottomOffset={22}
        contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
        disableScrollOnKeyboardHide={true}
      >
        <Text style={[styles.appTitle, { color: colors.neutral100 }]}>
          Create new account{"\n"}
          <Text style={{ color: colors.primary }}>Coursify</Text>
        </Text>
        {inputConfigs.map((inputKey, index) => {
          const isPassword = inputKey === "password";
          const LeftIcon = LeftIcons[inputKey];
          return (
            <AppTextInput
              key={`login-form-field-${index}`}
              ref={(ref) => {
                const temp = inputRefs.current;
                inputRefs.current = { ...temp, [inputKey]: ref };
              }}
              value={inputs[inputKey]}
              returnKeyType={
                index + 1 === inputConfigs.length ? "done" : "next"
              }
              onSubmitEditing={() => {
                handleSubmitEditing(inputKey);
              }}
              error={errors[inputKey]}
              onChangeText={(text) => {
                setInputs((prev) => ({ ...prev, [inputKey]: text }));
                setErrors((prev) => ({ ...prev, [inputKey]: "" }));
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
                  setSecureTextEntry((v) => !v);
                }
              }}
              label={Labels[inputKey]}
              placeholder={Placeholders[inputKey]}
            />
          );
        })}

        <AppButton
          onPress={handleSubmit}
          title="Sign Up"
          isLoading={isPending}
        />
        <View style={styles.spacer} />
        <Pressable
          hitSlop={{ top: 10, bottom: 5 }}
          onPress={handelAlreadyHaveAccount}
        >
          <Text style={[styles.footerText, { color: colors.text }]}>
            Already have an account?{" "}
            <Text style={[styles.createAccountText, { color: colors.primary }]}>
              Login
            </Text>
          </Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
