export function solveBoard(board){
    return (dispatch, getState) => {
        dispatch({type: "SET_LOADING", payload: true})
        fetch("https://sugoku.herokuapp.com/solve", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: JSON.stringify(board)
        })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
              type: "SET_BOARD",
              payload: data.solution
          })
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
