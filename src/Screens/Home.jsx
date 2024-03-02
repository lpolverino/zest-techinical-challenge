import { Text } from "react-native"

const Home = ({brewerys}) => {
  return (
    <>
      <Text>Home</Text>
      <Text>{brewerys[0].name}</Text>
    </>
  )
}

export default Home