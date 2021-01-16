import React from 'react';
import {View, Text, Button} from 'react-native';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = ()=>{
    const { singOut } = useAuth();
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
            <Text>Welcome to your dashboard</Text>
            <Button title='Sair' onPress={singOut}> Sair da Aplicacao</Button>
            </View>
    )
}

export default Dashboard;