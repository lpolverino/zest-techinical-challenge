import ContactText from "./ContactText"
import { View } from "react-native"
import {styled} from "nativewind"

const StyledView = styled(View)

const ContactView = ({contactLabel, contactText, horizontalColor}) => {
  return <StyledView className="my-4">
    <ContactText text={contactLabel}> </ContactText>
    <View style={{
      borderBottomColor: horizontalColor,
      borderBottomWidth:6
    }}></View>
    <ContactText text={contactText}></ContactText>
  </StyledView>
}

export default ContactView