import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native'
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

    const [ messageLoad, setMessageLoad ] = useState('')

    const [ inputLatitude, setInputLatitude ] = useState('')
    const [ inputLongitude, setInputLongitude ] = useState('')

    const [ animantedModal, setAnimatedModal] = useState({
        ModalLoadOpacity: new Animated.Value(0),
        ModalLoadRotate: new Animated.Value(0),
        ModalOpacity: new Animated.Value(0),
        ModalZindex: new Animated.Value(0),
        ModalWidth: new Animated.Value(0),
        ButtonsOpacity: new Animated.Value(0),
        ListOpacity: new Animated.Value(1),
        ListZindex: new Animated.Value(5),
    })

    const navigation = useNavigation()

    useEffect(() => {
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

        setMessageLoad('Cadastrando novo ativo')

        Animated.sequence([
            Animated.timing(animantedModal.ModalLoadOpacity, { toValue: 1, duration: 600 })            
        ]).start()

            try{

                await api.post('ativos', data)

                setTag('')
                setDescription('')
                setInfoadd('')

                Animated.sequence([
                    Animated.timing(animantedModal.ModalLoadOpacity, { toValue: 0, duration: 600 })            
                ]).start()

                closeModal()

            }catch(err){
                Animated.sequence([
                    Animated.timing(animantedModal.ModalLoadOpacity, { toValue: 0, duration: 600 })            
                ]).start()

                console.log(err)
            }
        }

    function navigateMaps(coords){
        navigation.navigate("Maps", {coords})
    }

    async function newAtivoGeoLoc(){
        
        setMessageLoad('Carregando coordenadas')

        Animated.sequence([
            Animated.timing(animantedModal.ListOpacity, { toValue: 0, duration: 300 }),
            Animated.timing(animantedModal.ListZindex, { toValue: 0, duration: 50 }),
            Animated.timing(animantedModal.ModalLoadOpacity, { toValue: 1, duration: 300 }),            
            Animated.timing(animantedModal.ModalLoadRotate, { toValue: 360, duration: 3000 }),            
        ]).start()

        const { coords } = await Location.getCurrentPositionAsync({})
        
        const { latitude, longitude } = coords

        setInputLatitude(latitude)
        setInputLongitude(longitude)

        setLatitude(latitude)
        setLongitude(longitude)

        Animated.sequence([
            Animated.timing(animantedModal.ModalLoadRotate, { toValue: 0, duration: 1000 }),            
            Animated.timing(animantedModal.ModalLoadOpacity, { toValue: 0, duration: 300 }),
            Animated.timing(animantedModal.ModalZindex, { toValue: 5, duration: 50 }),
            Animated.timing(animantedModal.ModalOpacity, { toValue: 1, duration: 300 }),
            Animated.timing(animantedModal.ModalWidth, { toValue: Dimensions.get('screen').width - 60, duration: 300 }),
            Animated.timing(animantedModal.ButtonsOpacity, { toValue: 1, duration: 300 })
        ]).start()
    }

    function closeModal(){
        Animated.sequence([
            Animated.timing(animantedModal.ButtonsOpacity, { toValue: 0, duration: 300 }),
            Animated.timing(animantedModal.ModalWidth, { toValue: 0, duration: 300 }),
            Animated.timing(animantedModal.ModalOpacity, { toValue: 0, duration: 300 }),
            Animated.timing(animantedModal.ModalZindex, { toValue: 0, duration: 50 }),
            Animated.timing(animantedModal.ListZindex, { toValue: 5, duration: 50 }),
            Animated.timing(animantedModal.ListOpacity, { toValue: 1, duration: 300 })
        ]).start()
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

            <Animated.View style={[styles.modalLoad,{
                opacity: animantedModal.ModalLoadOpacity
            }]}>
                <Text style={{color: '#FFF'}}>{messageLoad}</Text>
                <Animated.View style={[styles.modalLoadCircle, {                    
                    transform:[{
                        rotate: animantedModal.ModalLoadRotate
                    }]
                }]}/>
            </Animated.View>

            <Animated.View style={[styles.modalPlus,{
                opacity: animantedModal.ModalOpacity,
                width: animantedModal.ModalWidth,
                zIndex: animantedModal.ModalZindex
            }]}>
                <TextInput style={styles.inputModal} placeholder="TAG" onChangeText={text => setTag(text)}>{tag}</TextInput>
                <TextInput style={styles.inputModal} placeholder="Descrição" onChangeText={text => setDescription(text)}>{description}</TextInput>
                <Text style={styles.inputModal} placeholder="Latitude">Latitude: {inputLatitude}</Text>
                <Text style={styles.inputModal} placeholder="Longitude">Longitude: {inputLongitude}</Text>
                <TextInput style={styles.inputModal} placeholder="Informações adicionais" onChangeText={text => setInfoadd(text)}>{infoadd}</TextInput>
                <Animated.View style={[styles.modalButtons,{
                    opacity: animantedModal.ButtonsOpacity
                }]}>
                    <TouchableOpacity style={styles.buttonModal} onPress={closeModal}><Feather name="x" size={22} color="#FF9900"/></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonModal} onPress={newAtivo}><Feather name="upload" size={22} color="#FF9900"/></TouchableOpacity>
                </Animated.View>                
            </Animated.View>

            <Animated.FlatList
            style={{
                marginBottom: 150,
                opacity: animantedModal.ListOpacity,
                zIndex: animantedModal.ListZindex
            }}
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