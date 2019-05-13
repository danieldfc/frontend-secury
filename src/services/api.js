import { create } from "apisauce";
import config from "../config/auth.json";
import AsyncStorage from "@react-native-community/async-storage";

const api = create({
  baseURL: config.baseUrl,
  timeout: 2000
});

api.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem("@Security:token");
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
  console.log("chegou");
  if (!response.ok) throw response;
});

export default api;
