import React, { useEffect } from 'react'
import * as Location from 'expo-location'

import Routes from './src/routes'
import NotGranted from './src/pages/notGranted'

import { StatusBar } from 'react-native'

export default function App() {
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {      
      const { status } = await Location.getPermissionsAsync()
      if(status !== 'granted'){
        setErrorMsg('Granted Negate')
        
      }
    })()
  },[])
  
  return (
    <>
      <StatusBar backgroundColor='#262626' barStyle="light-content"/>      

      {errorMsg === 'Granted Negate' ? <NotGranted/> : <Routes/>}
  </>
  )
}
  