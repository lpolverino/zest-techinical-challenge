import utils from "./utils";

const apiHandler = () => {

  const backendUrl = "https://api.openbrewerydb.org/v1/breweries"
  const pageOffsets = utils.pageOffset

  const requestToBackend = async (params, meta=true) => {

    const result ={}
    
    const requestUrl = backendUrl + (params?? "" )
    const metaUrl = backendUrl + "/meta" + (params?? "")
    console.log(`request to ${requestUrl}`);
    try{
      const response = await fetch(requestUrl);
      const responseData = await response.json();
      if(!response.ok) {
        throw new Error(`ERROR HANDLING THE REQUEST ${response.status}`)
      }
      result.data = responseData
      if(meta){
        const metaResponse = await fetch(metaUrl);
        const metaData = await metaResponse.json();
        if(!metaResponse.ok){
          throw new Error(`ERROR HANDLING THE REQUEST ${response.status}`)
        }
        result.metaData = metaData
      }

      return result

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

  const requestById = async (id)=> {
    const urlParams = "/"+id
    try{
      const responseData = await requestToBackend(urlParams,false)
      return responseData.data
    }catch(e){
      throw new Error(e.message)
    }
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