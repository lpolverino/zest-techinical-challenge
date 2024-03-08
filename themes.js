const pallete = {
  yellow:"#efd510",
  red:"#e94822",
  oragne:"#f29101",
  black:"#2c2d34",
  grey:"grey"
}

const themes = {
  tabBar:{
    bgColor:pallete.yellow,
    iconSize:28,
    iconColor:pallete.black,
    iconFocusedColor:pallete.grey,
    activeTextColor:pallete.black,
    inactiveTextColor:pallete.grey,
    textBoldness:"bold",
    textSize:25,
  },
  app:{
    errorSize: 70,
    errorColor:"red",
    activityIndicatorColor:pallete.red,
  },
  textColor:{
    red:pallete.red
  },
  activePage: {
    bgColor:pallete.red
  },
  inaactivePage:{
    bgColor:pallete.oragne,
    lastPageBgColor:pallete.yellow,
  },
  favStar:{
    color:pallete.yellow
  },
  horizontal:{
    first:pallete.red,
    second:pallete.oragne,
    third: pallete.yellow,
  },
  paginationButtons:{
    justifyContent:'center',
    alignItems:'center',
    width:32,
    height:32,
    borderRadius:20,
    marginHorizontal:4,
    backgroundColor:pallete.oragne,
    color:'black',
  },
  activeButton:{
    backgroundColor:pallete.red,
    width:40,
    height:40,
    borderRadius:25,
  },
  lastButtons:{
    backgroundColor:pallete.yellow
  },
  searchButtons:{
    flexDirection:"row",
    justifyContent:"space-evenly",
  }
  
}

export default themes 