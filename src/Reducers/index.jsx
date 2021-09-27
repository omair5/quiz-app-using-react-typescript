import { combineReducers } from 'redux'
import FormCategory from './FormCategory'
import QuizData from './QuizData'
import QuizFormVisibility from './QuizFormVisibility'
import QuizCardVisibility from './QuizCardVisibility'
import ResultVisibility from './ResultVisibility'
import CorrectAnswerCount from './CorrectAnswerCount'


export default combineReducers(
    {
        FormCategory,
        QuizData,
        QuizFormVisibility,
        QuizCardVisibility,
        ResultVisibility,
        CorrectAnswerCount
    }
)