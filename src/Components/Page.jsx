import { StatusBar, SafeAreaView} from "react-native"
import { useState,useEffect } from "react"
import Loading from "./Loading"
import ErrorDisplayer from "./ErrorDisplayer"
import BreweryItem from "./BreweryItem"
import Search from "./Search"
import utils from "../services/utils"
import { RefreshControl } from "react-native"
import PaginationButtons from "./PaginationButtons"
import StyledText from "./Styled/StyledText"
import StyledView from "./Styled/StyledView"
import StyledFlatList from "./Styled/StyledFlatList"

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
  const [searchOption, setSearchOption] = useState(utils.filterOptions[0])
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false);

  const fetchNewData = async (tryFunction, finallyHanlder) => {
    try{
      setRefreshing(true)
      await tryFunction();
    } catch(e){
      utils.handleError(e, "Could't get Brewerys", setError);
    } finally{
      finallyHanlder && finallyHanlder();
      setRefreshing(false);
    }
  }

  const isValidBrewerys = () => { 
    return brewerys && Array.isArray(brewerys)
  }

  useEffect(()=>{
    if (isValidBrewerys() && brewerys.length === 0) 
      fetchNewData( async ()=>{
        const allBrewerys = await fetchBrewerysApi.getAll(currentPage)
        updateBrewerys(allBrewerys.data)
      }, () => {
        setLoading(false)
      });
    else setLoading(false);
  },[])

  useEffect(()=>{
    updateFilters && fetchNewData(async ()=>{
      const newTotal = await updateFilters(filter, searchOption, 1)
      setCurrentPage(1)
      setLastPage(utils.getLastPage(newTotal))
    });
  },[filter,searchOption])

  useEffect( () => {
    passPage && fetchNewData( async () => {
      await passPage(filter, searchOption, currentPage)
    });
  }, [currentPage])


  const renderItem = ({ item }) => {
    return <BreweryItem
      testID="brewery-item"
      brewery={item}
      onPressHandler={()=>beerInfoHandler(item)}
    />
  }

  const renderEmpty = () => {
    return <StyledText
      testID="empty-list"
      className="text-white text-center text-3xl"
    >No Results</StyledText>
  }

  const handleRefresh = () =>{
    setRefreshing(true)
    setTimeout( ()=> setRefreshing(false),1000)
  }

  const showContent = () =>{
    return (
      <>
      <SafeAreaView className="flex-1 content-center">
        <StyledView className="bg-gray-900">
          <Search
            updateSearch={(element)=> setFilter(element)}
            searchOption={searchOption}
            updateOption={setSearchOption}>
          </Search>
        </StyledView>
          {isValidBrewerys(brewerys) ? 
            <StyledFlatList
              data={brewerys}
              testID="beer-list"
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={renderEmpty}
              windowSize={10}
              className="w-full self-center p-3 bg-gray-900"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
              }>
            </StyledFlatList>
            : renderEmpty()}
          <StyledView
            testID="pages-buttons" 
            className="flex-row justify-center items-center py-2 bg-gray-900">
              <PaginationButtons
                current={currentPage}
                range={2}
                onPressButton={
                  (pageNumber)=>{setCurrentPage(pageNumber)}
                }
                lastPage = {lastPage}>
              </PaginationButtons>
          </StyledView>
      </SafeAreaView>
      </>
    )
  }
 

return (
    <StyledView className={`flex-1 place-content-center w-full bg-gray-900`}>
      {loading
        ? <Loading></Loading>
        : !error && showContent()
      }
      {error && <ErrorDisplayer errorMessage={error}></ErrorDisplayer>}
      <StatusBar style="auto" />
    </StyledView>
  );


}

export default Page
