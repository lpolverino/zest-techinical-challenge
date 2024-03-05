import { View, StyleSheet, Text, StatusBar, FlatList} from "react-native"
import { useState,useEffect } from "react"
import Loading from "./Loading"
import ErrorDisplayer from "./ErrorDisplayer"
import BeerItem from "./BeerItem"
import Search from "./Search"
import utils from "../services/utils"

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
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(()=>{
    const getBrewerys = async () => {
      try{
        const allBrewerys = await fetchBrewerysApi.getAll(currentPage)
        updateBrewerys(allBrewerys.data)
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
    const applyFilter = async () => {
      setCurrentPage(1)
      const newtotal = await updateFilters(filter, searchOption)
      setLastPage( utils.getLastPage(newtotal))
    }
    applyFilter()
  },[filter,searchOption])

  const renderItem = ({ item }) => {
    return <BeerItem
      testID="beer-item"
      beer={item}
      onPressHandler={()=>beerInfoHandler(item)}
    />
  }
  const pages = Array.from({length:lastPage}, (value, index) => index+1)

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
        <Text>{currentPage}</Text>
        <Text>{lastPage}</Text>
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
