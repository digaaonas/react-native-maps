import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import styles from './style'

export default function Home(){
    const [ locations, setLocations ] = useState([])

    const navigation = useNavigation()

    useEffect(() => {
        setLocations([
            {
                name: 'Local 1',
                lat: -20.45555,
                lon: -43.55555
            },
            {
                name: 'Local 2',
                lat: -22.45555,
                lon: -46.55555
            }
        ])
    },[])

    function navigateMaps(coords){
        navigation.navigate("Maps", {coords})
    }

    return(
        <View style={styles.container}>
            <FlatList
            data={locations}
            renderItem={ ({item: locations}) => (

                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigateMaps({lat: locations.lat, lon: locations.lon})}>
                        <Text>{locations.name}</Text>
                        <Text>{locations.lat}</Text>
                        <Text>{locations.lon}</Text>
                    </TouchableOpacity>
                </View>
            )}
            
            />
        </View>
    )
}