import { render, screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import Home from '../Screens/Home';
import apiHandler from '../services/apiHandler';
import { mockData } from './__mock__/brewerys';
import utils from '../services/utils';

const delay = utils.delay

jest.mock("../services/apiHandler")

describe("Home Screen Componen test", () =>{
  
  describe("Conditional rendering based in the FetchedData status" , () => {
    
    const renderAppAndAssertExpectedText = async (apiResponse , expectedText) => {
      apiHandler.requestAll.mockImplementation(apiResponse)
      render(<Home brewerys={[]} updateBrewerys={
        (newBrewerys) => render(<Home brewerys={newBrewerys} updateBrewerys={()=>{}}/>)
      }/>)
      screen.debug()
      await waitForElementToBeRemoved( () => screen.getByText("Loading Beer.."))
      expect(screen.getByText(expectedText)).toBeDefined();
    }
    
    it("when fetched the right data should render the home screen", async () => {
      await renderAppAndAssertExpectedText(
        () => {return [{}]},
        "Search By:")
      });
      
    it("when fetching fails should render error component", async () => {   
      const errorMessage = "Something bad happend Fetching the request"
      await renderAppAndAssertExpectedText(
      async () => {
        await delay(100)
        throw new Error(errorMessage)
      },
      "Something Happend");
    });

    it("When fethed some brewerys should renderit all the beerItems", async () => {
      await renderAppAndAssertExpectedText(
        async () => {
          return mockData
        },
        "Search By:"
      );

      expect(screen.getByTestId("beer-list")).toBeDefined();
      expect(screen.getAllByTestId("beer-item").length).toBe(mockData.length)
      
    });

    it("Should display message when there is nothing to see", async () => {
      await renderAppAndAssertExpectedText(
        ()=>{
          return []
        },
        "No Results"
      )
    })

  })
})