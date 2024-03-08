import Page from "../Components/Page";
import { useNavigation } from "@react-navigation/native";
import StyledView from "../Components/Styled/StyledView";

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
    // for better scalability we can check if the  type is in a array of options
    if( type !== "name" && type !== "city") throw new Error("Bad parameters")
    else {
    if( typeof search === 'string') {
        const allFavorites = await apiHandlers.getAll();
        if(search === ''){
         updateFavorites(allFavorites.data)
        }
        else {
          const filtered = filterBrewerys(allFavorites.data,search,type)
          updateFavorites(filtered)
        }
      }
    }
    return 1   
  }
  
  return (
    <StyledView className="flex-1 place-items-center bg-gray-900">
      <Page
        brewerys={favorites}
        updateBrewerys={updateFavorites}
        fetchBrewerysApi={apiHandlers}
        updateFilters={updateFilters}
        beerInfoHandler={(item)=>navigation.navigate('Info', {id:item.id})}>
      </Page>
    </StyledView>
    )
}

export default Favorites