import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width: WIDTH } = Dimensions.get("window");

export const Container = styled.View`
  flex: 1;
  background: #059;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: sans-serif;
  font-weight: bold;
  margin-bottom: 50px;
  margin-top: 10px;
  opacity: 0.5;
`;

export const Input = styled.TextInput`
  width: WIDTH - 55;
  height: 45px;
  background-color: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  border-radius: 45px;
  margin-right: 25px;
  padding-left: 10px;
`;

export const Button = styled.TouchableOpacity`
  width: WIDTH - 55;
  height: 45px;
  background-color: #432577;
  font-size: 16px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

export const Image = styled.Image`
  width: 120px;
  height: 120px;
`;

export const InputContainer = styled.InputContainer`
  margin-top: 10px;
`;
export const Icon = styled.Icon`
  position: absolute;
  top: 10px;
  left: 37px;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 37px;
`;
