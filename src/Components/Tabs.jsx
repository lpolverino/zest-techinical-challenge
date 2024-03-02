import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "../Screens/Home"
import Favorites from '../Screens/Favorites'

const Tab = createBottomTabNavigator()

const Tabs = ({brewerys, updateBrewerys}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'lightblue'
        },
        headerStyle: {
          backgroundColor: 'lightblue'
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          color: 'black'
        }
      }}>
        <Tab.Screen
          name="Home"
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