import { View, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Page from "../Components/Page"

const Home = ({brewerys, updateBrewerys, apiHandlers}) => {
  
  const navigation = useNavigation()

  const filterBrewerys = async (search, type) =>{
    if (search === '') 
      return await apiHandlers.getAll()
    const newBrewwerys = type === "name"
      ? apiHandlers.getAllByName(search)
      : apiHandlers.getAllByCity(search)
    
    updateBrewerys(newBrewwerys)
  }

  return (
    <View style={styles.container}>
      <Page
      brewerys={brewerys}
      updateBrewerys={updateBrewerys}
      fetchBrewerysApi={apiHandlers}
      updateFilters={filterBrewerys}
      beerInfoHandler={(item)=>navigation.navigate('Info',{id:item.id})}>
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



export default Home