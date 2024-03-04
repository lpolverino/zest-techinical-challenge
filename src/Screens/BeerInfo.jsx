import { useEffect, useState } from "react"
import { Text, View} from "react-native"
import apiHandler from "../services/apiHandler"
import Loading from "../Components/Loading"
import ErrorDisplayer from "../Components/ErrorDisplayer"

const BeerInfo = ({route})=> {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchedBeer, setFetchedBeer] = useState(null)
  
  useEffect(()=>{
    const getBeer = async () =>{
      try{
        const beerinfo = await apiHandler.requestById(route.params.id)
        setFetchedBeer(beerinfo)        
      }catch(e){
        console.log(e);
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    
    if(!route) return setError("Beer not found")
    
    if(!route.params.beer){
      getBeer()
    } else{
      setFetchedBeer(route.params.beer)
      setLoading(false)
    } 

  }, [])

  const showInfo = (beerInfo) => {
    return (
    <View>
      {beerInfo.name  &&<Text testID="name">{beerInfo.name}</Text>}
      {beerInfo.brewery_type && <Text testID="brewery_type">{beerInfo.brewery_type}</Text>}
      {beerInfo.street && <Text testID="street">{beerInfo.street}</Text>}
      {beerInfo.city && <Text testID="city">{beerInfo.city}</Text>}
      {beerInfo.state && <Text testID="state">{beerInfo.state}</Text>}
      {beerInfo.country && <Text testID="country">{beerInfo.country}</Text>}
      {beerInfo.postal_code && <Text testID="postal_code">{beerInfo.postal_code}</Text>}
      {beerInfo.phone && <Text testID="phone">{beerInfo.phone}</Text>}
      {beerInfo.website_url && <Text testID="website_url">{beerInfo.website_url}</Text>}
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