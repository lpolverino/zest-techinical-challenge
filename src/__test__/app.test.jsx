import { render, screen, waitForElementToBeRemoved } from '@testing-library/react-native';
import App from "../../App"
import apiHandler from '../services/apiHandler';

jest.mock("../services/apiHandler")


describe("Conditional rendering based in the FetchedData status" , () => {
  
  const renderApp = async (apiResponse , expectedText) => {
    apiHandler.requestAll.mockImplementation(apiResponse)
    render(<App></App>)
    screen.debug()
    await waitForElementToBeRemoved( () => screen.getByText("Loading Beer.."))
    expect(screen.getByText(expectedText)).toBeDefined();
  }
  
  it("when fetched the right data should render the home screen", async () => {
    await renderApp(
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
    await renderApp(
      async () => {
        await delay(100)
        throw new Error(errorMessage)
      },
      "Something Happend");
  })

})