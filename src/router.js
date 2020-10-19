import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { SignedOut } from './navigation/unauth';
import { AppNavigation } from './navigation/auth';
export const StackApp = (loggedIn = false) => {
    return createAppContainer(createSwitchNavigator({
        SignedIn: {
            screen: AppNavigation
        },
        SignedOut: {
            screen: SignedOut
        }
    }, {
        initialRouteName: loggedIn ? "SignedIn" : "SignedOut"
    }));
};