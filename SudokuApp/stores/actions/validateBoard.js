export function validateBoard(board){
    return (dispatch, getState) => {
        dispatch({type: "SET_LOADING", payload: true})

        fetch("https://sugoku.herokuapp.com/validate", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: board
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "SET_RESULT",
                    payload: data.status
                })
            })
            .finally(()=> {
                dispatch({type: "SET_LOADING", payload: false})
            })
    }
}


