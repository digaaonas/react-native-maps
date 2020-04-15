import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

import Routes from './src/routes'
import NotGranted from './src/pages/notGranted'

import { StatusBar } from 'react-native'

export default function App() {
  const [granted, setGranted] = useState(true);

  useEffect(() => {
    (async () => {      
      const { status } = await Location.requestPermissionsAsync()
      if(status !== 'granted'){
        setGranted(false)        
      }
    })()
  },[])
  
  return (
    <>
      <StatusBar backgroundColor='#262626' barStyle="light-content"/>      

      { granted ? <Routes/> : <NotGranted/> }
  </>
  )
}
  