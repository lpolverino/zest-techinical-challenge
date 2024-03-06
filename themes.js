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
    bgColor:"bg-gray-100",
    errorSize: 70,
    activityIndicatorColor:pallete.red,
  },
  searchSwitch:{
    trackColor:"#767577",
    thumbColor:pallete.oragne,
  },
  textColor:{
    red:pallete.red
  },
  cardsConteiner:{
    bgColor:"bg-gray-[#9CA3AF]",
  },
  card:{
    bgColor:"bg-white",
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
  }

}

export default themes 