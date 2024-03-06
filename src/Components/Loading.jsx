import { ActivityIndicator, Text, View } from "react-native"
import { styled } from "nativewind";
import themes from "../../themes";
import { useEffect, useState } from "react";

const StyledText = styled(Text)
const StyledView = styled(View)

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
