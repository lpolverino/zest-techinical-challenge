import {View, Text, TouchableWithoutFeedback} from "react-native"
import {styled} from "nativewind"

const StyledView = styled(View)
const StyledText = styled(Text)

const BreweryItem = ({brewery, onPressHandler}) => {
  if (!brewery || !brewery.city || !brewery.name || brewery.name === '' || brewery.city === '') 
    return <Text>Cannot display brewery</Text>
  return (
    <TouchableWithoutFeedback onPress={() => onPressHandler()}>
      <StyledView
        className="h-20 bg-white border-transparent rounded-lg my-1 p-3 justify-center align center"
        testID="brewery-item">
          <StyledText
            numberOfLines={1}
            className="text-center text-lg font-semibold"
            testID={"name"}>
              {brewery.name}
          </StyledText>
          <StyledText testID={"city"}
            className="text-gray-700">
              City: {brewery.city}
          </StyledText>
      </StyledView>
    </TouchableWithoutFeedback>
  ) 
}

export default BreweryItem
