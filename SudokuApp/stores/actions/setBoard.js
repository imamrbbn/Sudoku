export function setBoard(board) {
    return(dispatch, getState) => {
        dispatch({
            type: "SET_BOARD",
            payload: board
        })
    }
}