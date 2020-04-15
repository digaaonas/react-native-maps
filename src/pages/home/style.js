import React from 'react'
import Background from '../../assets/background.jpg'
import Constants from 'expo-constants'
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

imageBackground:{
    position: "absolute",
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height + 10
},

menu:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#262626',
    height: Constants.statusBarHeight + 90,
    marginBottom: 10
},

menuText:{
    color: "#FF9900",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10
},

contentSearch:{
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 10
},

input:{
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flex: 2,
    height: 40,
    borderRadius: 50,
    padding: 10,
    marginRight: 20
},

inputPlus:{
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.6)"
},

modalLoad:{
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: Constants.statusBarHeight + 90,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
    
},

modalLoadCircle:{
    width: 40,
    height: 40,
    borderRadius: 50,
    borderBottomWidth: 3,
    borderBottomColor: '#FF9900',
    borderRightWidth: 3,
    borderRightColor: '#FF9900',
    marginTop: 30 
},

modalPlus:{
    position: "absolute",
    top: Constants.statusBarHeight + 100,
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 8,
    backgroundColor: "#262626"
},

modalButtons:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
},

buttonModal:{
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: 20,
    marginHorizontal: 60
},

inputModal:{
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    marginBottom: 15,
    height: 40,
    borderRadius: 50,
    paddingVertical: 10,
    textAlign: "center"
},

content:{
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30,    
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF9900'
},

contentText:{
    color: "#FFF"
}

})