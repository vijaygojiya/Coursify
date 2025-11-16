import * as React from "react";
import * as Network from "expo-network";
import { onlineManager } from "@tanstack/react-query";

function useOnlineManager() {
  React.useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      const eventSubscription = Network.addNetworkStateListener((state) => {
        setOnline(!!state.isConnected);
      });
      return eventSubscription.remove;
    });
  }, []);
}

export default useOnlineManager;
