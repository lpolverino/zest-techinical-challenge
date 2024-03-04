import { StyleSheet, View } from "react-native"
import Page from "../Components/Page";
import { useNavigation } from "@react-navigation/native";

const Favorites = ({favorites, updateFavorites, apiHandlers}) => {

  const navigation = useNavigation()

  const propertieIncludes = (search, text) => {
    const textToLowerCase = text.toLowerCase();
    return textToLowerCase.includes(search.toLowerCase())
  }
  const filterBrewerys = (allFavorites,search, type) => {
    return allFavorites.filter(brewery =>
      propertieIncludes(search, brewery[type])
    );
  }
  const updateFilters = async (search, type) => {
    if( type !== "name" && type !== "city") throw new Error("Bad parameters")
    else {
      if( typeof search === 'string') {
        const allFavorites = await apiHandlers.getAll()
        if(search === ''){
          updateFavorites(allFavorites)
        }
        else 
          updateFavorites(filterBrewerys(allFavorites,search,type))
      }
    }   
  }



  return (
    <View style={styles.container}>
      <Page
        brewerys={favorites}
        updateBrewerys={updateFavorites}
        fetchBrewerysApi={apiHandlers}
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