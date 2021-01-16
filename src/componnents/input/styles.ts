import styled, {css} from 'styled-components/native';

import icon from 'react-native-vector-icons/Feather';

interface ViewProps {
    isFocus: Boolean
    isErrored: Boolean
}

export const Container = styled.View<ViewProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: #232129;
    margin-bottom: 10px;
    border-radius: 10px;

    flex-direction: row;
    align-items: center;

    border-width: 2px;
    
    
    ${(props)=>{
        return !!props.isFocus ? css`border-color: #ff9000` : css`border-color: #232129`
    }}

    ${(props)=> props.isErrored && css`border-color: #c53030`}
     
`;

export const Icon = styled(icon)`
    margin-right: 10px;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-family: 'RobotoSlab-Medium';

`;