const initialState = 10
const CountDownMins = (state = initialState, action) => {
    switch (action.type) {
        case 'decrement_minute':
            return state - 1
        case 'clear_minute':
            return 0
        default:
            return state
    }
}
export default CountDownMins
