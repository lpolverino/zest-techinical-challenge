import { render, screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import Home from '../Screens/Home';
import apiHandler from '../services/apiHandler';

jest.mock("../services/apiHandler")

describe("Home Screen Componen test", () =>{

  describe("Conditional rendering based in the FetchedData status" , () => {
      
    const renderAppAndAssertExpectedText = async (apiResponse , expectedText) => {
      apiHandler.requestAll.mockImplementation(apiResponse)
      render(<Home brewerys={[]} updateBrewerys={()=>{}}></Home>)
      screen.debug()
      await waitForElementToBeRemoved( () => screen.getByText("Loading Beer.."))
      expect(screen.getByText(expectedText)).toBeDefined();
    }
      
    it("when fetched the right data should render the home screen", async () => {
      await renderAppAndAssertExpectedText(
        () => {return [{name:"beer"}]},
        "Home")
      })
      
    it("when fetching fails should render error component", async () => {   
      const errorMessage = "Something bad happend Fetching the request"
      
      function delay(milliseconds){
        return new Promise(resolve => {
          setTimeout(resolve, milliseconds);
        });
      }
      await renderAppAndAssertExpectedText(
      async () => {
        await delay(100)
        throw new Error(errorMessage)
      },
      "Something Happend");
    })
  })
})