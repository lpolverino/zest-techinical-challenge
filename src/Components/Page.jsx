import { View, StyleSheet, Text, StatusBar, FlatList} from "react-native"
import { useState,useEffect } from "react"
import Loading from "./Loading"
import ErrorDisplayer from "./ErrorDisplayer"
import BeerItem from "./BeerItem"
import Search from "./Search"

const Page = ({
  brewerys,
  updateBrewerys,
  fetchBrewerysApi,
  updateFilters,
  beerInfoHandler,
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchOption, setSearchOption] = useState("name")
  const [filter, setFilter] = useState('')

  if(fetchBrewerysApi.getAll === undefined) {
    console.log({
      brewerys,
      updateBrewerys,
      fetchBrewerysApi,
      updateFilters,
      beerInfoHandler
    });
  }

  useEffect(()=>{
    const getBrewerys = async () => {
      try{
        const allBrewerys = await fetchBrewerysApi.getAll()
        updateBrewerys(allBrewerys)
      } catch (e){
        console.log(e);
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    if (brewerys && brewerys.length === 0) getBrewerys()
    else setLoading(false)
  },[])

  useEffect(()=>{
    updateFilters(filter, searchOption)
  },[filter,searchOption])

  const renderItem = ({ item }) => {
    return <BeerItem
      testID="beer-item"
      beer={item}
      onPressHandler={()=>beerInfoHandler(item)}
    />
  }

  const showContent = () =>{
    return (
      <>
        <View>
          <Search
            updateSearch={(element)=> setFilter(element)}
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
      {error && <ErrorDisplayer errorMessage={error}></ErrorDisplayer>}
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

export default Page
