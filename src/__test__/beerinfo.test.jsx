import { render, screen, waitForElementToBeRemoved, waitFor, act } from "@testing-library/react-native";
import BeerInfo from "../Screens/BeerInfo";
import {mockData} from "./__mock__/brewerys"
import apiHandler from "../services/apiHandler";
import utils from "../services/utils";

const delay = utils.delay
const mockBeer = mockData[0]

jest.mock("../services/apiHandler")
jest.mock("../services/deviceStorage")

describe("BeerInfo screen component Test", () => {
  describe("render tests", () =>{

    const assertCorrectInfoIsDisplayed = () =>{
      expect(screen.getByText(mockBeer.name)).toBeDefined();
      expect(screen.getByText(mockBeer.brewery_type)).toBeDefined();
      expect(screen.getByText(mockBeer.city)).toBeDefined();
      expect(screen.getByText(mockBeer.state_province)).toBeDefined();
      expect(screen.getByText(mockBeer.postal_code)).toBeDefined();
      expect(screen.getByText(mockBeer.country)).toBeDefined();
      expect(screen.getByText(mockBeer.phone)).toBeDefined();
      expect(screen.getByText(mockBeer.website_url)).toBeDefined();
      expect(screen.getByText(mockBeer.street)).toBeDefined();
    };

    it.todo("When beer is cached should render it")

    it.todo("When cache fails should render message")

    it("undefined values should display with message", async () =>{
      const cachedBrewery = ()=>{
        return {
          ...mockBeer,
          street:undefined
        }
      }
      await waitFor (async ()=>render(<BeerInfo 
        getBrewery={cachedBrewery}
        isInFavorites={()=>{return true}}
        route={{params:{id:mockBeer.id}}}>  
        </BeerInfo>
      ));
      expect(screen.getByTestId("name")).toBeDefined()
      expect(screen.queryAllByTestId("street")).toHaveLength(0)
    });

    it.todo("When beer is not cached should use the route params for fetching the beer info", async() => {
      apiHandler.requestById.mockImplementation(
        async () => {
          return mockBeer
        }
      )
      render(<BeerInfo route={{params:{id:"1234567890"}}}/>)
      await waitForElementToBeRemoved(() => screen.getByText("Loading Beer.."))
      assertCorrectInfoIsDisplayed();
    });

    it.todo("When fetch fails should render error message", async () => {
      const errorMessage = 'Error handling the request'
      apiHandler.requestById.mockImplementation(
        async () => {
          await delay(100)
          throw new Error(errorMessage)
        }
      );
      
      render(<BeerInfo route={{params:{id:"1234567890"}}}></BeerInfo>)
      await waitForElementToBeRemoved(() => screen.getByText("Loading Beer.."))
      await waitFor(() =>  expect(screen.getByText(errorMessage)).toBeDefined())
    });

    it.todo("WHen both fetcher are unsuficient, should display Error", async () => {
      render(<BeerInfo></BeerInfo>)
      await waitFor(() => expect(screen.getByText("Beer not found")).toBeDefined())
    });

    it.todo("When brewery is in favorites should render the button for removal")

    it.todo("When brewery is not in favourites should render the button for adding")
  });
  
  describe("Interactivity tests", () => {
    
    it.todo("when brewery is in favourites and the button is pressed should call correct function")
    
    it.todo("When brewery is in favourites and the button is pressed and dosent get error, should change button message")
    
    it.todo("When brewery is not in favourties and the button is pressed should call correct function")
    
    it.todo("When brewery is not in favourties and the button is pressed should and dosent get error, should change button message")
    
    it.todo("When button is pressed two times the button message should be the same")
    
    it.todo("When button is pressed two times the third press should call the same function as the first time")
    
    it.todo("When buttons press handler fails should render a error")
    
  });
});