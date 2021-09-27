const initialState = 0
const CorrectAnswerCount = (state = initialState, action) => {
    switch (action.type) {
        case 'increment_correct_answer_count':
            return state + 1
        case 'clear_correct_answer_count':
            return 0
        default:
            return state
    }
}
export default CorrectAnswerCount
