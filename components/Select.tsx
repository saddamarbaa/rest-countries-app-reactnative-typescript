import React from 'react'
import { StyleSheet, View } from 'react-native'

import SelectDropdown from 'react-native-select-dropdown'

const countries = ['Africa', 'Asia', 'America', 'Europe', 'Oceania']

type PropsType = {
	onChangeText: (value: React.SetStateAction<string>) => void
}
export default function SelectRegin({ onChangeText }: PropsType) {
	return (
		<View style={styles.container}>
			<SelectDropdown
				data={countries}
				onSelect={(selectedItem, index) => {
					onChangeText(selectedItem)
					console.log(selectedItem, index)
				}}
				buttonTextAfterSelection={(selectedItem, index) => {
					// text represented after item is selected
					// if data array is an array of objects then return selectedItem.property to render after item is selected
					return selectedItem
				}}
				rowTextForSelection={(item, index) => {
					// text represented for each item in dropdown
					// if data array is an array of objects then return item.property to represent item in dropdown
					return item
				}}
				rowTextStyle={{
					backgroundColor: 'white',
				}}
				// searchPlaceHolder="Filter by region"
				buttonTextStyle={{ fontWeight: 'bold', color: '#111827' }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		maxWidth: 450,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#e4d4d4',
		alignItems: 'center',
		paddingLeft: 15,
		borderRadius: 8,
		backgroundColor: 'white',
		padding: 10,
		color: '#111827',
		cursor: 'pointer',
	},
})
