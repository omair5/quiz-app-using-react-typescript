const initialState = []

const QuizData = (state = initialState, action) => {
    switch (action.type) {
        case 'set_quiz':
            return action.payload
        case 'clear_quiz':
            return []
        default:
            return state
    }
}
export default QuizData;