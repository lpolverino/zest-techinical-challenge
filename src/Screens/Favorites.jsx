import { Text,StyleSheet, View } from "react-native"
import Page from "../Components/Page";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import deviceStorage from "../services/deviceStorage"

const Favorites = () => {
  const [favoritesBrewwerys, setFavoritesBrewerys] = useState([])
  const [filter, setFilter] = useState({type:"name", search:""})

  const navigation = useNavigation()

  const propertieIncludes = (search, text) => {
    const textToLowerCase = text.toLowerCase();
    return textToLowerCase.includes(search.toLowerCase())
  }

  const filterBrewerys = () => {
    return favoritesBrewwerys.filter(brewery =>
      propertieIncludes(filter.search, brewery[filter.type])
    );
  }
  const updateFilters = ({search, type}) => {
    
    if(type !== "name" && type !== "city") {
      throw new Error("Bad request")
    } else{
      if( typeof search === 'string') {
        setFilter({search,type})
      }
    }   
  }
   const deviceApi = {
    getAll: deviceStorage.getFavorites
  }

  return (
    <View style={styles.container}>
      <Text>Favorites</Text>
      <Page
        brewerys={filterBrewerys()}
        updateBrewerys={setFavoritesBrewerys}
        fetchBrewerysApi={deviceApi}
        updateFilters={updateFilters}
        beerInfoHandler={(item)=>navigation.navigate('Info', {id:item.id})}>
      </Page>
    </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Favorites