import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #059;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: #fff;
  margin-bottom: 50px;
  font-family: sans-serif;
`;

export const Input = styled.TextInput`
  width: 300px;
  height: 40px;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  color: #000;
  border-radius: 50px;
`;

export const Button = styled.TouchableOpacity`
  margin: 20px 0;
  background-color: #222;
  width: 300px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;
