import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import DetailScreen from '../screens/DetailScreen'
import { GlobalScreenOption } from '../constants'

const Stack = createNativeStackNavigator()

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={GlobalScreenOption}>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					// options={{ headerShown: false }}
				/>
				<Stack.Screen name="Detail" component={DetailScreen} />
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	)
}
