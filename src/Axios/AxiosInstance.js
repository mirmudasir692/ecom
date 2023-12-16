import axios from "axios";
import {
  RefrehsAccessToken,
  logout,
  restAuthToken,
} from "../features/Auth/AuthSlice";
import BaseEndUrl from "../../config/config";
import store from "../app/store";

const baseURL = BaseEndUrl;
const AxiosInstance = axios.create({
  baseURL,
});

AxiosInstance.interceptors.request.use(async (req) => {
  const authToken = restAuthToken(store.getState());
  if (authToken) {
    req.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return req;
});
AxiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const dispatch = store.dispatch;
      try {
        await dispatch(RefrehsAccessToken());
        const newAuthToken = restAuthToken(store.getState());
        error.config.headers["Authorization"] = `Bearer ${newAuthToken}`;
        return AxiosInstance(error.config);
      } catch (refreshError) {
        store.dispatch(logout())
        console.log("logged out")
        throw refreshError;
      }
    }
    throw error;
  }
);
export default AxiosInstance;
