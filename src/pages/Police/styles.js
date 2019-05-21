import styled from "styled-components/native";

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
  margin-top: 10px;
  opacity: 0.5;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-weight: bold;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

export const Image = styled.Image`
  width: 120px;
  height: 120px;
`;

export const InputContainer = styled.View`
  margin-top: 10px;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 37px;
`;

export const LoggedIn = styled.TouchableOpacity`
  top: 20px;
  justify-content: center;
  align-items: center;
  background-color: #096;
  padding: 10px;
`;

export const LoggedInText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
