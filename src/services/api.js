import { create } from "apisauce";
import { baseUrl } from "../config/auth.json";
import AsyncStorage from "@react-native-community/async-storage";

const api = create({
  baseURL: baseUrl
});

api.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem("@Security:token");
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
