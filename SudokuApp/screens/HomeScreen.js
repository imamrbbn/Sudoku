import React, {useState} from 'react'
import { StyleSheet, View, Text, Image, TextInput, Picker } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button  } from 'react-native-elements';
import logo from '../assets/logoapp.gif'
import Constants from 'expo-constants';

export default function Homescreen({navigation}) {
    // const [iseng, setIseng] = useState({})
    const [level, setLevel] = useState('easy')
    const [name, setName] = useState('')

    function handleOnPress() {
        name ? 
        navigation.navigate('Game', {
            level,
            name
        })
        :
        alert('please insert username!')
    }
    return (
        <View style= {styles.container}>
          <Text style={styles.title}>SUDOGKU </Text>
          <Image
            source={logo}
            style={{ width: 250, height: 250}}
          />
            <Input
              style={styles.input}
              onChangeText={name=> setName(name)}
              placeholder="input your username here" />
            <View style={{ marginBottom: 25, marginTop: 25}}>
              <Text style={{color:'white', fontSize:18}}>Select Difficulty:</Text>
              <Picker
                  selectedValue={level}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}>
                  <Picker.Item label="Easy" value="easy" />
                  <Picker.Item label="Medium" value="medium" />
                  <Picker.Item label="Hard" value="hard" />
              </Picker>
            </View>
            <Button onPress={handleOnPress}
              buttonStyle={stylesElement.buttonStart}
              title="Start Game"
            />
        </View>
    )
}
const stylesElement = {
  buttonStart: {
    backgroundColor:'#011627',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 5,
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ec4b6',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: Constants.statusBarHeight
  },
  input : {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
    minHeight: 60,
    fontSize: 25
  },
  picker: { 
    height: 50, 
    width: 150,
    backgroundColor: '#fdfffc',
  },
  title: {
    textAlign: "center",
    fontSize:  40,
    color: 'white',
    fontWeight: 'bold'
  },
});


{/* <TouchableOpacity style={{backgroundColor: '#4299E1', padding: 10}} onPress={handleOnPress}>
<Text style={{color:"white"}}>Start Game</Text>
</TouchableOpacity> */}