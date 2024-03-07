import { StyleSheet, TouchableOpacity} from "react-native"
import themes from "../../themes"
import StyledText from "./Styled/StyledText"

const PaginationButtons = ({
  current,
  range,
  onPressButton,
  lastPage
}) => {
  const maxButtosLength = 2 * range + 1
  const startPage = Math.max(1, current - Math.floor(maxButtosLength / 2))
  const endPage = Math.min(lastPage, current + range )

  const pages = []

  for(let i = startPage; i<= endPage ; i++){
    pages.push(i)
  }

  if(current > range + 1) pages.unshift(1)

  if(current + range < lastPage) pages.push(lastPage)

  const buttonTextStyle = (pageNumber) => {
   const style = "text-bold " + (pageNumber === current ? "text-xl" : "")
   return style
  } 

  const showBUttons = () =>{
    return (
      pages.map((page) => 
        <TouchableOpacity
          key={page}
          testID="page-button"
          onPress={()=>onPressButton(page)}
          style={[
              styles.paginationButtons,
              page=== 1 || page === lastPage ? styles.lastButtons : null,
              page === current ? styles.activeButton: null
          ]}>
            <StyledText
              className={buttonTextStyle(page)}>
                {page}
            </StyledText>
        </TouchableOpacity>
      )
    )
  }
  return (
    <>
      {startPage !== endPage && showBUttons() }
    </>
  )
}

const styles = StyleSheet.create({
  paginationButtons: themes.paginationButtons,
  activeButton:themes.activeButton,
  lastButtons:themes.lastButtons
})
export default PaginationButtons
