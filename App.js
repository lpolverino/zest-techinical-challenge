import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Tabs from "./src/Components/Tabs"
import BeerInfo from './src/Screens/BeerInfo';

export default function App() {
  const [brewerys, setBrewerys] = useState([])

  const Stack = createNativeStackNavigator();  

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home'>
            {()=><Tabs brewerys={brewerys} updateBrewerys={setBrewerys}> </Tabs>}
          </Stack.Screen>
          <Stack.Screen name='Info' component={BeerInfo} ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

