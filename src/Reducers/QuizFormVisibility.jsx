const initialState = true
const QuizFormVisibility = (state = initialState, action) => {
    switch (action.type) {
        case 'show_quiz_form':
            return true
        case 'hide_quiz_form':
            return false
        default:
            return state
    }
}
export default QuizFormVisibility