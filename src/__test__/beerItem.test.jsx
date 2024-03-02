import { fireEvent, render, screen } from '@testing-library/react-native';
import BeerItem from '../Components/BeerItem';

describe("beerItem Component tests", () =>{
  const renderBeerItem = (beer, onPressedHandler) => {

    render(<BeerItem
      beer={beer}
      onPressHandler = {onPressedHandler}>
    </BeerItem>);

    screen.debug();
  };
  
  const mockBeer = {
    name:"beer",
    city:"Buenos Aires"
  };

  describe("render tests", () => {
    
    const assertThatThereIsNoNameAndCity = () => {
      expect(screen.queryByTestId("city")).toBeNull();
      expect(screen.queryByTestId("name")).toBeNull();
      expect(screen.getByText("Cannot display beer")).toBeDefined()
    }

    const renderBeerItemAndAssertThatNameAndCityAreNotDisplayed = (beerItem) => {
      renderBeerItem(beerItem)
      assertThatThereIsNoNameAndCity(screen)
    }

    it("should render beer name and city", () => {      
      renderBeerItem(mockBeer);
      expect(screen.getByText(mockBeer.name)).toBeDefined();
      expect(screen.getByText(mockBeer.city)).toBeDefined();
    })

    it("should not render error message if the beer is undefined", () =>{
      renderBeerItemAndAssertThatNameAndCityAreNotDisplayed({undefined})
    });

    it("should not render if the city is undefined", () => {
      renderBeerItemAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, city:undefined});
    })

    it("should not render if the name is undefined", () => {
      renderBeerItemAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, name:undefined});

    });

    it("should not render if there is no name but there is a city", () => {
      renderBeerItemAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, name:''});

    });

    it("should not render if there is no city but there is the name", () => {
      renderBeerItemAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, city:''});

    });

  });

  describe("interactivity tests", () => {
    it("when item pressed should call prop function", async  () =>{
      const mockHandler = jest.fn()

      renderBeerItem(mockBeer, mockHandler)

      fireEvent.press(screen.getByTestId("beer-item"));

      expect(mockHandler).toHaveBeenCalled();

    })

    it.only("When not rendering the beer the handler cannot be called", () => {
      const mockHandler = jest.fn()

      renderBeerItem(undefined, mockHandler)

      fireEvent.press(screen.getByText("Cannot display beer"));

      expect(mockHandler).not.toHaveBeenCalled()
    })
  })
});