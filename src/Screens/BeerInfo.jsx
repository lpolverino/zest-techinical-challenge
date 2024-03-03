import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import apiHandler from "../services/apiHandler"
import Loading from "../Components/Loading"
import ErrorDisplayer from "../Components/ErrorDisplayer"

const BeerInfo = ({route, navigation ,beer}) => {
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fetchedBeer, setFetchedBeer] = useState(null)

  useEffect(()=>{
    const getBeer = async () =>{
      try{
        if(!route) throw new Error("Beer not found")
        const beerinfo = await apiHandler.requestById(route.params.id)
        setFetchedBeer(beerinfo)        
      }catch(e){
        console.log(e);
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    
    if(!beer){
      getBeer()
    } else{
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

  const showContent = () => {
    return beer  
      ? showInfo(beer)
      : showInfo(fetchedBeer)
    }

  return (
    <View>
    {error 
      ? <ErrorDisplayer errorMessage={error}></ErrorDisplayer>
      : (loading 
        ? <Loading></Loading>
        : showContent())
    }
    </View>
  )

}

export default BeerInfo