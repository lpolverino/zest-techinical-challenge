import { fireEvent, render, screen, waitFor, act } from '@testing-library/react-native'
import Search from "../Components/Search"
import utils from '../services/utils';

const delay = utils.delay


describe("Search Component tests", () =>{

  const renderSearch = (updateSearchHandler, option, optionChangeHandler) =>{
   render(<Search
            updateSearch={updateSearchHandler}
            searchOption={option}
            updateOption={optionChangeHandler}>  
          </Search>)
  }
  
  describe("Render test", () => {
  
    const assertCorrectElementsRendered = async  (inputTestID, buttonText) =>{
      await waitFor(()=> expect(screen.getByTestId(inputTestID)).toBeDefined());
      await waitFor(()=> expect(screen.getByRole("button",{name:buttonText})).toBeDefined());
    }

    it("when entered the screen should display the name search and a button for toggling the search parameter", () => {
      renderSearch(()=>{}, "name", ()=>{})
      expect(screen.getByText("Search By:")).toBeDefined();
      assertCorrectElementsRendered("name", "By City")
    });
    
    it("when button is pressed should call the change option handler", async () =>{
      
      const mockFunction = jest.fn()
      renderSearch(()=>{}, "name", mockFunction)
      await act( async() => fireEvent.press(screen.getByRole("button")));
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

    it("When typing in Name should call the handler with the correct arguments", async () => {
      const mockHandler = jest.fn();
      renderSearch(mockHandler, "name", ()=>{});
      await act(() => fireEvent.changeText(screen.getByTestId("name"), "beername1"));
      await delay(1000)
      expect(mockHandler).toHaveBeenCalled();
      expect(mockHandler.mock.calls[0][0]).toEqual({
        type:"name",
        search:'beername1'
      });
    });

    it("When typing in City should call the handler with the correct arguments", async () => {
      const mockHandler = jest.fn();
      renderSearch(mockHandler, "city", ()=>{});
      await act( async () => fireEvent.changeText(screen.getByTestId("city"),"cityname1"));
      await delay(1000)
      expect(mockHandler).toHaveBeenCalled();
      expect(mockHandler.mock.calls[0][0]).toEqual({
        type:"city",
        search:"cityname1"
      });
    })
  });
});