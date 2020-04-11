import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../src/pages/home'
import Maps from '../src/pages/localização'

const AppStack = createStackNavigator()
export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Maps" component={Maps}/>
            </AppStack.Navigator>
        </NavigationContainer>
       
    )
}