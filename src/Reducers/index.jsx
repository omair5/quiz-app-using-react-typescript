import { combineReducers } from 'redux'
import FormCategory from './FormCategory'
import QuizData from './QuizData'
import QuizFormVisibility from './QuizFormVisibility'
import QuizCardVisibility from './QuizCardVisibility'
import ResultVisibility from './ResultVisibility'
import CorrectAnswerCount from './CorrectAnswerCount'
import FormData from './FormData'
import CountDownMins from './CountDownMins'
import CountDownSecs from './CountDownSecs'


export default combineReducers(
    {
        FormCategory,
        QuizData,
        QuizFormVisibility,
        QuizCardVisibility,
        ResultVisibility,
        CorrectAnswerCount,
        FormData,
        CountDownMins,
        CountDownSecs
    }
)