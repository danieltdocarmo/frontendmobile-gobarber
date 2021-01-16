import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';


import { Container, Title, BackToLoginButton, BackToLoginButtonText } from './styles';

import Input from '../../componnents/input';
import Button from '../../componnents/button';
import getValidationErrors from '../../utils/getValidationData';
import api from '../../services/api';

import Logo from '../../assets/logo.png';

interface FormProps {
    name: string;
    email: string;
    password: string;
}

const SingUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const handlerForm = useCallback(async (data: FormProps) => {

        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatorio'),
                email: Yup.string().required('Digite um email').email('Digite um email valido!'),
                password: Yup.string().min(6, 'No minimo 6 digitos')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);
           
            Alert.alert('Cadastro realizado com sucesso', 'Você será redirecionado para a página de login');

            navigation.goBack();
            
        } catch (err) {
            if (err instanceof Yup.ValidationError) {

                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                Alert.alert('error', 'Realizar cadastro novamente')
                return
            }
        }
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <Container>

                    <Image source={Logo} />

                    <View>
                        <Title>Faça seu cadastro</Title>
                    </View>

                    <Form ref={formRef} onSubmit={handlerForm}>
                        <Input autoCapitalize='words' keyboardType='default' autoCorrect name='name' icon='user' placeholder='Nome' returnKeyType='next' />
                        <Input autoCapitalize='none' keyboardType='email-address' autoCorrect={false} name='email' icon='mail' placeholder='E-mail' returnKeyType='next' />
                        <Input secureTextEntry name='password' icon='lock' placeholder='Senha' returnKeyType='send' onSubmitEditing={() => {
                            formRef.current?.submitForm();
                        }} />

                    </Form>

                    <Button onPress={() => {
                        formRef.current?.submitForm();
                    }}
                    >Enviar</Button>


                </Container>
            </KeyboardAvoidingView>

            <BackToLoginButton onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' color='#ff9000' size={16} />
                <BackToLoginButtonText>Voltar para Login</BackToLoginButtonText>
            </BackToLoginButton>
        </ScrollView>
    )
}

export default SingUp;