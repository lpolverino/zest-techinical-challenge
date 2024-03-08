import { fireEvent, render, screen, act } from '@testing-library/react-native'
import Search from "../Components/Search"
import utils from '../services/utils';

const delay = utils.delay


describe("Search Component tests", () =>{

  const renderSearch = (updateSearchHandler, option, optionChangeHandler) =>{
   render(<Search
            updateSearch={updateSearchHandler}
            searchOption={option}
            searchOptions={utils.filterOptions}
            updateOption={optionChangeHandler}>  
          </Search>)
  }
  
  describe("Render test", () => {

    it("when entered the screen should display search text Input setted in city and the two buttons for toggling the search parameter", () => {
      renderSearch(()=>{}, "name", ()=>{})
      expect(screen.getByText("Search")).toBeDefined();
      expect(screen.getByText("NAME")).toBeDefined();
      expect(screen.getByText("CITY")).toBeDefined();
      expect(screen.getByTestId("name")).toBeDefined();
    });
    
    it("when button is pressed should call the change option handler", async () =>{
      const mockFunction = jest.fn()
      renderSearch(()=>{}, "name", mockFunction)
      await act( async() => fireEvent.press(screen.getByText("CITY")));
      expect(mockFunction).toHaveBeenCalled();
      expect(mockFunction.mock.calls[0][0]).toEqual("city")
    });
  });

  describe("Input test", () => {
    it("The text input should be debounce", async () => {
      const mockHandler = jest.fn();
      renderSearch(mockHandler, "name", ()=>{});
      await act(async () => fireEvent.changeText(screen.getByTestId("name"), "beername1"));
      expect(mockHandler).not.toHaveBeenCalled()
    });

    const renderSearchAndAssertChangeTextSendTheCorrectsArgumentsFor = async (searchOption, argument) => {
      const mockHandler = jest.fn();
      renderSearch(mockHandler, searchOption, ()=>{})
      await act (async() => fireEvent.changeText(screen.getByTestId(searchOption),argument));
      await delay(1000);
      expect(mockHandler).toHaveBeenCalled();
      expect(mockHandler.mock.calls[0][0]).toEqual(argument)
    }

    it("When typing in Name should call the handler with the correct arguments", async () => {
      await renderSearchAndAssertChangeTextSendTheCorrectsArgumentsFor("name", "breweryName1");
    });

    it("When typing in City should call the handler with the correct arguments", async () => {
      await renderSearchAndAssertChangeTextSendTheCorrectsArgumentsFor("city", "cityName1");
    })
  });
});