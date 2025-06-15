// import axios from "axios";
// import { toast } from "react-toastify";
// export const POST = async (url, params) => {
//   try {
//     const response = await axios.post(url, params);
//     return response;
//   } catch (error) {
//     for (let key in error?.response?.data) {
//       return toast.error(error[key][0]);
//     }
//   }
// };
// export const GET = async (url, params) => {
//   try {
//     const response = await axios.get(url, params);
//     return response;
//   } catch (error) {
//     for (let key in error?.response?.data) {
//       return toast.error(error[key][0]);
//     }
//   }
// };

import axios from "axios";
import { toast } from "react-toastify";

let GET = async (url, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.get(url, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};
export { GET };

let POST = async (url, body, accessToken) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.post(url, body, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};
export { POST };

let PATCH = async (url, body, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.patch(url, body, options);
    return res;
  } catch (error) {
    toast.error(error.message, {
      position: "top-center",
    });
  }
};
export { PATCH };

let DELETE = async (url, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.delete(url, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};

let PUT = async (url, body, accessToken) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };
  try {
    const res = await axios.put(url, body, options);
    return res;
  } catch (error) {
    toast.error(error?.message, {
      position: "top-center",
    });
  }
};
export { PUT };

export { DELETE };
