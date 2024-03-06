import { Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import themes from "../../themes"
import {styled} from "nativewind"

const StyledView = styled(View)
const StyledText = styled(Text)

const ErrorDisplayer = ({errorMessage}) => {
  return (
    <StyledView className="flex gap-3 m-8 opacity-80">
      <StyledView className="self-center px-4 ">
        <MaterialIcons
          name="error"
          size={themes.app.errorSize}
          color="red">
        </MaterialIcons>
      </StyledView> 
      <StyledText className="self-center text-center text-3xl text-white"> Something Happend </StyledText>
      <StyledText className="self center text-center text-2xl text-white">{errorMessage}</StyledText>
    </StyledView>
  )
}

export default ErrorDisplayer
