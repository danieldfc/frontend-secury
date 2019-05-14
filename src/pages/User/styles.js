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
  margin-bottom: 50px;
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
  justify-content: center;
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

export const Email = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: sans-serif;
  font-weight: bold;
  margin: 35px 0 10px 35px;
  opacity: 0.5;
`;
