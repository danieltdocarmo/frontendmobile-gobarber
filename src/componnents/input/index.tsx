import React,{useEffect, useRef, useState} from 'react';
import { TextInputProps} from 'react-native';
import { useField } from '@unform/core';



import {Container, TextInput, Icon} from './styles';


interface InputProps extends TextInputProps{
    name: string;
    icon: string;
}

interface InputValueReference{
    value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
    const {fieldName, registerField, defaultValue = '', error} = useField(name);
    const inputValueRef = useRef<InputValueReference>({value: defaultValue});

    const [isFocused, setIsFocused] = useState<Boolean>(false);
    const [isFilled, setIsFilled] = useState<Boolean>(false);

    const focus = () => {
        setIsFocused(true);
    }

    const onBlur = () => {
        setIsFocused(false);
         !!inputValueRef.current.value ? setIsFilled(true) : setIsFilled(false);
    }

    useEffect(()=>{
            registerField({
                name: fieldName,
                ref: inputValueRef.current,
                path: 'value',
            });
    }, []);

return(
    <Container isFocus={isFocused} isErrored={!!error}>
        <Icon name={icon} size={20} color={`${ isFilled ? '#ff9000' : `#666360`}`}/>
        <TextInput onBlur={onBlur} onFocus={focus}  keyboardAppearance="dark" {...rest} 
        placeholderTextColor='#666360' 
        onChangeText={(value)=>{
            inputValueRef.current.value = value
        }}
        />
    </Container>
);
}

export default Input;