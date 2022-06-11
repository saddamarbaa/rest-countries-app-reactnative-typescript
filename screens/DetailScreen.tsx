import { useEffect, useLayoutEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BeatLoader } from 'react-spinners'

import { CountryType, RootTabScreenProps } from '../types'

export default function DetailScreen({
	route,
	navigation,
}: RootTabScreenProps<'Detail'>) {
	const [countries, setCountries] = useState<CountryType[]>([])

	const [loading, setLoading] = useState<boolean>(false)

	useLayoutEffect(() => {
		navigation.setOptions({
			title: route?.params?.name || 'Back To Home',
			headerStyle: { backgroundColor: '#FAFAFA' },
			headerTintColor: 'black',
			headerTitleStyle: styles.headerTitleStyle,
			headerTitleAlign: 'center',
			headerTitle: () => (
				<View style={styles.headerTitle}>
					<Text style={styles.headerTitleText}>{route?.params?.name}</Text>
				</View>
			),
		})
	}, [navigation])

	useEffect(() => {
		if (route?.params?.name) {
			setLoading(true)
			fetch(`https://restcountries.com/v3.1/name/${route?.params?.name}`)
				.then((response) => {
					if (response.ok) {
						return response.json()
					} else {
						throw new Error('Something went wrong')
					}
				})
				.then((data) => {
					setLoading(false)
					setCountries(data)
				})
				.catch((error) => {
					setLoading(false)
					console.log('Fetch Error :-S', error)
					setCountries([])
				})
		}
	}, [navigation])

	return (
		<SafeAreaView style={styles.wrapper}>
			{loading ? (
				<View style={styles.loadingContainer}>
					<Text style={styles.loadingText}>Loading... </Text>
					<BeatLoader color="#9B9B9B" />
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.imgContainer}>
						<Image
							source={{ uri: countries[0]?.flags.png }}
							style={styles.card_image}
						/>
					</View>
					<View style={styles.contentWrapper}>
						<View>
							<Text style={styles.name}>{countries[0]?.name?.official}</Text>
						</View>
						<View style={styles.content}>
							<Text style={styles.boldText}>Population:</Text>
							<Text style={styles.text}>{countries[0]?.population}</Text>
						</View>
						<View style={styles.content}>
							<Text style={styles.boldText}>Region:</Text>
							<Text style={styles.text}> {countries[0]?.region}</Text>
						</View>
						<View style={styles.content}>
							<Text style={styles.boldText}>Capital: </Text>
							<Text style={styles.text}> {countries[0]?.capital}</Text>
						</View>
						<View style={styles.content}>
							<Text style={styles.boldText}>languages: </Text>
							{countries[0]?.languages &&
								Object.values(countries[0]?.languages).map(
									(item: any, index) => (
										<Text style={styles.text} key={index}>
											{item}{' '}
										</Text>
									),
								)}
						</View>
						<View style={styles.content}>
							<Text style={styles.boldText}>Borders Currencies: </Text>

							{countries[0]?.borders?.map(
								(item: string, index) =>
									index <= 2 && (
										<Text style={styles.text} key={index}>
											{item}{' '}
										</Text>
									),
							)}
							{!countries[0]?.borders && <Text style={styles.text}> None</Text>}
						</View>
					</View>
				</View>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#FAFAFA',
		paddingTop: 45,
	},
	headerTitle: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerTitleText: {
		color: '#111827',
		marginLeft: 10,
		fontWeight: '700',
		fontSize: 20,
	},
	headerTitleStyle: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'back',
	},
	container: {
		width: '100%',
		minWidth: 350,
		maxWidth: 350,
		backgroundColor: 'white',
		boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
		marginHorizontal: 'auto',
		cursor: 'pointer',
		borderRadius: 5,
	},
	imgContainer: {},
	card_image: {
		width: '100%',
		height: 220,
		overflow: 'hidden',
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	contentWrapper: {
		padding: '1rem',
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginTop: '5px',
	},
	boldText: {
		fontSize: 18,
		marginRight: '10px',
		fontWeight: 'bold',
		color: '#222',
	},
	text: { fontSize: 16, marginRight: '10px' },
	loadingContainer: {
		width: '100%',
		minWidth: 350,
		maxWidth: 350,
		// backgroundColor: 'white',
		boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
		marginHorizontal: 'auto',
		cursor: 'pointer',
		borderRadius: 5,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 50,
	},
	loadingText: {
		fontSize: 17,
		marginRight: '10px',
		fontWeight: 'bold',
		color: '#9B9B9B',
	},
})
