import  {mockData} from "../__test__/__mock__/brewerys";

const apiHandler = () => {

  const backendUrl = "https://api.openbrewerydb.org/v1/breweries"

  const requestToBackend = async () => {
    console.log(`request to ${backendUrl}`);
  }
  
  const requestAll = () => {
    if(mockData){
      return mockData
    }
  }

  const requestById = (id)=> {
    return id
  }

  const getAllByName = (name) => {
    return name
  }

  const getAllByCity = (city) => {
    return city
  }

  return {
    requestAll,
    requestById,
    getAllByName,
    getAllByCity,
  }
}

export default apiHandler()