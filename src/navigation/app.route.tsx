import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { HomePage } from '../pages/home';
import {StyleSheet } from 'react-native';

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => (
    <AppStack.Navigator screenOptions={{headerTintColor: 'white'}}>
        <AppStack.Screen options={{headerStyle: { backgroundColor: '#1a1e9d' }}}  name="Home" component={HomePage}  />
    </AppStack.Navigator>
);  

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#e6900f",
    }
});

export default AppRoutes;