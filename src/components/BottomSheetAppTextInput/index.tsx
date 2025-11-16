import {
  findNodeHandle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { TextInput as RNTextInput } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import AppTextInput, { AppTextInputProps } from "../AppTextInput";

const BottomSheetAppTextInput = forwardRef<
  TextInput | undefined,
  AppTextInputProps
>(({ onFocus, onBlur, ...props }, providedRef) => {
  //#region refs
  const ref = useRef<TextInput>(null);
  //#region hooks
  const { animatedKeyboardState, textInputNodesRef } = useBottomSheetInternal();
  //#region callbacks
  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      animatedKeyboardState.set((state) => ({
        ...state,
        target: args.nativeEvent.target,
      }));
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, animatedKeyboardState]
  );
  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const keyboardState = animatedKeyboardState.get();
      const currentFocusedInput = findNodeHandle(
        RNTextInput.State.currentlyFocusedInput()
      );

      /**
       * we need to make sure that we only remove the target
       * if the target belong to the current component and
       * if the currently focused input is not in the targets set.
       */
      const shouldRemoveCurrentTarget =
        keyboardState.target === args.nativeEvent.target;
      const shouldIgnoreBlurEvent =
        currentFocusedInput &&
        textInputNodesRef.current.has(currentFocusedInput);

      if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
        animatedKeyboardState.set((state) => ({
          ...state,
          target: undefined,
        }));
      }

      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, animatedKeyboardState, textInputNodesRef]
  );

  //#region effects
  useEffect(() => {
    const componentNode = findNodeHandle(ref.current);
    if (!componentNode) {
      return;
    }

    if (!textInputNodesRef.current.has(componentNode)) {
      textInputNodesRef.current.add(componentNode);
    }

    return () => {
      const componentNode = findNodeHandle(ref.current);
      if (!componentNode) {
        return;
      }

      const keyboardState = animatedKeyboardState.get();
      /**
       * remove the keyboard state target if it belong
       * to the current component.
       */
      if (keyboardState.target === componentNode) {
        animatedKeyboardState.set((state) => ({
          ...state,
          target: undefined,
        }));
      }

      if (textInputNodesRef.current.has(componentNode)) {
        textInputNodesRef.current.delete(componentNode);
      }
    };
  }, [textInputNodesRef, animatedKeyboardState]);
  useImperativeHandle(providedRef, () => ref.current ?? undefined, []);

  return (
    <AppTextInput
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      ref={ref}
      {...props}
    />
  );
});

export default BottomSheetAppTextInput;
