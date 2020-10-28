export function fetchBoard(level){
    return (dispatch, getState) => {
        dispatch({type: "SET_LOADING", payload: true})
        fetch( `https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "SET_BOARD",
                    payload: data.board
                })
            })
            .finally(()=> {
                dispatch({type: "SET_LOADING", payload: false})
            })
    }
}