import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { TouchableOpacity } from 'react-native-gesture-handler'

import {fetchBoard} from '../stores/actions/fetchBoard'
import {solveBoard} from '../stores/actions/solveBoard'
import { setBoard } from '../stores/actions/setBoard'
import {validateBoard} from '../stores/actions/validateBoard'
import loadingGIF from '../assets/loading.gif'

export default function Gamescreen({navigation, route}) {
    const dispatch = useDispatch()
    const board = useSelector(state => state.sugokuReducer.board)
    const loading = useSelector(state => state.sugokuReducer.loading)
    const result = useSelector(state => state.sugokuReducer.result)
    
    const params= route.params
    const {level, name} = params

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&')

    useEffect(() => {
      console.log('masuk sini');
     dispatch(fetchBoard(level))
    }, [dispatch]);

    function handleOnPress() {
        navigation.navigate('Finish' , {
          name, result
        })
    }
    
    function handleOnChange(answer, row, cell) {
      const tempBoard = [...board]
      tempBoard[row][cell] = +answer
      dispatch(setBoard(tempBoard))
    }

    function handleAutoSolve() {
      dispatch(solveBoard(board))
    }

    function handleValidate() {
      let data = {board}
      const payload = encodeParams(data)
      dispatch(validateBoard(payload))
    }

    // function handleOnPress() {
    //     navigation.goBack()
    // }
    
    return (
        // <View style= {{flex:1 , alignItems: 'center', justifyContent: 'center'}}>
        //     <Text style={{color:"black"}}>{params.player1} Vs {params.player2}</Text>
        //     <Text>-------------------------------</Text>
            <View style={styles.container}>
             {!loading && <View>
              {result == 'solved' ? 
                <Text style={{color:"white", fontWeight:'bold', textAlign:'center', fontSize: 20 }}
                  >Status Game: {result}
                    </Text>
                  :
                  <Text style={{color:"#d90429", fontWeight:'bold', textAlign:'center', fontSize: 20 }}
                  >Status Game: {result}
                    </Text>
                }
                </View>
              }
                {loading && <Image
                  source={loadingGIF}
                  style={{ width: 250, height: 250}}
                />}

                {!loading && <View style={styles.board}>
                    {board.map((i, row) => (
                    <View
                      style={
                      row === 2 || row === 5 ? 
                      styles.blockRow : row === 8 ? 
                      styles.bottom : styles.row
                      }
                      key={row}
                    >
                      {i.map((number, cellIndex) => (
                      <View
                          style={
                          cellIndex === 2 || cellIndex === 5 ? 
                          styles.blockCell : cellIndex === 8 ? 
                          styles.rightCell : styles.cell
                          }
                          key={cellIndex}
                        >
                          {number !== 0 ?
                            <TextInput
                            style={styles.text}
                            maxLength={1}
                            defaultValue={`${number}`}
                            editable= {false}
                            ></TextInput>
                            :
                            <TextInput
                            color="red"
                            style={styles.answerText}
                            keyboardType="number-pad" 
                            onChangeText={answer=> handleOnChange(answer, row, cellIndex)}
                            maxLength={1}
                            ></TextInput>
                          }
                        </View>
                        ))}
                    </View>
                    ))}
                </View>
                }
                <View style={styles.flexButton}>
                  <Button  color="#011627" onPress={handleValidate} title="Validate"/>
                  <Button  color="#011627" onPress={handleAutoSolve} title="Auto Solve"/>
                </View>
                {/* <View style={styles.buttonFinish}>
                  <Button onPress={handleOnPress} title="Finish"/>
                </View> */}
                <TouchableOpacity style={styles.buttonFinish} onPress={handleOnPress}>
                  <Text style={{color:"white", fontWeight:'bold', textAlign:'center', fontSize: 25 }}>Finish</Text>
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

    flexButton: {
      flexDirection: 'row',
      marginVertical: 20
    },
  
    buttonFinish: {
      width: 150,
      padding:  15,
      backgroundColor: '#9a031e',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20
    },
  
    board: {
      borderColor: 'white',
      borderWidth: 4,
      marginTop: 30,
    },
  
    row: {
      borderColor: 'white',
      borderBottomWidth: 1,
      display: "flex",
      flexDirection: "row",
    },
  
    blockRow: {
      borderColor: 'white',
      borderBottomWidth: 4,
      display: "flex",
      flexDirection: "row",
    },
  
    bottom: {
      display: "flex",
      flexDirection: "row",
      borderColor: 'white',
    },
  
    cell: {
      borderRightWidth: 1,
      height: 30,
      width: 30,
      borderColor: 'white',
    },
  
    blockCell: {
      borderRightWidth: 4,
      height: 30,
      width: 30,
      borderColor: 'white',
    },
  
    rightCell: {
      height: 30,
      width: 30,
      borderColor: 'white',
    },
  
    text: {
      textAlign: "center",
      marginTop: 7,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 0,
    },

    answerText: {
      textAlign: "center",
      marginTop: 7,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 0,
      color: 'red',
    }
  });

{/* <View style={styles.container}>
<Text>Sugoku</Text>
  <View style={styles.board}>
    {board.map((i, row) => (
      <View
        style={
          row === 2 || row === 5
            ? styles.blockRow
            : row === 8
            ? styles.bottom
            : styles.row
        }
        key={row}
      >
        {i.map((number, cellIndex) => (
          <View
            style={
              cellIndex === 2 || cellIndex === 5
                ? styles.blockCell
                : cellIndex === 8
                ? styles.rightCell
                : styles.cell
            }
            key={cellIndex}
          >
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              style={styles.text}
            ></TextInput>
          </View>
        ))}
      </View>
    ))}
  </View>
</View>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  board: {
    borderWidth: 4,
    marginTop: 80,
  },

  row: {
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
  },

  blockRow: {
    borderBottomWidth: 4,
    display: "flex",
    flexDirection: "row",
  },

  bottom: {
    display: "flex",
    flexDirection: "row",
  },

  cell: {
    borderRightWidth: 1,
    height: 30,
    width: 30,
  },

  blockCell: {
    borderRightWidth: 4,
    height: 30,
    width: 30,
  },

  rightCell: {
    height: 30,
    width: 30,
  },

  text: {
    textAlign: "center",
    marginTop: 7,
    fontSize: 20,
    fontWeight: "900",
  },
}); */}