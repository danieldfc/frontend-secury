import styled from "styled-components/native";
import { Animated } from "react-native";

export const Button = styled.TouchableOpacity`
  background-color: #c54f3d;
  height: 54px;
  width: 300px;
  margin-horizontal: 20px;
  justify-content: center;
  align-items: center;
  padding: 0 20px 0 20px;
  margin: 0;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-weight: bold;
`;

export const Card = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 90px 20px 0;
  max-height: 400px;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`;

export const CardContent = styled.View`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const CardFooter = styled.View`
  padding: 10px;
  background: #222;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

export const CardHeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #666;
`;

export const ProfileScrollView = styled.ScrollView`
  flex: 1;
`;

export const EmailInput = styled.TextInput`
  width: 300px;
  height: 54px;
  border: 1px solid #059;
  border-radius: 20px;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const PasswordInput = styled.TextInput`
  width: 300px;
  height: 54px;
  border: 1px solid #059;
  border-radius: 20px;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const ButtonUpdate = styled.TouchableOpacity`
  width: 300px;
  border: 1px solid #059;
  border-radius: 10px;
  padding: 15px;
  justify-content: center;
  align-items: center;
`;

export const ButtonUpdateText = styled.Text`
  color: #059;
  font-size: 14px;
`;

export const Container = styled.View`
  flex: 1;
  background: #059;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ContainerProfile = styled.View`
  flex: 1;
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ContainerMapa = styled.View`
  flex: 1;
  background: #059;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0;
  margin: 0;
  top: 0;
  bottom: 0;
  background: #aaa;
  z-index: 5;
`;

export const Description = styled.TextInput`
  font-size: 18px;
  margin-top: 3px;
  color: #333;
  justify-content: center;
  border: 1px solid #059;
  border-radius: 20px;
  elevation: 1;
  background: #fff;
  padding: 10px;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 37px;
`;

export const Image = styled.Image`
  width: 120px;
  height: 120px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

export const InputContainer = styled.View`
  margin-top: 10px;
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
  color: rgba(255, 255, 255, 0.7);
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin: 20px 0;
`;

export const TitleProfile = styled.Text`
  font-size: 18px;
  color: #059;
  font-weight: bold;
  margin: 60px 0;
`;

export const TitleTask = styled.TextInput`
  font-size: 18px;
  margin: 0 0 5px;
  padding: 10px;
  color: #333;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 20px;
  background: #fff;
`;

export const TitleTaskDesc = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #999;
  margin-left: 10px;
`;

export const ButtonExit = styled.TouchableOpacity`
  width: 300px;
  border: 1px solid #f00;
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonExitText = styled.Text`
  color: #f00;
  font-size: 14px;
`;
