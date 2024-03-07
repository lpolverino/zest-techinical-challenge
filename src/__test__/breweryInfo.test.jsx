import { render, screen, waitForElementToBeRemoved, waitFor, act, fireEvent } from "@testing-library/react-native";
import { mockData } from "./__mock__/brewerys"
import utils from "../services/utils";
import BreweryInfo from "../Screens/BreweryInfo";

const delay = utils.delay
const mockBeer = mockData[0]

const fetchingError = "Could't get Brewery"
const notFoundError = "Brewery not found"
const findFavoriteStatusError = "Cannot verify if the brewery is in favourites"

const renderLocation = (brewery) => {
  if (!brewery.street || !brewery.city || !brewery.state || !brewery.country)
    return "cannot get full address"
  return "" + brewery.street + 
    ", " + brewery.city + 
    ", " + brewery.state + 
    ", " + brewery.country + 
    (brewery.postal_code ?` (${brewery.postal_code})`:"")
}
  
  describe("BeerInfo screen component Test", () => {
  describe("render tests", () =>{

    const assertCorrectInfoIsDisplayed = (brewery) =>{
      expect(screen.getByText("Type: " + brewery.brewery_type)).toBeDefined();
      expect(screen.getByText(renderLocation(brewery))).toBeDefined();
      expect(screen.getByText(brewery.phone)).toBeDefined();
      expect(screen.getByText(brewery.website_url)).toBeDefined();
    };

    it("When beer is cached should render it", async () => {
      const mockGetBrewery = jest.fn()
      mockGetBrewery.mockReturnValue(mockBeer);
      await waitFor(async () => render(<BreweryInfo
        route={{params:{id:mockBeer.id}}}
        fetchBrewery={()=>{}}
        isInFavorites={()=>{ return true}}
        addFavorite={()=>{}}
        deleteFavorite={()=>{}}
        getBrewery={mockGetBrewery}>
      </BreweryInfo>));
      await waitFor( async () => expect(screen.getByText(mockBeer.name)).toBeDefined());
      expect(mockGetBrewery).toHaveBeenCalled();
      assertCorrectInfoIsDisplayed(mockBeer);
    })

    const renderWithCached = async (returnCache) =>{
      const cachedBrewery = () => { return returnCache}
      await waitFor (async ()=>render(<BreweryInfo
        getBrewery={cachedBrewery}
        isInFavorites={()=>{return true}}
        route={{params:{id:mockBeer.id}}}>  
        </BreweryInfo>
      ));
      await waitFor (async () => expect(screen.getByTestId("name")).toBeDefined());
    }
    
    it("when location is undefined should render correct message", async () =>{
       await renderWithCached( {
          ...mockBeer,
          street:undefined
      });
      expect(screen.queryAllByTestId("location")).toHaveLength(0)
    });

    it("when property that is not a address is undefined should not render it", async () => {
      await renderWithCached({
          ...mockBeer,
          phone:undefined
        }
      )
      expect(screen.queryAllByTestId("phone")).toHaveLength(0);

    })

    it("When beer is not cached should use the route params for fetching the beer info", async() => {
      const mockApiHandler = jest.fn(async () => { return mockBeer});
      await waitFor(async () => render(<BreweryInfo 
        route={{params:{id:mockBeer.id}}}
        getBrewery={()=>{}}
        isInFavorites={()=>true}
        fetchBrewery={mockApiHandler}
        addFavorite={()=>{}}
        deleteFavorite={()=>{}}/>));
      await waitFor(async () => expect(screen.getByTestId("name")).toBeDefined());
      expect(mockApiHandler).toHaveBeenCalled();
      expect(mockApiHandler.mock.calls[0][0]).toEqual(mockBeer.id);
      assertCorrectInfoIsDisplayed(mockBeer);
    });

    it("When fetch fails should render error message", async () => {
      //not black box 

      const mockApiHandler = jest.fn(async () => {
        await delay(100)
        throw new Error(fetchingError)
      })
      
      await waitFor(async () => render(
        <BreweryInfo
         route={{params:{id:"1234567890"}}}
         getBrewery={()=>{}}
         isInFavorites={()=> false}
         addFavorite={()=>{}}
         deleteFavorite={()=>{}}
         fetchBrewery={mockApiHandler}>
        </BreweryInfo>));
      await waitForElementToBeRemoved(() => screen.getByText("Loading Brewerys"))
      expect(mockApiHandler).toHaveBeenCalled();
      expect(mockApiHandler.mock.calls[0][0]).toEqual("1234567890"); 
      await waitFor(async () => expect(screen.getByText(fetchingError)).toBeDefined())
    });

    it("WHen both fetcher are unsuficient, should display Error", async () => {
      await waitFor(async ()=> render(
      <BreweryInfo 
      getBrewery={()=>{}}
      isInFavorites={()=>{}}
      addFavorite={()=>{}}
      deleteFavorite={()=>{}}
      fetchBrewery={()=>{}}>
      </BreweryInfo>));
      await waitFor(() => expect(screen.getByText(notFoundError)).toBeDefined())
    });

    const renderAndAsserCorrectFavIcon = async (isBreweryInFavorites) => {
      await waitFor(async () => render(<BreweryInfo
        route={{params:{id:mockBeer.id}}}
        getBrewery={() => {return mockBeer} }
        isInFavorites={async ()=> { return  isBreweryInFavorites}}
        addFavorite={()=>{}}
        deleteFavorite={()=>{}}
        fetchBrewery={()=>{}}>
        </BreweryInfo>));
      await waitFor(async () => expect(screen.getByText(mockBeer.name)).toBeDefined());
      expect(screen.getByTestId(isBreweryInFavorites ? "remove" :"add")).toBeDefined();
    }

    it("When brewery is in favorites should render the button for removal",async() => {
      await renderAndAsserCorrectFavIcon(true);
    });

    it("When brewery is not in favourites should render the button for adding", async () => {
      await renderAndAsserCorrectFavIcon(false);
    })

    it("When isInFavourites handler fails should render a error Message",async() => {
      await waitFor(async () => render(<BreweryInfo
      route={{params:{id:mockBeer.id}}}
      getBrewery={async ()=>{ return mockBeer}}
      fetchBrewery={()=>{}}
      addFavorite={()=>{}}
      deleteFavorite={()=>{}}
      isInFavorites={async () =>{ throw new Error("Error")}}></BreweryInfo>
      ))
      screen.debug();
      expect(screen.getByText(findFavoriteStatusError)).toBeDefined()
    })
  });
  
  describe("Interactivity tests", () => {

    const renderBreweryInfoWithMockBrewery = async (isBreweryInFavorites, addHandler, deleteHandler ) => {
      await waitFor(async () => render(<BreweryInfo route={{params:{id:mockBeer.id}}}
        isInFavorites={async ()=> {return  isBreweryInFavorites }}
        addFavorite={addHandler}
        deleteFavorite={deleteHandler}
        getBrewery={() => { return mockBeer}}
        fetchBrewery={()=>{}}>
      </BreweryInfo>));
      await waitFor(async () => expect(screen.getByText(mockBeer.name)).toBeDefined());
    }

    const renderAndAssertCorrectBUttonIsPressedByFavoriteStatus = async (favoriteStatus) => {
      
      const mockFunctionFav = jest.fn()
      if (favoriteStatus)
        await renderBreweryInfoWithMockBrewery(favoriteStatus, ()=>{}, mockFunctionFav)
      else
        await renderBreweryInfoWithMockBrewery(favoriteStatus, mockFunctionFav, ()=>{})
      
      await act(async () => fireEvent.press(screen.getByTestId(favoriteStatus ? "remove":"add")))
      expect(mockFunctionFav).toHaveBeenCalled();
      expect(screen.getByTestId(favoriteStatus ? "add":"remove")).toBeDefined();
    }
    
    it("when brewery is in favourites and the button is pressed should call correct function and change Icon", async () => {
      await renderAndAssertCorrectBUttonIsPressedByFavoriteStatus(true)
    });
    
    it("When brewery is not in favourties and the button is pressed should call correct function", async () => {
      await renderAndAssertCorrectBUttonIsPressedByFavoriteStatus(false)
    });
    
    it("When button is pressed two times the button message should be the same", async ()=>{
      await renderAndAssertCorrectBUttonIsPressedByFavoriteStatus(true)
      await act (async () => fireEvent.press(screen.getByTestId("add")));
      expect(screen.getByTestId("remove")).toBeDefined();
    });
    
    it("When button is pressed two times the third press should call the same function as the first time", async () => {
      const mockFunction = jest.fn()
      await renderBreweryInfoWithMockBrewery(true, ()=>{}, mockFunction)
      await act(async () => fireEvent.press(screen.getByTestId("remove")))
      await act(async () => fireEvent.press(screen.getByTestId("add")))
      await act(async () => fireEvent.press(screen.getByTestId("remove")))

      expect(mockFunction).toHaveBeenCalledTimes(2)
    });
    
    it("When buttons press handler fails should render a error", async() => {
      const mockFunction = jest.fn(async () => { throw new Error("Error")}) 
      await renderBreweryInfoWithMockBrewery(true, () =>{}, mockFunction) 
      await act(async () => fireEvent.press(screen.getByTestId("remove")))
      expect(screen.getByText("There was an error trying to save the Brewery")).toBeDefined()
    });
    
  });
});