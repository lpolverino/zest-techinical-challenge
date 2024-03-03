import { render, screen, waitForElementToBeRemoved,act, waitFor } from "@testing-library/react-native";
import BeerInfo from "../Screens/BeerInfo";
import {mockData} from "./__mock__/brewerys"
import apiHandler from "../services/apiHandler";
import utils from "../services/utils";

const delay = utils.delay
const mockBeer = mockData[0]

jest.mock("../services/apiHandler")

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
    }

    it("render beer when passed as a prop", () => {
      render(<BeerInfo route={{params:{beer:mockBeer}}}> </BeerInfo>)
      assertCorrectInfoIsDisplayed();
    });

    it("undefined values should display with message", () =>{
      render(<BeerInfo route={{params:{beer:{...mockBeer, street:undefined}}}}> </BeerInfo>)
      expect(screen.getByTestId("name")).toBeDefined()
      expect(screen.queryAllByTestId("street")).toHaveLength(0)
    })

    it("when beer not provided should use the route params for fetching the beer info", async() => {
      apiHandler.requestById.mockImplementation(
        async () => {
          return mockBeer
        }
      )
      render(<BeerInfo route={{params:{id:"1234567890"}}}/>)
      await waitForElementToBeRemoved(() => screen.getByText("Loading Beer.."))
      assertCorrectInfoIsDisplayed();
    })

    it("WHen fetch fails should render error message", async () => {
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
    })

    it("WHen both props are unsuficient, should display Error", async () => {
      render(<BeerInfo></BeerInfo>)
      screen.debug();
      await waitFor(() => expect(screen.getByText("Beer not found")).toBeDefined())
  });
});
});