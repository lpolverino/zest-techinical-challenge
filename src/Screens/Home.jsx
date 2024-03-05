import { View, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Page from "../Components/Page"

const Home = ({brewerys, updateBrewerys, apiHandlers}) => {
  
  const navigation = useNavigation()

  const filterBrewerys = async (search, type) =>{
    let newBrewerys 
    if (search === ''){
      newBrewerys =  await apiHandlers.getAll(1)
    } else{
      newBrewerys = type === "name"
        ? await apiHandlers.getAllByName(search,1)
        : await apiHandlers.getAllByCity(search,1)
    }
    
    updateBrewerys(newBrewerys.data)
    return newBrewerys.metaData.total
    
  }

  const passPage = async (search, type, pageNumber) => {
    
    let newBrewerys 
    if(search === '')
      newBrewerys =  await apiHandlers.getAll(pageNumber)
    else {
      newBrewerys = type === "name"
        ? apiHandlers.getAllByName(search, pageNumber)
        : apiHandlers.getAllByCity(search, pageNumber)
    }
    updateBrewerys(newBrewerys.data)
    return newBrewerys.metaData.total
  }

  return (
    <View style={styles.container}>
      <Page
      brewerys={brewerys}
      updateBrewerys={updateBrewerys}
      fetchBrewerysApi={apiHandlers}
      updateFilters={filterBrewerys}
      passPage = {passPage}
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