import { render, screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import Home from '../Screens/Home';
import apiHandler from '../services/apiHandler';
import { mockData } from './__mock__/brewerys';
import utils from '../services/utils';

const delay = utils.delay

jest.mock("../services/apiHandler")

describe("Home Screen Componen test", () =>{
  
  describe("Rendering tests" , () => {
    
    const renderAppAndAssertExpectedText = async (apiResponse , expectedText) => {
      apiHandler.requestAll.mockImplementation(apiResponse)
      render(<Home brewerys={[]} updateBrewerys={
        (newBrewerys) => render(<Home brewerys={newBrewerys} updateBrewerys={()=>{}}/>)
      }/>)
      screen.debug()
      await waitForElementToBeRemoved( () => screen.getByText("Loading Beer.."))
      expect(screen.getByText(expectedText)).toBeDefined();
    }
    
    it.todo("If no data provided should fetch it")

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

    it.todo("Always should start in page one")

    it("Should display message when there is nothing to see", async () => {
      await renderAppAndAssertExpectedText(
        ()=>{
          return []
        },
        "No Results"
      )
    })
  });

  describe("Interactivity tests", () => {
    it.todo("When pressing page button should call correct function and go to page one")

    it.todo("When page handler fails should show error message")

    it.todo("when pressing filter button should change the searchoption and call the handler ang start in page one")

    it.todo("When search has input should call the correct handler")

    it.todo("When filter handler fails should show error message")

    it.todo("WHen filter handler has no results show display empty message")

  })
})