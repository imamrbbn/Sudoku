import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import {newGame} from '../stores/actions/newGame'
// import { TouchableOpacity } from 'react-native-gesture-handler'

import finishGif from '../assets/finish.gif'
export default function FinishScreen({navigation, route}) {
    const params= route.params
    const dispatch = useDispatch()
    
    const {result, name} = params
    const [leaderboard, setLeaderboard] = useState([
        {name:'player1', result:'unsolved'},
        {name:'player1', result:'unsolved'},
        {name:'player1', result:'unsolved'},
        {name:'player1', result:'unsolved'}
    ])

    function handleOnPress() {
        dispatch(newGame())
        navigation.navigate('Home')
    }

    return (
        <View style= {styles.container}>
             <Image
                  source={finishGif}
                  style={{ width: 250, height: 250}}
                />
            <Text style={styles.title}>Horraaaayyy!! </Text>
            {result === 'solved' ? 
                <Text style={styles.text}>Congratulations {name} with {result} game!</Text> :
                <Text style={styles.text}>Sorry... {name} the game is still {result} :(</Text>
            }
            {/* <View >
                {leaderboard.map((player,index) => (
                    <Text key={index}>{index}.{player.name} - {player.result}</Text>
                ))}
            </View> */}
            <TouchableOpacity style={styles.buttonFinish} onPress={handleOnPress}>
                <Text style={{color:"white", fontWeight: 'bold', fontSize: 20}}>Play Again!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2ec4b6",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },

    row: {
      borderBottomWidth: 1,
      display: "flex",
      flexDirection: "row",
    },

    title: {
      textAlign: "center",
      marginTop: 7,
      fontSize:  25,
      color: 'white',
      fontWeight: 'bold'
    },

    text: {
        textAlign: "center",
        marginTop: 7,
        fontSize: 20,
        color: 'white',
        paddingHorizontal:  25
    },
    
    buttonFinish: {
        width: 150,
        padding:  15,
        backgroundColor: '#9a031e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        textAlign: 'center',
        marginTop:  30
    },
    
  });
