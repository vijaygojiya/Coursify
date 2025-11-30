import React, { forwardRef, memo } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import OptionSheetListItem from "../OptionSheetListItem";
import AppBottomSheetBackdrop from "../AppBottomSheetBackdrop";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onItemSelect: (name: string) => void;
  configList: { name: string }[];
}

const OptionSheet = forwardRef<BottomSheetModal, Props>(
  ({ onItemSelect, configList }, ref) => {
    const { bottom } = useSafeAreaInsets();
    const { dismiss } = useBottomSheetModal();
    return (
      <BottomSheetModal backdropComponent={AppBottomSheetBackdrop} ref={ref}>
        <BottomSheetView style={{ paddingBottom: Math.max(bottom, 12) }}>
          {configList.map((i) => {
            return (
              <OptionSheetListItem
                key={"list" + i.name}
                name={i.name}
                onItemPress={() => {
                  onItemSelect(i.name);
                  dismiss();
                }}
              />
            );
          })}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

OptionSheet.displayName = "OptionSheet";

export default memo(OptionSheet);
