import { View, StyleSheet, Text, StatusBar} from "react-native"
import { useState,useEffect } from "react"
import apiHandler from "../services/apiHandler"

import Loading from "../Components/Loading"
import Error from "../Components/Error"

const Home = ({brewerys, updateBrewerys}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const getBrewerys = async () => {
      try{
        const allBrewerys = await apiHandler.requestAll()
        updateBrewerys(allBrewerys)
      } catch (e){
        console.log(e);
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    getBrewerys()
  },[])

  const showContent = () =>{
    return <Text>Home</Text>
  }
 
    return (
    <View style={styles.container}>
      {loading
        ? <Loading></Loading>
        : !error && showContent()
      }
      {error && <Error errorMessage={error}></Error>}
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default Home