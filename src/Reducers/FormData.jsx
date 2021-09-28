const initialState = { name: '', category: 9, difficulty: 'easy' }

const FormData = (state = initialState, action) => {

    switch (action.type) {
        case 'set_form_data':
            return { ...state, ...action.payload }
        case 'reset_form_data':
            return { name: '', category: 9, difficulty: 'easy' }
        default:
            return state
    }
}
export default FormData;