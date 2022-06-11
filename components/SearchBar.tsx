import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

type PropsType = {
	value: string
	onChangeText: (value: React.SetStateAction<string>) => void
}
export default function SearchBar({ value, onChangeText }: PropsType) {
	const searchHandler = (enteredText: React.SetStateAction<string>) => {
		onChangeText(enteredText)
	}

	return (
		<View style={styles.inputContainer}>
			<View style={styles.icon}>
				<AntDesign name="search1" size={20} color="#858585" />
			</View>
			<TextInput
				style={styles.input}
				onChangeText={searchHandler}
				value={value}
				placeholder="Search for country"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		maxWidth: 450,
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#e4d4d4',
		alignItems: 'center',
		paddingLeft: 15,
		borderRadius: 8,
		backgroundColor: 'white',
		marginBottom: 15,
	},
	input: {
		flex: 1,
		height: 40,
		padding: 10,
		borderWidth: 0,
		color: '#111827',
		flexDirection: 'row',
		fontWeight: 'bold',
		width: '100%',
		outlineStyle: 'none',
		web: {
			outlineStyle: 'none',
		},
	},
	icon: {
		cursor: 'pointer',
	},
})
