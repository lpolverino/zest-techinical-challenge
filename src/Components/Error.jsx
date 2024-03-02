import { Text, View } from "react-native"

const Error = ({errorMessage}) => {
  console.log(errorMessage);

  return (
    <View>  
      <Text> Something Happend </Text>
      <Text>{errorMessage} </Text>
    </View>
  )
}

export default Error