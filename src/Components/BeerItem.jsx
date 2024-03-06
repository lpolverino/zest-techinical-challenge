import {View, Text, TouchableWithoutFeedback} from "react-native"
import {styled} from "nativewind"

const StyledView = styled(View)
const StyledText = styled(Text)

const BeerItem = ({beer, onPressHandler}) => {
  if (!beer || !beer.city || !beer.name || beer.name === '' || beer.city === '') 
    return <Text>Cannot display beer</Text>
  return (
    <TouchableWithoutFeedback onPress={() => onPressHandler()}>
      <StyledView
        className="h-20 bg-white border-transparent rounded-lg my-1 p-3 justify-center align center"
        testID="beer-item">
          <StyledText
            numberOfLines={1}
            className="text-center text-lg font-semibold"
            testID={"name"}>
              {beer.name}
          </StyledText>
          <StyledText testID={"city"}
            className="text-gray-700">
              City: {beer.city}
          </StyledText>
      </StyledView>
    </TouchableWithoutFeedback>
  ) 
}

export default BeerItem
