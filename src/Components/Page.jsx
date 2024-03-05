import { View, StyleSheet, Text, StatusBar, FlatList, SafeAreaView} from "react-native"
import { useState,useEffect } from "react"
import Loading from "./Loading"
import ErrorDisplayer from "./ErrorDisplayer"
import BeerItem from "./BeerItem"
import Search from "./Search"
import utils from "../services/utils"
import { RefreshControl } from "react-native"
import PaginationButtons from "./PaginationButtons"

const Page = ({
  brewerys,
  updateBrewerys,
  fetchBrewerysApi,
  updateFilters,
  beerInfoHandler,
  passPage,
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchOption, setSearchOption] = useState("name")
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    const getBrewerys = async () => {
      try{
        const allBrewerys = await fetchBrewerysApi.getAll(currentPage)
        updateBrewerys(allBrewerys.data)
      } catch (e){
        utils.handleError(e, "Could't get brewerys", setError)
      }finally{
        setLoading(false)
      }
    }
    if (brewerys && brewerys.length === 0) getBrewerys()
    else setLoading(false)
  },[])

  useEffect(()=>{
    const applyFilter = async () => {
      try{
        setCurrentPage(1)
        const newtotal = await updateFilters(filter, searchOption)
        setLastPage(utils.getLastPage(newtotal))
      } catch(e){
        utils.handleError(e, "Could't get brewerys", setError)
      }
    }
    applyFilter()
  },[filter,searchOption])

  useEffect( () => {
    const fetchNewPage = async () => {
      setRefreshing(true)
      try{
        await passPage(filter, searchOption, currentPage)
      }catch(e){
        utils.handleError(e, "Could't get brewerys", setError)
      }finally{
        setRefreshing(false)
      }
    }
    passPage && fetchNewPage();
  }, [currentPage])

  const renderItem = ({ item }) => {
    return <BeerItem
      testID="beer-item"
      beer={item}
      onPressHandler={()=>beerInfoHandler(item)}
    />
  }

  const renderEmpty = () => {
    return <Text>No Results</Text>
  }

  const handleRefresh = () =>{
    setRefreshing(true)
    setTimeout(()=>setRefreshing(false),1000)
  }

  const showContent = () =>{
    return (
      <>
      <SafeAreaView>

        <View>
          <Search
            updateSearch={(element)=> setFilter(element)}
            searchOption={searchOption}
            updateOption={setSearchOption}>
          </Search>
        </View>
        <FlatList
          data={brewerys}
          testID="beer-list"
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmpty}
          windowSize={10}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
          }>
        </FlatList>
        <View style={styles.paginationConteiner}>
          <PaginationButtons
          current={currentPage}
          range={2}
          onPressButton={
            (pageNumber)=>{setCurrentPage(pageNumber)}
          }
          lastPage = {lastPage}>
          </PaginationButtons>
        </View>
      </SafeAreaView>
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
  paginationConteiner:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical: 8,
    backgroundColor:'transparent',
  },
});

export default Page

