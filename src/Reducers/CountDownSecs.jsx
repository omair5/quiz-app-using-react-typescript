const initialState = 0
const CountDownSecs = (state = initialState, action) => {
    switch (action.type) {
        case 'decrement_second':
            return state - 1
        case 'clear_second':
            return 0
        case 'set_seconds':
            return 59
        default:
            return state
    }
}
export default CountDownSecs
