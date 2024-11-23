import NetInfo from "@react-native-community/netinfo";
import { useState, useEffect } from "react";

type NetworkState = {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string | null;
};
export const useNetworkState = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: null,
    isInternetReachable: null,
    type: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      });
    });

    // Fetch the initial state once
    NetInfo.fetch().then((state) => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
};
