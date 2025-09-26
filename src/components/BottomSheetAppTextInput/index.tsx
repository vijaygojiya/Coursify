import {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useBottomSheetInternal} from '@gorhom/bottom-sheet';
import AppTextInput, {AppTextInputProps} from '../AppTextInput';

const BottomSheetAppTextInput = ({
  onFocus,
  onBlur,
  ...props
}: AppTextInputProps) => {
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents],
  );
  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents],
  );

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  return (
    <AppTextInput onFocus={handleOnFocus} onBlur={handleOnBlur} {...props} />
  );
};

export default BottomSheetAppTextInput;
