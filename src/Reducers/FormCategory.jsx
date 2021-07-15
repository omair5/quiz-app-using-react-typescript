const initialState = []

const FormCategory = (state = initialState, action) => {

    switch (action.type) {
        case 'populate_category_select':
            return action.payload
        default:
            return state
    }
}
export default FormCategory;