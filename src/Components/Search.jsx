import { TextInput, View} from "react-native"
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import themes from "../../themes";
import PressableText from "./PressableText";
import StyledText from "./Styled/StyledText";
import StyledView from "./Styled/StyledView";

const Search = ({updateSearch, searchOption, updateOption}) => {
  const [searhValue, setSearchValue] = useState('')

  const handleTextChange = (newText) => {
    setSearchValue(newText)
    updateSearch(newText)
  }

  const debounceSearch = useMemo(() =>{
    return debounce(handleTextChange, 100);
  }, [updateSearch]);

  const toggleOption = () => {
    const newOption = searchOption === "name" ? "city" : "name"
    updateOption(newOption)
  }

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, []);

  const getColorFor = (option) => {
    return searchOption === option ? themes.textColor.red :"white"
  }
  
  return (
    <StyledView className="justify-center my-1">
      <StyledText className="self-center text-2xl my-1 text-white">Search</StyledText>
      <StyledView className="justify-center">
        <View>
          <TextInput
          value={searhValue}
          className="w-4/5 self-center bg-gray-50 block text-gray-700 border rounded py-1 px-3
            leading-tight focus:outline:none focus:shadow-outline"
          placeholder={searchOption}
          onChangeText={(newText) => {
            setSearchValue(newText)
            debounceSearch(newText)
          }}
          testID={searchOption}>
          </TextInput>
          <StyledView className="my-1 flex-row justify-evenly">
            <PressableText
              text="NAME"
              onPress={()=> searchOption==="city" && toggleOption()}
              textClassName="text-xl font-bold"
              textColor={getColorFor("name")}>
            </PressableText>
            <PressableText
              text="CITY"
              onPress={()=>{
                searchOption ==="name" && toggleOption()
              }}
              textClassName={`self-center text-xl font-bold`}
              textColor={getColorFor("city")}>
            </PressableText>
          </StyledView>
        </View>
      </StyledView>
    </StyledView>
  )
}

export default Search
