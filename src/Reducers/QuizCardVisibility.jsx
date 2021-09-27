const initialState = false
const QuizCardVisibility = (state = initialState, action) => {
    switch (action.type) {
        case 'show_quiz_card':
            return true
        case 'hide_quiz_card':
            return false
        default:
            return state
    }
}
export default QuizCardVisibility