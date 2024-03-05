import {Button, Text, TextInput, View} from "react-native"
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

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
  
  return (
    <View>
      <Text>Search By:</Text>
      <View>
        <TextInput
        value={searhValue}
        placeholder={searchOption}
        onChangeText={(newText) => {
          setSearchValue(newText)
          debounceSearch(newText)
        }}
        testID={searchOption}>
        </TextInput>
      </View>
      <Button
        title={`By ${searchOption === 'name' ? 'City' : 'Name'}`}
        onPress={() => toggleOption()}
      ></Button>
    </View>
  )
}

export default Search