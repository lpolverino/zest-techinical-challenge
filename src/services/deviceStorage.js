import AsyncStorate from "@react-native-async-storage/async-storage"
import { mockData } from "../__test__/__mock__/brewerys"

const namespace = "favoriteBrewerys"

const storage = () =>{
  
  const getFavorites = async () =>{
    const favorties = await AsyncStorate.getItem(`${namespace}:favorites`);
    console.log(mockData);
    return favorties ? JSON.parse(favorties) : mockData;
  }
  
  const saveFavorites = async (favorites) => {
    await AsyncStorate.setItem(
      `${namespace}:favorites`,
      JSON.stringify(favorites)
    );
  }

  const addFavorite = async (brewery) => {
    
    const validateProduct = (brewery) => {
      
      const validatePropertie = (breweryPropertie) => {
        return breweryPropertie && typeof breweryPropertie === String
      }

      if(!brewery 
        || validatePropertie(brewery.id)
        || validatePropertie(brewery.name)
        || validatePropertie(brewery.city)
        ) return false
      
      return true
    } 

    if(!validateProduct(brewery)) throw new Error("Invalid brewery")
   
    const currentFavorites = await getFavorites()
    const newFavorites = [...currentFavorites, brewery]
  
    await saveFavorites(newFavorites)
  }


  const deleteFavorite = async (breweryId) => {
    const currentFavorites = await getFavorites();
    const newFavorites = currentFavorites.filter(brewery => brewery.id !== breweryId)
  
    await saveFavorites(newFavorites)
  }

  return {
    getFavorites,
    addFavorite,
    deleteFavorite,
  }
}
export default storage()
