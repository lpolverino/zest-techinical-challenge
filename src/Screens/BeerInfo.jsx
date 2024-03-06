import { useEffect, useState } from "react"
import { Pressable, Text, View} from "react-native"
import Loading from "../Components/Loading"
import ErrorDisplayer from "../Components/ErrorDisplayer"
import utils from "../services/utils"
import { styled } from "nativewind"
import { FontAwesome } from "@expo/vector-icons"
import themes from "../../themes"

const StyledText = styled(Text)
const StyledView = styled(View)

const ContactText = ({text}) =>{
  return (text && <StyledText
    className="text-white text-xl text-left m-1"
    >{text}
  </StyledText>);
}

const ContactView = ({contactLabel, contactText, horizontalColor}) => {
  return <StyledView className="my-4">
    <ContactText text={contactLabel}> </ContactText>
    <View style={{
      borderBottomColor: horizontalColor,
      borderBottomWidth:6
    }}></View>
    <ContactText text={contactText}></ContactText>
  </StyledView>
}

const BeerInfo = ({
  route,
  fetchBrewery,
  isInFavorites,
  addFavorite,
  deleteFavorite,
  getBrewery
  }) => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchedBeer, setFetchedBeer] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  
  useEffect(()=>{
    const getBeer = async () =>{
      try{
        const beerinfo = await fetchBrewery(route.params.id)
        setFetchedBeer(beerinfo)        
      }catch(e){
        utils.handleError(e,"Could't get Brewery", setError)
      }
      finally{
        setLoading(false)
      }
    }
    
    if(!route) return setError("Beer not found")
    
    const cachedBrewery = getBrewery(route.params.id)
    if(!cachedBrewery)
      getBeer()
    else
      setFetchedBeer(cachedBrewery)
  }, [])

  useEffect(()=>{
    const assertFavorite = async () =>{
      try{
        const isFavorite = await isInFavorites(fetchedBeer.id)
        setIsFavorite(isFavorite)
      }catch(e){
        utils.handleError(e, "Cannot verify if the brewery is in favorites", setError)
      }finally{
        setLoading(false)
      }
    }
    fetchedBeer && assertFavorite()
  },[fetchedBeer])


  const favoriteHandler = async () => {
    try{
      if(isFavorite)
        await deleteFavorite(fetchedBeer.id)
      else
        await addFavorite({
          id:fetchedBeer.id,
          name:fetchedBeer.name,
          city: fetchedBeer.city,
        })
      }catch(e){
        utils.handleError(e, "There was an error trying to save the Brewery", setError)
      }
      setIsFavorite(prevState => !prevState)
    }
    
    const renderButton = () => {
      return <Pressable 
        className="w-10 h-10"
        onPress={async ()=>favoriteHandler()}>
          {
            isFavorite 
              ?<FontAwesome name="star-o" size={32} color={themes.favStar.color}> </FontAwesome>
              :<FontAwesome name="star" size={32} color={themes.favStar.color}></FontAwesome>
          }
      </Pressable>
    }

    const renderLocation = (brewery) => {
      if (!brewery.street || !brewery.city || !brewery.state || !brewery.country)
        return "cannot get full address"

      return "" + brewery.street + 
            ", " + brewery.city + 
            ", " + brewery.state + 
            ", " + brewery.country + (brewery.postal_code ?` (${brewery.postal_code})`:"")
    }

  const showInfo = (beerInfo) => {
    return (
    <StyledView className="my-5">
      {beerInfo.name && 
        <StyledText testID="name"
          numberOfLines={3}
          className="text-white font-bold text-center my-3 text-2xl">
            {beerInfo.name}
        </StyledText>}
      <StyledView
        className="flex-row justify-around my-5">
        {beerInfo.brewery_type && 
        <StyledText testID="brewery_type"
          className="text-white font-semibold text-xl text-center">
              Type: {beerInfo.brewery_type}</StyledText>
      }
      {beerInfo.name && renderButton()}
      </StyledView>
      <StyledView className="place-items-center w-80 p-5 m-2">
        <ContactView 
          contactLabel="Located In:"
          contactText={renderLocation(beerInfo)}
          horizontalColor={themes.horizontal.first}>
      </ContactView> 
      {beerInfo.phone && <ContactView
        horizontalColor={themes.horizontal.second}
        contactLabel="Phone"
        contactText={beerInfo.phone}>
      </ContactView> }
      {beerInfo.website_url && <ContactView 
        horizontalColor={themes.horizontal.third}
        contactLabel="Website"
        contactText={beerInfo.website_url}>
      </ContactView>}
      </StyledView>
    </StyledView>
    )
  }

  return (
    <StyledView className="flex-1 place-content-center w-full bg-gray-900">
    {error 
      ? <ErrorDisplayer errorMessage={error}></ErrorDisplayer>
      : (loading 
        ? <Loading></Loading>
        : showInfo(fetchedBeer))
    }
    </StyledView>
  )
}

export default BeerInfo
