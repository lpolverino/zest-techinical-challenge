import utils from "./utils";

const apiHandler = () => {

  const backendUrl = "https://api.openbrewerydb.org/v1/breweries"
  const pageOffsets = utils.pageOffset

  const requestToBackend = async (params) => {
    
    const requestUrl = backendUrl + (params?? "" )
    const metaUrl = backendUrl + "/meta" + (params?? "")
    console.log(`request to ${requestUrl}`);
    try{
      const response = await fetch(requestUrl);
      const responseData = await response.json();
      if(!response.ok) {
        throw new Error(`ERROR HANDLING THE REQUEST ${response.status}`)
      }
      const metaResponse = await fetch(metaUrl);
      const metaData = await metaResponse.json();
      if(!metaResponse.ok){
        throw new Error(`ERROR HANDLING THE REQUEST ${response.status}`)
      }

      return {
        data:responseData,
        metaData
      }

    }catch(e){
       console.log(e);
       throw new Error(e.message) 
      }
    }
  
  
  const requestAll = async(page) => {
    const urlparams = "?" + addPage(page)
    const data = await requestToBackend(urlparams)
    return data
  }

  const requestById = (id)=> {
    return id
  }

  const addPage = (page) =>{
    return "page="+ page +"&per_page=" + pageOffsets
  }

  const parseAndRequest = async (searchField,searchValue,page) => {
    const urlparams = "?" + searchField + "=" + searchValue + "&" + addPage(page)
    return requestToBackend(urlparams)
  }

  const getAllByName = async (name,page) => {
    try{
      const brewerys = await parseAndRequest("by_name", utils.parseToUnderscores(name), page)
      return brewerys
    } catch(e){
      throw new Error(e.message)
    }
  }

  const getAllByCity = async (city,page) => {
    try{
     const breweries =  await parseAndRequest("by_city", utils.parseToUnderscores(city), page)
      return breweries
    } catch(e){
      throw new Error(e.message)
    }
  }

  return {
    requestAll,
    requestById,
    getAllByName,
    getAllByCity,
  }
}

export default apiHandler()