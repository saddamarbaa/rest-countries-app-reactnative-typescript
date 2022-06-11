import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
	imgUrl: string
	name: string
	population: string | number
	region: string
	capital: string
	handleNavigate: (title: string) => void
}

export default function Country({
	imgUrl,
	name,
	population,
	region,
	capital,
	handleNavigate,
}: Props) {
	return (
		<TouchableOpacity onPress={() => handleNavigate(name)}>
			<View style={styles.container}>
				<View style={styles.imgContainer}>
					<Image source={{ uri: imgUrl }} style={styles.card_image} />
				</View>
				<View style={styles.contentWrapper}>
					<View>
						<Text style={styles.name}>{name}</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.boldText}>Population:</Text>
						<Text style={styles.text}>{population}</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.boldText}>Region:</Text>
						<Text style={styles.text}> {region}</Text>
					</View>
					<View style={styles.content}>
						<Text style={styles.boldText}>Capital: </Text>
						<Text style={styles.text}> {capital}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		minWidth: 350,
		maxWidth: 350,
		backgroundColor: 'white',
		boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
		marginVertical: 25,
		cursor: 'pointer',
		borderRadius: 5,
		marginHorizontal: 'auto',
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
})
