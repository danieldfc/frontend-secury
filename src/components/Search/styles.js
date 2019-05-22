import styled from "styled-components/native";
import { Platform, Animated } from "react-native";

export const Container = styled.View`
  flex: 1;
  top: ${Platform.select({ ios: 60, android: 40 })};
  width: 100%;
  justify-content: center;
  padding: 20px;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 480px;
  z-index: 5;
`;

export const Card = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 20px;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;
export const CardContent = styled.View`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 13px;
  color: #999;
`;
export const Description = styled.Text`
  font-size: 32px;
  margin-top: 3px;
  color: #333;
`;
export const CardFooter = styled.View`
  padding: 30px;
  background: #eee;
  border-radius: 4px;
`;

export const Annotation = styled.Text`
  font-size: 12px;
  color: #333;
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
