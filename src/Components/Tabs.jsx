import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../Screens/Home"
import Favorites from '../Screens/Favorites'
import {AntDesign} from "@expo/vector-icons"
import themes from '../../themes'

const Tabs = ({
    brewerys,
    updateBrewerys,
    favorites,
    updateFavorites,
    tabsApi 
  }) => {
  const Tab = createBottomTabNavigator()
  return (

    <Tab.Navigator
      initialRouteName='Search'
      screenOptions={{
        tabBarActiveTintColor: themes.tabBar.activeTextColor,
        tabBarInactiveTintColor: themes.tabBar.inactiveTextColor,
        tabBarStyle: {
          backgroundColor: themes.tabBar.bgColor
        },
        headerTitleStyle:{
          fontWeight:themes.tabBar.textBoldness,
          fontSize:themes.tabBar.textSize,
          color:themes.tabBar.activeTextColor
        },
        headerShown:false,
      }}>
        <Tab.Screen
          name="Search"
          options={{
            tabBarIcon:({focused}) => (
              <AntDesign
              name="search1"
              size={themes.tabBar.iconSize}
              color={focused ? themes.tabBar.activeTextColor :themes.tabBar.inactiveTextColor}>
              </AntDesign>
            )
          }}
        >
        {() =><Home 
            brewerys={brewerys}
            updateBrewerys={updateBrewerys}
            apiHandlers={tabsApi["BreweryDB"]}>
          </Home>
        }
        </Tab.Screen>
        <Tab.Screen
          name='Favorites'
          options={{
            tabBarIcon:({focused }) => (
              <AntDesign
                name="staro"
                size={themes.tabBar.iconSize}
                color={focused ? themes.tabBar.activeTextColor :themes.tabBar.inactiveTextColor}>
              </AntDesign>
            )
          }}>
        {()=><Favorites
            favorites ={favorites} 
            updateFavorites={updateFavorites} 
            apiHandlers={tabsApi["Device"]}>
          </Favorites>
        }
        </Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs