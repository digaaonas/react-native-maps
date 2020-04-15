import React from 'react'
import { View, Text } from 'react-native'

export default function NotGranted(){
    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
        >
            <Text 
            style={{
                color: '#FFF',
                fintSize: 24
            }}>Acesso a localização não permitido :(</Text>
        </View>
    )
}