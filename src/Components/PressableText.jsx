import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import StyledView from "./Styled/StyledView"

const PressableText = ({text, onPress, textClassName, textColor}) => {
  return (
    <StyledView className="self-end my-1">
    <TouchableOpacity onPress={()=>onPress()}>
      <Text
        className={textClassName}
        style={{
          color:textColor
        }}
        >{text}</Text>
    </TouchableOpacity>
    </StyledView>
  )
}

export default PressableText