import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  position: relative;
  top: ${Platform.select({ ios: 60, android: 40 })};
  width: 100%;
  padding: 20px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #c54f3d;
  height: 54px;
  margin-horizontal: 20px;
  justify-content: center;
  align-items: center;
  padding: 0 20px 0 20px;
  margin: 0;
`;

export const ButtonText = styled.Text`
  font-size: 16;
  color: #fff;
  font-weight: bold;
`;
