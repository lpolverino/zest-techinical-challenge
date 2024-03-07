import { fireEvent, render, screen, waitFor, act} from '@testing-library/react-native';
import Page from '../Components/Page';
import utils from '../services/utils';
import { mockData } from "./__mock__/brewerys"

const delay = utils.delay
const fetchingError = "Could't get Brewerys"

const emptyFn = () =>{}

const renderPage = async (brewerys, updateBrewerys, fetchBrewerysApi, updateFIlters, passPage, beerInfoHandler) => {
  await waitFor(async () => render(<Page
      brewerys={brewerys}
      updateBrewerys={updateBrewerys}
      fetchBrewerysApi={fetchBrewerysApi}
      updateFilters={updateFIlters}
      passPage={passPage}
      beerInfoHandler={beerInfoHandler}
  ></Page>))
}

describe("Home Screen Componen test", () =>{
  
  describe("Rendering tests" , () => {    

    it("If no data provided should fetch it", async () => {
      const mockFetchHandler = jest.fn()
      await renderPage([], emptyFn, {getAll:mockFetchHandler}, emptyFn, emptyFn, emptyFn)
     expect(mockFetchHandler).toHaveBeenCalled();
    });

    it("when fetched the right data should call the updateBrewerys", async () => {
      const mockFetchHandler = jest.fn(async () => { return {data:mockData}})
      const mockUpdateHandler = jest.fn()
      await renderPage([], mockUpdateHandler, {getAll:mockFetchHandler}, emptyFn, emptyFn, emptyFn)
      expect(mockUpdateHandler).toHaveBeenCalled();
      expect(mockUpdateHandler.mock.calls[0][0]).toEqual(mockData)
    });

    it("When passed a bad brewerys list should render the empty List text", async () => {
      await renderPage("mockData", emptyFn, {getAll:emptyFn}, emptyFn, emptyFn, emptyFn)
      await waitFor(async () => expect(screen.getByTestId("empty-list")).toBeDefined())
    })
      
    it("when fetching fails should render error component", async () => {   
      const mockFetchHandler = jest.fn((currentPage) => { throw new Error("Dummy Error")})
      await renderPage([], emptyFn, {getAll:mockFetchHandler}, emptyFn, emptyFn, emptyFn);
      expect(screen.getByText(fetchingError)).toBeDefined();
    });

    it("When passed brewerys should renderit all", async () => {

      await renderPage(mockData, emptyFn, emptyFn, emptyFn, emptyFn, emptyFn)

      expect(screen.getByTestId("beer-list")).toBeDefined();
      expect(screen.getAllByTestId("brewery-item").length).toBe(mockData.length)
      
    });

    it("Should display message when there is nothing to see", async () => {
      const mockFetchHandler = jest.fn(async () => { return {data:mockData}})
     
      const { rerender } = await waitFor(async () =>  render(<Page brewerys={[]}
      updateBrewerys={()=>{}} fetchBrewerysApi={{getAll:mockFetchHandler}} updateFilters={emptyFn} beerInfoHandler={emptyFn} passPage={emptyFn}></Page>))
      
      rerender(<Page> </Page>)
      
      await waitFor(async() => expect(screen.getByTestId("empty-list")).toBeDefined())
    });
  });

  describe("Interactivity tests", () => {

    it("when pressing filter button should change the searchoption and call the handler", async ()=>{
      const mockHandler = jest.fn()
      await renderPage(mockData, emptyFn, {getAll:emptyFn}, mockHandler , emptyFn, emptyFn)
    
      await act( async () => fireEvent.press(screen.getByText("CITY")))
      expect(mockHandler).toHaveBeenCalledTimes(2)
      expect(mockHandler.mock.calls[1][0]).toEqual("")
      expect(mockHandler.mock.calls[1][1]).toEqual("city")
      expect(mockHandler.mock.calls[1][2]).toEqual(1)
    })

    it("When search has input should call the correct handler", async () => {
      const mockHandler = jest.fn()

      await renderPage(mockData, emptyFn, {getAll:emptyFn}, mockHandler , emptyFn, emptyFn)

      await act(async () => fireEvent.changeText(screen.queryAllByTestId("name")[0], "brewery1"))

      await act(async () => delay(1000));
      expect(mockHandler).toHaveBeenCalledTimes(2)
      expect(mockHandler.mock.calls[1][0]).toEqual("brewery1")
      expect(mockHandler.mock.calls[1][1]).toEqual("name")
      expect(mockHandler.mock.calls[1][2]).toEqual(1)
    })

    it("When filter handler fails should show error message", async () => {
      const mockHandler = jest.fn(async (filter, searcOption, pageNumber) => {
        if(searcOption ==="city")
          throw new Error("error")
      })
      await renderPage(mockData, emptyFn, {getAll:emptyFn}, mockHandler , emptyFn, emptyFn)
    
      await act( async () => fireEvent.press(screen.getByText("CITY")))

      expect(screen.getByText(fetchingError)).toBeDefined()
      
    })

  })
})