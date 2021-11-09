import api from "./apiUtils";

const setHeader = (accessToken) => {
  if (accessToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default setHeader;
