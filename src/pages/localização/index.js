import React, { useState, useEffect } from 'react'
import MapView, { Marker, Callout, PROVIDER_GOOGLE  } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'
import * as Location from 'expo-location'

import styles from './style.js'

import { GOOGLE_MAPS_APIKEY } from 'react-native-dotenv'

export default function Maps(){

    const route = useRoute()

    const { coords } = route.params

    const [region, setRegion] = useState({latitude: 0, longitude:0});
    
    useEffect(() => {
        (async () => {
        
        const { coords }  = await Location.getCurrentPositionAsync({})

        const { latitude, longitude} = coords
        
        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        })
        
        })()
    },[])

    return (
        <View style={styles.container}>

        <MapView style={styles.mapStyle}
        provider= {PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        loadingEnabled
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
            <View style={{width: 100, height:80}}>
                <Text style={styles.CalloutTitle}>{coords.tag}</Text>
                <Text style={styles.CalloutText}>{coords.lat}</Text>
                <Text style={styles.CalloutText}>{coords.lon}</Text>
            </View>
            </Callout>
            
        </Marker>
        <MapViewDirections
            origin={{
                latitude: region.latitude,
                longitude: region.longitude
            }}
            destination={{
                latitude: coords.lat,
                longitude: coords.lon
            }}
            apikey= {GOOGLE_MAPS_APIKEY}
            strokeWidth= {3}
            strokeColor= "green"
        />
        </MapView>
        </View>
    );
    }