const initialState = false
const ResultVisibility = (state = initialState, action) => {
    switch (action.type) {
        case 'show_result':
            return true
        case 'hide_result':
            return false
        default:
            return state
    }
}
export default ResultVisibility