import React from 'react'
import { StyleSheet, Dimensions  } from 'react-native'

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
        
},
mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},
textLoad:{
    color: "black",
    fontSize: 20,
    fontStyle: "italic"
}
})