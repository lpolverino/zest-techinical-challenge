import { StyleSheet, TouchableOpacity, Text, View } from "react-native"
import themes from "../../themes"
import { styled } from "nativewind"

const StyledText = styled(Text)

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
  paginationButtons:{
    justifyContent:'center',
    alignItems:'center',
    width:32,
    height:32,
    borderRadius:20,
    marginHorizontal:4,
    backgroundColor:themes.inaactivePage.bgColor,
    color:'black',
  },
  activeButton:{
    backgroundColor:themes.activePage.bgColor,
    width:40,
    height:40,
    borderRadius:25,
  },
  lastButtons:{
    backgroundColor:themes.inaactivePage.lastPageBgColor
  }
})

export default PaginationButtons
