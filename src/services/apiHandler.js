import  {mockData} from "../__test__/__mock__/brewerys";

const apiHandler = () => {

  const backendUrl = "https://api.openbrewerydb.org/v1/breweries"

  const requestToBackend = async () => {
    console.log(`request to ${backendUrl}`);
  }
  
  const requestAll = () => {
    console.log(mockData);
    if(mockData){
      return mockData
    }
  }

  const requestOneByName = () => {

  }

  return {
    requestAll,
    requestOneByName,
  }
}

export default apiHandler()