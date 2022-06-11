import { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import '@expo/match-media'
import { useMediaQuery } from "react-responsive";

import { useDebounce } from '../hooks/useDebounce'
import { CountryType, RootTabScreenProps } from '../types'
import SearchBar from '../components/SearchBar'
import Country from '../components/Country'
import { BeatLoader } from 'react-spinners'
import SelectRegin from '../components/Select'

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
	const [countries, setData] = useState<CountryType[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [region, setRegion] = useState<string | ''>('')
	// State and setters for ... Search term
	const [searchTerm, setSearchTerm] = useState<string | ''>('')

	// Debounce search term so that it only gives us latest value ...
	// ... if searchTerm has not been updated within last 300ms
	// As a result the API call should only fire once user stops typing
	const debouncedSearchTerm = useDebounce(searchTerm, 300)

	const isTabletOrMobileDevice = useMediaQuery({    
    maxDeviceWidth: 1224,    // alternatively...    query: "(max-device-width: 1224px)"  
  });

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Where in the world?',
			headerStyle: { backgroundColor: '#FAFAFA' },
			headerTintColor: 'black',
			headerTitleStyle: styles.headerTitleStyle,
		})
	}, [navigation])

	useEffect(() => {
		let url = 'https://restcountries.com/v3.1/all'
		if (debouncedSearchTerm) {
			url = `https://restcountries.com/v3.1/name/${debouncedSearchTerm}`
		} else if (region && region !== 'All') {
			url = `https://restcountries.com/v3.1/region/${region}`
		}

		setLoading(true)

		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error('Something went wrong')
				}
			})
			.then((data) => {
				setLoading(false)
				setData(data)
			})
			.catch((error) => {
				setLoading(false)
				console.log('Fetch Error :-S', error)
				setData([])
			})
	}, [region, debouncedSearchTerm]) // Only call effect if debounced search term or region changes

	const myItemSeparator = () => {
		return <View style={{ backgroundColor: 'grey' }} />
	}

	const myListEmpty = () => {
		return (
			<View style={styles.emptyList}>
				{loading && (
					<View style={styles.loadingContainer}>
						<Text style={styles.loadingText}>Loading... </Text>
						<BeatLoader color="#9B9B9B" />
					</View>
				)}
				{!loading && <Text style={styles.item}>No Country found</Text>}
			</View>
		)
	}

	const handleNavigate = (name: string) => {
		if (name) {
			navigation.navigate('Detail', {
				name,
			})
		}
	}



	return (
		<SafeAreaView style={styles.wrapper}>
			<View style={styles.container}>
				<SearchBar value={searchTerm} onChangeText={setSearchTerm} />
				{!isTabletOrMobileDevice && <SelectRegin onChangeText={setRegion} />}
			</View>
			<FlatList
				contentContainerStyle={styles.flatList}
				data={countries}
				renderItem={({ item }) => (
					<Country
						imgUrl={item.flags.png}
						name={item?.name?.official}
						population={item.population}
						region={item.region}
						capital={item.capital}
						handleNavigate={handleNavigate}
					/>
				)}
				ItemSeparatorComponent={myItemSeparator}
				ListEmptyComponent={myListEmpty}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#FAFAFA',
		paddingTop: 35,
	},
	item: {
		padding: 20,
		marginTop: 5,
		fontSize: 15,
		flex: 1,
	},

	flatList: {
		width: '100%',
		marginTop: 25,
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: 'auto',
		maxWidth: 1300,
	},
	emptyList: {
		flex: 1,
		width: '100%',
		minWidth: 350,
		maxWidth: 350,
		backgroundColor: 'transparent',
		boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
		margin: 25,
		cursor: 'pointer',
		textAlign: 'center',
		marginHorizontal: 'auto',
	},
	loadingContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	loadingText: {
		fontSize: 17,
		marginRight: '10px',
		fontWeight: 'bold',
		color: '#9B9B9B',
	},
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
		marginHorizontal: 'auto',
		maxWidth: 1300,
		paddingRight: 20,
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
})
