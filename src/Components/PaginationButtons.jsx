import { StyleSheet, TouchableOpacity, Text } from "react-native"

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
  if(current > range + 1){
    pages.unshift(1)
  }

  if(current + range < lastPage) pages.push(lastPage)

  const showBUttons = () =>{
    return (
      pages.map((page) =>
        <TouchableOpacity
        key={page}
        onPress={()=>onPressButton(page)}
        style={[
          styles.paginationButtons,
          page === current ? styles.activeButton: null
        ]}>
          <Text>{page}</Text>
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
    backgroundColor:'grey',
    color:'balck'
  },
  activeButton:{
    backgroundColor:'yellow',
    width:40,
    height:40,
    borderRadius:25,
  },
})

export default PaginationButtons