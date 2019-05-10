import axios from "axios";
import config from "../config/auth.json";
import AsyncStorage from "@react-native-community/async-storage";

const api = axios.create({
  baseURL: config.baseUrl,
  timeout: 2000
});

// api.interceptors.request.use(request => {
//   const userToken = AsyncStorage.getItem;
// });

export default api;
