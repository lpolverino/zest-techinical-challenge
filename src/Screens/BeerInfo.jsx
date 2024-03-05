import { useEffect, useState } from "react"
import { Button, Text, View} from "react-native"
import Loading from "../Components/Loading"
import ErrorDisplayer from "../Components/ErrorDisplayer"
import utils from "../services/utils"

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

  const showInfo = (beerInfo) => {
    return (
    <View>
      {beerInfo.name && <Text testID="name">{beerInfo.name}</Text>}
      {beerInfo.brewery_type && <Text testID="brewery_type">{beerInfo.brewery_type}</Text>}
      {beerInfo.street && <Text testID="street">{beerInfo.street}</Text>}
      {beerInfo.city && <Text testID="city">{beerInfo.city}</Text>}
      {beerInfo.state && <Text testID="state">{beerInfo.state}</Text>}
      {beerInfo.country && <Text testID="country">{beerInfo.country}</Text>}
      {beerInfo.postal_code && <Text testID="postal_code">{beerInfo.postal_code}</Text>}
      {beerInfo.phone && <Text testID="phone">{beerInfo.phone}</Text>}
      {beerInfo.website_url && <Text testID="website_url">{beerInfo.website_url}</Text>}
      {beerInfo.name 
        && <Button
              title={isFavorite ? "Remove from Favorites": "Add to Favorites"}
              onPress={async () => {
                favoriteHandler()
              }}>
          </Button>
      }
    </View>
    )
  }

  return (
    <View>
    {error 
      ? <ErrorDisplayer errorMessage={error}></ErrorDisplayer>
      : (loading 
        ? <Loading></Loading>
        : showInfo(fetchedBeer))
    }
    </View>
  )
}

export default BeerInfo
