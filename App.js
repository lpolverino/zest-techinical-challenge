import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react';

import Tabs from "./src/Components/Tabs"

export default function App() {
  const [brewerys, setBrewerys] = useState([])

    return (
      <NavigationContainer>
        <Tabs brewerys={brewerys} updateBrewerys={setBrewerys}/>
      </NavigationContainer>
    )
  
}

