import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native"

const PressableText = ({text, onPress, textClassName, textColor}) => {
  return (
    <View className="self-center">
    <TouchableOpacity className="self-baseline" onPress={()=>onPress()}>
      <Text
        className={textClassName}
        style={{
          color:textColor
        }}
        >{text}</Text>
    </TouchableOpacity>
    </View>
  )
}

export default PressableText