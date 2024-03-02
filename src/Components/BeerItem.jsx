import {View, Text, TouchableWithoutFeedback} from "react-native"


const BeerItem = ({beer, onPressHandler}) => {
  if (!beer || !beer.city || !beer.name || beer.name === '' || beer.city === '') 
    return <Text>Cannot display beer</Text>
  return (
    <TouchableWithoutFeedback onPress={() => onPressHandler()}>
      <View testID="beer-item">
        <Text testID={"name"}>{beer.name}</Text>
        <Text testID={"city"}>{beer.city}</Text>
      </View>
    </TouchableWithoutFeedback>
  ) 
}

export default BeerItem