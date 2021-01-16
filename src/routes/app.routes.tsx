import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/dashboard';


const App = createStackNavigator();


const Routes: React.FC = () => {
    return(
        <App.Navigator 
        screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: `#312e38`}
            }}
        initialRouteName="Dashboard">
            <App.Screen name="Dashboard" component={Dashboard} />
        </App.Navigator>
    );
}

export default Routes;