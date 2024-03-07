import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import deviceStorage from './src/services/deviceStorage';
import apiHandler from './src/services/apiHandler';

import Tabs from "./src/Components/Tabs"
import BreweryInfo from './src/Screens/BreweryInfo';

export default function App() {
  const [brewerys, setBrewerys] = useState([])
  const [favorites, setFavorites] = useState([])

  const Stack = createNativeStackNavigator();  

  const addFavorite = async (newFavorite) => {
    const newFavorites = await deviceStorage.addFavorite(newFavorite) 
    setFavorites(newFavorites)
  }

  const deleteFavorite = async (favoriteId) => {
    const filteredFavorites = await deviceStorage.deleteFavorite(favoriteId)
    setFavorites(filteredFavorites)
  }

  const isInFavorites = async (breweryId) => {
    const findBrewery = await deviceStorage.isInFavorites(breweryId)
    return findBrewery ? true: false
  }

  const getBrewery = (breweryId) => {
    const findBrewery = brewerys.find(brewery => brewery.id === breweryId)
     return findBrewery ?? null
  }

  const fetchApi = {
    getAll: apiHandler.requestAll,
    getAllByName: apiHandler.getAllByName,
    getAllByCity: apiHandler.getAllByCity,
    getOneById: apiHandler.requestById
  }

  const deviceApi = {
    getAll: deviceStorage.getFavorites
  }

  const tabsApi = {
    BreweryDB: fetchApi,
    Device: deviceApi
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home'>
            {()=><Tabs
              brewerys={brewerys}
              updateBrewerys={setBrewerys}
              favorites={favorites}
              updateFavorites={setFavorites}
              tabsApi= {tabsApi}>
            </Tabs>}
          </Stack.Screen>
          <Stack.Screen name='Info'>
            {(props) => <BreweryInfo
              {...props}
              fetchBrewery={tabsApi["BreweryDB"].getOneById}
              isInFavorites={isInFavorites}
              addFavorite={addFavorite}
              deleteFavorite={deleteFavorite}
              getBrewery={getBrewery}>
            </BreweryInfo>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
}

