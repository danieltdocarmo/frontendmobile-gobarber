import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/index';

import AppProvider from './hooks/index';

const App: React.FC = ()=>(
    <NavigationContainer>
            <StatusBar barStyle='light-content'/>
            <AppProvider>
                
            <Routes/>
            
            </AppProvider>
    </NavigationContainer>
);

export default App;