import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SingIn from '../pages/singIn';
import SingUp from '../pages/singUp';

const Auth = createStackNavigator();


const Routes: React.FC = () => {
    return(
        <Auth.Navigator 
        screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: `#312e38`}
            }}
        initialRouteName="SingIn">
            <Auth.Screen name="SingUp" component={SingUp} />
            <Auth.Screen name="SingIn" component={SingIn} />
        </Auth.Navigator>
    );
}

export default Routes;