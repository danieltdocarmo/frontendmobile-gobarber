import styled from 'styled-components/native';

import { getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1%;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
`;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
    color: #f4ede8;
    margin: 30px 0;
`;

export const BackToLoginButton = styled.TouchableOpacity`
    border-top-width: 1px;
    border-color: #232129;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0 ${5 + getBottomSpace()}px;
`;

export const BackToLoginButtonText = styled.Text`
    color: #ff9000;
    margin-left: 10px;
    font-family: 'RobotoSlab-Medium';
`;