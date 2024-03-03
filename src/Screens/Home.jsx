import { View, StyleSheet, Text, StatusBar, FlatList} from "react-native"
import { useState,useEffect } from "react"
import apiHandler from "../services/apiHandler"

import Loading from "../Components/Loading"
import Error from "../Components/Error"
import BeerItem from "../Components/BeerItem"
import Search from "../Components/Search"

const Home = ({brewerys, updateBrewerys}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchOption, setSearchOption] = useState("name")

  useEffect(()=>{
    const getBrewerys = async () => {
      try{
        const allBrewerys = await apiHandler.requestAll()
        updateBrewerys(allBrewerys)
      } catch (e){
        console.log(e);
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    getBrewerys()
  },[])

  const renderItem = ({ item }) => {
    return <BeerItem testID="beer-item" beer={item} onPressHandler={()=>{console.log(item.name)}}/>
  }

  const showContent = () =>{
    return (
      <>
        <View>
          <Search
            updateSearch={(element)=>{ console.log(element)}}
            searchOption={searchOption}
            updateOption={setSearchOption}>
          </Search>
        </View>
        {brewerys.length > 0
        ? <FlatList
            testID="beer-list"
            data={brewerys}
            renderItem={renderItem}>
            keyExtractor={item => item.id}
          </FlatList>
        : <Text>No Results</Text>
        }
      </>
    )
  }
 
  return (
    <View style={styles.container}>
      {loading
        ? <Loading></Loading>
        : !error && showContent()
      }
      {error && <Error errorMessage={error}></Error>}
      <StatusBar style="auto" />
    </View>
  );
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