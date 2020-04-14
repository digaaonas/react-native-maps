import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import * as Location from  'expo-location'

import { Feather } from '@expo/vector-icons'

import styles from './style'
import Background from '../../assets/background.jpg'


export default function Home(){
    const [ ativos, setAtivos ] = useState([])

    const [ tag, setTag ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ latitude, setLatitude ] = useState('')
    const [ longitude, setLongitude ] = useState('')
    const [ infoadd, setInfoadd ] = useState('')

    const [ search, setSearch ] = useState('')

    const [ plusModal, setPlusModal ] = useState('')

    const [ inputLatitude, setInputLatitude ] = useState('')
    const [ inputLongitude, setInputLongitude ] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        console.log(search)
        api.get('ativos',{
            params:{
                search
            }
        }).then(response=> {
            setAtivos(response.data)
            
        })

    },[ativos])

    async function newAtivo(){
        const data = {
            tag,
            description,
            latitude,
            longitude,
            infoadd
        }
        
            try{

                await api.post('ativos', data)

                setTag(null)
                setDescription('')
                setInfoadd('')

                setPlusModal('')

            }catch(err){

                console.log(err)
            }
        }

    function navigateMaps(coords){
        navigation.navigate("Maps", {coords})
    }

    async function newAtivoGeoLoc(){
        const { coords } = await Location.getCurrentPositionAsync({})
        
        const { latitude, longitude } = coords

        setInputLatitude(latitude)
        setInputLongitude(longitude)

        setLatitude(latitude)
        setLongitude(longitude)

        setPlusModal("on")
    }

    return(
        <View>
            <Image source={Background} style={styles.imageBackground}/>
            <View style={styles.menu}>
                <Text style={styles.menuText}>Ativos</Text>
            
                <View style={styles.contentSearch}>
                    <TextInput style={styles.input} placeholder="Pesquisar" placeholderTextColor= "rgba(0, 0, 0, 0.4)" onChangeText={text => setSearch(text)}></TextInput>
                    <TouchableOpacity style={styles.inputPlus} onPress={newAtivoGeoLoc}><Feather name="plus" size={18} color="#FF9900"/></TouchableOpacity>
                </View>
            </View>

            <View style={plusModal ? styles.modalPlusOn : styles.modalPlusOf}>
                <TextInput style={styles.inputModal} placeholder="TAG" onChangeText={text => setTag(text)}>{tag}</TextInput>
                <TextInput style={styles.inputModal} placeholder="Descrição" onChangeText={text => setDescription(text)}>{description}</TextInput>
                <Text style={styles.inputModal} placeholder="Latitude">Latitude: {inputLatitude}</Text>
                <Text style={styles.inputModal} placeholder="Longitude">Longitude: {inputLongitude}</Text>
                <TextInput style={styles.inputModal} placeholder="Informações adicionais" onChangeText={text => setInfoadd(text)}>{infoadd}</TextInput>
                <View style={styles.modalButtons}>
                    <TouchableOpacity style={styles.buttonModal} onPress={() => setPlusModal('')}><Feather name="x" size={22} color="#FF9900"/></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonModal} onPress={newAtivo}><Feather name="upload" size={22} color="#FF9900"/></TouchableOpacity>
                </View>                
            </View>

            <FlatList
            style={{marginBottom: 200}}
            data={ativos}
            keyExtractor={ativos.id}
            renderItem={ ({item: ativos}) => (

                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigateMaps({lat: Number(ativos.latitude), lon: Number(ativos.longitude), tag: ativos.tag})}>
                        <Text style={styles.contentText}>{ativos.tag}</Text>
                        <Text style={styles.contentText}>{ativos.description}</Text>
                        <Text style={styles.contentText}>{ativos.infoadd}</Text>
                    </TouchableOpacity>
                </View>
            )}
            
            />
        </View>
    )
}