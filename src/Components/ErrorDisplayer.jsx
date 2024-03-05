import { Text, View } from "react-native"

const ErrorDisplayer = ({errorMessage}) => {
  return (
    <View>  
      <Text> Something Happend </Text>
      <Text>{errorMessage} </Text>
    </View>
  )
}

export default ErrorDisplayer
