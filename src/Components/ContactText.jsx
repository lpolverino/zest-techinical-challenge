import { Text } from "react-native";
import {styled} from "nativewind"

const StyledText = styled(Text)

const ContactText = ({text}) =>{
  return (text && <StyledText
    className="text-white text-xl text-left m-1"
    >{text}
  </StyledText>);
}

export default ContactText