import React from "react";
import { createStackNavigator } from 'react-navigation-stack';

import Login from './../components/login';
import Register from './../components/register';

export const SignedOut = createStackNavigator({
    SignIn: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    SignUp: {
        screen: Register,
        navigationOptions: {
            header: null,
        }
    }
}, {
    initialRouteName: 'SignIn',
});