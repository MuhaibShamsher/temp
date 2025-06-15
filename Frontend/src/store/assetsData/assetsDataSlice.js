import { createSlice } from "@reduxjs/toolkit";

const assetsDataInitialState = {
  csvFileData: [],
};
const assetsDataSlice = createSlice({
  name: "assetsData",
  initialState: assetsDataInitialState,
  reducers: {
    setCSVfileData(state, actions) {
      // Check if the payload contains a type "connection_established" and ignore it
      if (
        actions.payload.type !== "connection_established" ||
        actions.payload.type !== "connection aborted"
      ) {
        // Extract the new scan data and its IP
        const newScan = actions.payload;
        const newIp = newScan?.addresses?.ipv4;

        // Filter out any existing scan data with the same IP
        const updatedScanData = state.csvFileData?.filter((scan) => {
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
        state.csvFileData = [newScan, ...removedNonIpScanData];
      }
    },
  },
});

export const assetsActions = assetsDataSlice.actions;
export default assetsDataSlice.reducer;
