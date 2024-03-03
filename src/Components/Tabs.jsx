import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../Screens/Home"
import Favorites from '../Screens/Favorites'


const Tabs = ({brewerys, updateBrewerys}) => {
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
          {()=><Home brewerys={brewerys} updateBrewerys={updateBrewerys}></Home>}
        </Tab.Screen>
        <Tab.Screen
        name='Favorites'>
          {()=><Favorites></Favorites>}
        </Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs