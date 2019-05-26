import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #059;
  padding: 20px;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const ListItem = styled.View`
  flex: 1;
  max-height: auto;
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
`;

export const TitleList = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const DescriptionList = styled.Text`
  font-size: 18px;
  color: #ccc;
  margin-top: 10px;
`;
