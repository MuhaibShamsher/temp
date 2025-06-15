import { createSlice } from "@reduxjs/toolkit";
import { topologyData } from "../../constants/topologyData";

const authInitialState = {
  isLogin: false,
  user: null,
  isScanning: false,
  isScanSocketConnected: false,
  isAlertSocketConnected: false,
  token: "",
  scanData: [],
  scanRange: "",
  alertsData: [],
  alertsPromptData: [],
  alertsPromptSeen: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, actions) {
      state.isLogin = true;
      state.user = actions.payload;
      state.token = actions.payload.access;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
      state.token = null;
    },
    setIsScanning(state, actions) {
      state.isScanning = actions.payload;
    },
    setScanData(state, actions) {
      // Check if the payload contains a type "connection_established" and ignore it
      if (
        actions.payload.type !== "connection_established" ||
        actions.payload.type !== "connection aborted"
      ) {
        // Extract the new scan data and its IP
        const newScan = actions.payload;
        const newIp = newScan?.addresses?.ipv4;

        // Filter out any existing scan data with the same IP
        const updatedScanData = state.scanData?.filter((scan) => {
          const ip = scan.addresses?.ipv4;
          return ip !== newIp;
        });

        const removedNonIpScanData = updatedScanData?.filter((scan) => {
          if (scan?.addresses?.ipv4 !== null) {
            return scan;
          }
        });
        console.log(newScan, "newScan");

        // Add the new scan data to the updated array
        state.scanData = [newScan, ...removedNonIpScanData];
      }
    },

    updateScanData(state, action) {
      const newScan = action.payload;
      if (!newScan) return;
      const newIp = newScan?.addresses?.ipv4;

      const existingIndex = state.scanData.findIndex(
        (scan) => scan.addresses?.ipv4 === newIp
      );

      if (existingIndex !== -1) {
        state.scanData[existingIndex] = newScan;
      } else {
        state.scanData = [newScan, ...state.scanData];
      }
    },

    setScanRange(state, actions) {
      state.scanRange = actions.payload;
    },
    setAlertsData(state, actions) {
      if (
        actions.payload.type !== "connection_established" &&
        actions.payload.type !== "connection_aborted"
      ) {
        // Extract the new scan data and its IP
        const newScan = actions.payload;
        const newIp = newScan?.ip;

        // Filter out any existing scan data with the same IP
        const updatedScanData = state?.alertsData?.filter((scan) => {
          const ip = scan?.ip;
          return ip !== newIp;
        });

        // Add the new scan data to the updated array
        state.alertsData = [newScan, ...updatedScanData];
        // state.isScanning = false;
      }
    },
    setAlertsPromptData(state, actions) {
      if (
        actions.payload.type !== "connection_established" &&
        actions.payload.type !== "connection_aborted"
      ) {
        // Extract the new scan data and its IP
        const newScan = actions.payload;
        const newIp = newScan?.ip;

        // Check if newScan already exists in alertsData or alertsPromptSeen

        const existsInAlertsPromptSeen = state?.alertsPromptSeen?.some(
          (scan) => scan?.ip === newIp
        );

        if (!existsInAlertsPromptSeen) {
          // Filter out any existing scan data with the same IP
          const updatedPromptData = state?.alertsPromptData?.filter((scan) => {
            const ip = scan?.ip;
            return ip !== newIp;
          });

          // Add the new scan data to the updated array
          state.alertsPromptData = [newScan, ...updatedPromptData];
        }
      }
    },
    setAlertsPromptSeen(state, actions) {
      // Extract the IP to be removed from alertsPromptData
      const removeIp = actions.payload.ip;

      // Filter out the scan data to be removed from alertsPromptData
      const updatedPromptData = state.alertsPromptData?.filter(
        (scan) => scan?.ip !== removeIp
      );

      // Find the scan data to be added to alertsPromptSeen
      const scanToBeAdded = state.alertsPromptData.find(
        (scan) => scan?.ip === removeIp
      );

      // Add the scan data to alertsPromptSeen if it exists
      if (scanToBeAdded) {
        state.alertsPromptSeen = [scanToBeAdded, ...state.alertsPromptSeen];
      }

      // Update alertsPromptData
      state.alertsPromptData = updatedPromptData;
    },

    setIsAlertSocketConnected(state, actions) {
      state.isAlertSocketConnected = actions.payload;
    },
    setIsScanSocketConnnected(state, actions) {
      state.isScanSocketConnected = actions.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
