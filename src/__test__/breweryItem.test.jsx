import { fireEvent, render, screen } from '@testing-library/react-native';
import BreweryItem from '../Components/BreweryItem';

describe("BreweryItem Component tests", () =>{
  const renderBreweryItem = (brewery, onPressedHandler) => {
    render(<BreweryItem
      brewery={brewery}
      onPressHandler = {onPressedHandler}>
    </BreweryItem>);

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
      expect(screen.getByText("Cannot display brewery")).toBeDefined()
    }

    const renderBreweryAndAssertThatNameAndCityAreNotDisplayed = (breweryItem) => {
      renderBreweryItem(breweryItem)
      assertThatThereIsNoNameAndCity(screen)
    }

    it("should render beer name and city", () => {      
      renderBreweryItem(mockBeer);
      expect(screen.getByTestId("name")).toBeDefined();
      expect(screen.getByTestId("city")).toBeDefined();
    })

    it("should not render error message if the beer is undefined", () =>{
      renderBreweryAndAssertThatNameAndCityAreNotDisplayed({undefined})
    });

    it("should not render if the city is undefined", () => {
      renderBreweryAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, city:undefined});
    })

    it("should not render if the name is undefined", () => {
      renderBreweryAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, name:undefined});
    });

    it("should not render if there is no name but there is a city", () => {
      renderBreweryAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, name:''});
    });

    it("should not render if there is no city but there is the name", () => {
      renderBreweryAndAssertThatNameAndCityAreNotDisplayed({...mockBeer, city:''});
    });

  });

  describe("interactivity tests", () => {
    it("when item pressed should call prop function", async  () =>{
      const mockHandler = jest.fn()

      renderBreweryItem(mockBeer, mockHandler)

      fireEvent.press(screen.getByTestId("brewery-item"));

      expect(mockHandler).toHaveBeenCalled();

    })

    it("When not rendering the beer the handler cannot be called", () => {
      const mockHandler = jest.fn()

      renderBreweryItem(undefined, mockHandler)

      fireEvent.press(screen.getByText("Cannot display brewery"));

      expect(mockHandler).not.toHaveBeenCalled()
    })
  })
});