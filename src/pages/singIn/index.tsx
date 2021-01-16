import React, { useCallback, useRef } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import Input from '../../componnents/input';
import Button from '../../componnents/button';

import getValidationErrors from '../../utils/getValidationData';
import {useAuth} from '../../hooks/Auth';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

import logo from '../../assets/logo.png';

interface DataForm {
    email: string;
    password: string;
}

const SingIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const { singIn, user } = useAuth();

    const handlerForm = useCallback(async (data: DataForm) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('Digite um email').email('Digite um email valido!'),
                password: Yup.string().required('Digite sua senha'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const credentials = { email: data.email, password: data.password }

            await singIn(credentials);

            console.log(user);

            


        } catch (err) {

            console.error(err)
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

         Alert.alert('Erro na autentificacao', 'Ocorreu um erro ao fazer login, cheque as credencias')
         
        }
    }, []);

    return (
        <>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <KeyboardAvoidingView style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <Container>
                        <Image source={logo} />

                        <View>
                            <Title>Faça seu login</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handlerForm}>
                            <Input keyboardType='email-address' autoCapitalize='none'
                            autoCorrect={false}
                            name="email" icon="mail" placeholder="E-mail" />
                            <Input secureTextEntry name="password"  icon="lock" placeholder="Senha" />

                        </Form>
                        <Button onPress={() => {
                            formRef.current?.submitForm();

                        }}>Entrar</Button>


                        <ForgotPassword>
                            <ForgotPasswordText>
                                Esqueceu a senha?
                </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>

                </KeyboardAvoidingView>

                <CreateAccountButton onPress={() => navigation.navigate('SingUp')}>
                    <Icon name='log-in' size={16} color='#ff9000' />
                    <CreateAccountButtonText>
                        Criar uma conta
                    </CreateAccountButtonText>
                </CreateAccountButton>
            </ScrollView>
        </>
    );
}

export default SingIn;