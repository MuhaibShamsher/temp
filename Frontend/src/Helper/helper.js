import { POST } from "../axios/axiosFunctions";
import { baseURL } from "../Config/apiUrl";
import { authActions } from "../store/auth/authSlice";

export const scanDataApi = async (scanRange, dispatch) => {
  dispatch && dispatch(authActions.setIsScanning(true));
  const response = await POST(baseURL("scanner/initiate/"), {
    ip_range: scanRange,
  });
  return response;
};
