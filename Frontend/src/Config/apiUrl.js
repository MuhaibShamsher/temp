export const apiUrl = "http://127.0.0.1:8000";
// export const apiUrl = "https://187tjgl0-8000.inc1.devtunnels.ms";
// export const apiUrl = "https://7ac8-202-47-41-36.ngrok-free.app";

export const baseURL = (url) => {
  return `${apiUrl}/${url}`;
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
