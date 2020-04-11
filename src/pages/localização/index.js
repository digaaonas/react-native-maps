import React, { useState, useEffect } from 'react'
import MapView, { Marker, Callout  } from 'react-native-maps'
import { Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'

import styles from './style.js'


export default function Maps(){
    const route = useRoute()

    const { coords } = route.params

    const [errorMsg, setErrorMsg] = useState('');
    const [region, setRegion] = useState({latitude: 0, longitude:0});

    useEffect(() => {
        (async () => {
        const { status } = await Location.getPermissionsAsync()
        if(status !== 'granted'){
            setErrorMsg('Granted Negate')
            console.log(errorMsg)
            
        }
        const { coords }  = await Location.getCurrentPositionAsync({})

        const { latitude, longitude} = coords
        
        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        })
        
        })()
    })

    return (
        <View style={styles.container}>

        <MapView style={styles.mapStyle}
        initialRegion={{
            latitude: coords.lat,
            longitude: coords.lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }}
        >
        <Marker
        coordinate={{
            latitude: coords.lat,
            longitude: coords.lon
        }}
        >
            {coords.lat !== 0 && coords.lon !== 0 ? <Feather name="map-pin" size={34} color="red"/> : <Text style={styles.textLoad}>Carregando Localização...</Text>}

            <Callout onPress= {() =>{}}>
            <View style={{width: 100, height:50, backgroundColor: "white"}}>
                <Text>{coords.lat}</Text>
                <Text>{coords.lon}</Text>
            </View>
            </Callout>
            
        </Marker>
        </MapView>
        </View>
    );
    }