import StyledText from "./Styled/StyledText"

const ContactText = ({text}) =>{
  return (text && <StyledText
    className="text-white text-xl text-left m-1"
    >{text}
  </StyledText>);
}

export default ContactText