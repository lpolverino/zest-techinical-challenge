import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../Screens/Home"
import Favorites from '../Screens/Favorites'

const Tabs = ({
    brewerys,
    updateBrewerys,
    favorites,
    updateFavorites,
    fetchHandler,
    devideHandler}
    ) => {
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
            apiHandlers={fetchHandler}>
          </Home>
        }
        </Tab.Screen>
        <Tab.Screen
          name='Favorites'>
        {()=><Favorites
            favorites ={favorites} 
            updateFavorites={updateFavorites} 
            apiHandlers={devideHandler}>
          </Favorites>
        }
        </Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs