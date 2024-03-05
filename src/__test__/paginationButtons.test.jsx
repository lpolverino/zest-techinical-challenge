import PaginationButtons from "../Components/PaginationButtons";
import {screen, render, waitFor, fireEvent} from "@testing-library/react-native"

describe("PaginationButton Component test",()=>{
  describe("render tests", ()=>{
    const renderAndAssertButtons= (current, listOfButtons) => {
      render(<PaginationButtons
        current={current}
        range={2}
        lastPage={10}
        onPressButton={()=>{}}>
    </PaginationButtons>)
    screen.debug();
    listOfButtons.forEach((buttonNumber)=>{
     expect(screen.queryAllByText(buttonNumber)).toHaveLength(1) 
    });
    expect(screen.queryAllByTestId("page-button")).toHaveLength(listOfButtons.length)
    }
    it("When Current is 1 should only render the nexts pages and last one", () => {
      
      renderAndAssertButtons(1, ["1","2","3","10"]);
    });
    
    it("When current is the last one should only render the last ones and first",()=>{
      renderAndAssertButtons(10,["1","8","9","10"])
    });

    it("WHen the first page is at least lest pages before that the current range it should render since first", () => {
      renderAndAssertButtons(2, ["1","2","3","4","10"])
    });

    it("When the last page is at least less pages after the current range it should render untile the last", ()=>{
      renderAndAssertButtons(9 ,["1","7","8","9","10"])
    });
    
    it("WHen the firstone and the last one are the same it should not render nothing", ()=>{
      render(<PaginationButtons
      current={1}
      range={2}
      lastPage={1}
      onPressButton={()=>{}}>
      </PaginationButtons>)
      screen.debug()
      expect(screen.queryAllByTestId("page-button")).toHaveLength(0)
    })

  });

  describe("Interactivy tests", () => {
    it("When button is pressed it should call the handler with the correct page number", async()=>{
      const mockHandler = jest.fn();

      render(<PaginationButtons
        current={1}
        lastPage={10}
        range={2}
        onPressButton={mockHandler}
      ></PaginationButtons>)
      await waitFor(async() => expect(screen.getByText("1")).toBeDefined());
      fireEvent.press(screen.getByText("1"))
      expect(mockHandler).toHaveBeenCalled()
      expect(mockHandler.mock.calls[0][0]).toEqual(1)
    });
  })
})