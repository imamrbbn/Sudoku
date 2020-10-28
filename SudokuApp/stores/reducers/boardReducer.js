const initState = {
    board : [],
    loading: false,
    error: false,
    result: 'unsolved',
}

function sugokuReducer(state = initState, action) {

    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }

        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }    

        case "SET_BOARD":
            return {
                ...state,
                board: action.payload
            }

        case "SET_RESULT":
            return {
                ...state,
                result: action.payload
            }

        case "RESET":
            return {
                ...state,
                board: [],
                result: 'unsolved'
              }
            
        default:
            return state
    }
}

export default sugokuReducer