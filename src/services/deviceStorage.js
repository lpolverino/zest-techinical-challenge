import AsyncStorate from "@react-native-async-storage/async-storage"

const namespace = "favoriteBrewerys"

const storage = () =>{
  
  const getFavorites = async () =>{
    const favorties = await AsyncStorate.getItem(`${namespace}:favorites`);
    return favorties ? JSON.parse(favorties) : [];
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

    return newFavorites

  }

  const isInFavorites = async (breweryId) => {
   try {
    const favorites = await getFavorites()
    const filterResults = favorites.filter(brewery => brewery.id === breweryId)
    return filterResults.length > 0 
    }catch (e){
      throw new Error("Error handling the storage")
    }
  }

  const deleteFavorite = async (breweryId) => {
    const currentFavorites = await getFavorites();
    const newFavorites = currentFavorites.filter(brewery => brewery.id !== breweryId)
  
    await saveFavorites(newFavorites)

    return newFavorites
  }

  return {
    getFavorites,
    addFavorite,
    deleteFavorite,
    isInFavorites,
  }
}
export default storage()
