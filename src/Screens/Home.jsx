import { View, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Page from "../Components/Page"

const Home = ({brewerys, updateBrewerys, apiHandlers}) => {
  
  const navigation = useNavigation()

  const changeBrewerys = async (search, type, page) =>{
    let newBrewerys 
    if (search === ''){
      newBrewerys =  await apiHandlers.getAll(page)
    } else{
      newBrewerys = type === "name"
        ? await apiHandlers.getAllByName(search,page)
        : await apiHandlers.getAllByCity(search,page)
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
      updateFilters={changeBrewerys}
      passPage = {changeBrewerys}
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