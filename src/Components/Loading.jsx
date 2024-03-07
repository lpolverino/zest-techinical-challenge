import { ActivityIndicator} from "react-native"
import themes from "../../themes";
import { useEffect, useState } from "react";
import StyledText from "./Styled/StyledText";
import StyledView from "./Styled/StyledView";

const Loading = () => {
  const [dots, setdots] = useState("")

  const addDot = () => {
    const newDots = dots.length === 3 ? "" : dots + "."
    setdots(newDots)
  }
  
  useEffect(()=>{
    const itervalId = setInterval(() => {
      addDot()
    }, 1000);
    return () => clearInterval(itervalId)
  },[dots])

  return (
    <StyledView
      className="flex-1 justify-center align-center gap-5">
        <ActivityIndicator
          size={"large"}
          color={themes.app.activityIndicatorColor}
        ></ActivityIndicator>
        <StyledText 
          className="text-center text-2xl text-white">
            Loading Brewerys{dots}
        </StyledText>
    </StyledView>
  );
}

export default Loading
