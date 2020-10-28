import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';

import HomeScreen from './screens/HomeScreen.js'
import GameScreen from './screens/GameScreen.js'
import FinishScreen from './screens/FinishScreen.js'
import { Provider } from 'react-redux';
import store from './stores/index.js';

const Stack = createStackNavigator()
// const Tab = createBottomTabNavigator()

export default function App() {
  const [number, setNumber] = useState([]);
  
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Finish" component={FinishScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}


{/* <Stack.Navigator>
<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Game" component={GameScreen} />
<Tab.Screen name="Finish" component={FinishScreen} />
</Stack.Navigator> */}

// export default function App() {
//   const [name, setName] = useState('nama kamu siapa')
//   return (
//     <View style={styles.container}>
//       <Text>Sampah ribet lu!</Text>
//       <Text>Asli Hi</Text>
//       <Text>{name}</Text>
//       <Image
//           source={{
//             uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
//           }}
//           style={{ width: 200, height: 200 }}
//         />
//       <TextInput onChangeText={name=> setName(name)} style={styles.input}></TextInput>
//       <Button onPress={() => alert('Hello')} title="Press me"/>
//       <StatusBar style="auto" /> 
//      </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: Constants.statusBarHeight
//   },
//   input: {
//     width: "90%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'gray '
//   }
// });
