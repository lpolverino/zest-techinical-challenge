import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../Screens/Home"
import Favorites from '../Screens/Favorites'

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
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'lightblue'
        },
        headerShown:false,
      }}>
        <Tab.Screen
          name="Search"
          options={{

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
          name='Favorites'>
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