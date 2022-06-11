/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined
	Modal: undefined
	NotFound: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
	Detail: { name: string }
	Home: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>

export type CountryType = {
	name: {
		official: string
		nativeName?: {
			ara: {
				official: string
			}
		}
	}
	region: string
	population: number
	capital: string
	flags: {
		png: string
	}
	languages?: any
	currencies?: any
	subregion?: string
	borders?: string[]
	capitalInfo: {
		latlng: [number, number]
	}
	maps: {
		googleMaps: string
		openStreetMaps: string
	}
}
