import styled from "styled-components/native";

export const ButtonView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonDelete = styled.TouchableOpacity`
  height: auto;
  flex: 1;
  align-items: center;
  padding: 7px;
  border: 1px solid #f00;
  margin-top: 3px;
  border-radius: 20px;
`;

export const ButtonDeleteText = styled.Text`
  color: #f00;
  font-weight: bold;
  font-size: 15px;
`;

export const ButtonUpdate = styled.TouchableOpacity`
  height: auto;
  flex: 1;
  align-items: center;
  padding: 7px;
  border: 1px solid #059;
  margin-top: 3px;
  border-radius: 20px;
`;

export const ButtonUpdateText = styled.Text`
  color: #059;
  font-weight: bold;
  font-size: 15px;
`;

export const Completed = styled.Text`
  color: black;
`;

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 20px;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const TitleContent = styled.Text`
  color: #333;
  font-size: 20px;
  font-weight: bold;
`;
export const EmailContent = styled.Text`
  color: #666;
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0 5px 0;
`;

export const ListItem = styled.View`
  flex: 1;
  padding: 20px;
  border: 1px solid #059;
  margin-top: 10px;
  border-radius: 20px;
`;
export const ListFound = styled.View`
  flex: 1;
  padding: 20px;
  border: 1px solid #059;
  margin-top: 10px;
  border-radius: 20px;
`;

export const TitleList = styled.TextInput`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  border: 1px solid #059;
  border-radius: 10px;
  padding: 10px;
`;

export const ListText = styled.Text`
  color: #222;
  font-size: 16px;
  font-weight: bold;
`;

export const DescriptionList = styled.TextInput`
  font-size: 16px;
  color: #999;
  margin-top: 10px;
  border: 1px solid #059;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 3px;
`;
export const TitleListFound = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
`;

export const DescriptionListFound = styled.Text`
  font-size: 18px;
  color: #999;
  margin-top: 10px;
`;
