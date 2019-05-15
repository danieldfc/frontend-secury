import { create } from "apisauce";
import config from "../config/auth.json";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";

const api = create({
  baseURL: config.baseUrl,
  timeout: 2000
});

api.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem("@Security:token");
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
