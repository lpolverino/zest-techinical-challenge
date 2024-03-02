import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Main from './src/Screens/Home';
import { useEffect, useState } from 'react';
import apiHandler from './src/services/apiHandler';
import Loading from './src/Components/Loading';
import Error from './src/Components/Error';

export default function App() {
  const [brewerys, setBrewerys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const getBrewerys = async () => {
      try{
        const allBrewerys = await apiHandler.requestAll()
        setBrewerys(allBrewerys)
      } catch (e){
        console.log(e);
        setError(e.message)
      }finally{
        setLoading(false)
      }
    }
    getBrewerys()
  },[])

  return (
    <View style={styles.container}>
      {loading
        ? <Loading></Loading>
        : !error && <Main brewerys={brewerys}></Main>
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
