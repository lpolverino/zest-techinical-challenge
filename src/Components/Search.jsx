import { Text, TextInput, View} from "react-native"
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import themes from "../../themes";
import PressableText from "./PressableText";

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
    <View className="justify-center">
      <Text className="self-center text-2xl my-1 text-white">Search</Text>
      <View className="justify-center">
        <View className="">
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
          <View className="my-1 flex-row justify-evenly">
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
          </View>
        </View>
      </View>
    </View>
  )
}

export default Search
