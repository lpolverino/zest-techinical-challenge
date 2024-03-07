import ContactText from "./ContactText"
import { View } from "react-native"
import StyledView from "./Styled/StyledView"

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