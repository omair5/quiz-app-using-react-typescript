import React from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Category_select_options } from '../../Services/FetchCategories'
import Excellent from './excellent.png'
import Pass from './pass.png'
import Fail from './fail.png'
import Button from '@material-ui/core/Button';
import { decode } from 'html-entities';
import Paper from '@material-ui/core/Paper';
import Styles from './index.module.css'
import Grid from '@material-ui/core/Grid';


interface QuizData {
    correct_answer: string,
    options: string[],
    question: string
}

interface categoryType {
    id: number,
    name: string
}

const Result: React.FC = () => {
    const dispatch = useDispatch()
    const correctAnswerCount = useSelector((state: RootStateOrAny) => state.CorrectAnswerCount)
    const formFields = useSelector((state: RootStateOrAny) => state.FormData)
    const min = useSelector((state: RootStateOrAny) => state.CountDownMins)
    const sec = useSelector((state: RootStateOrAny) => state.CountDownSecs)
    const QuizData = useSelector((state: RootStateOrAny) => state.QuizData)

    console.log(formFields)
    const response = Category_select_options.find((value: categoryType) => value.id === +formFields.category)
    console.log(response)
    const category = response?.name

    // CALCULATING TOTAL TIME TAKEN TO COMPLETE THE QUIZ
    const TotalTimeTaken = (min: number, sec: number): string => {
        const seconds = 60 - sec
        if ((min === 0) && (sec === 0)) {
            return `10:00`
        }
        else if ((min > 0) && (sec > 0)) {
            return `${(10 - min) - 1}:${leadingZeros(seconds)}`
        }
        else if ((min === 0) && (sec > 0)) {
            return `9:${leadingZeros(seconds)}`
        }
        else {
            return `${10 - min}:00`
        }
    }

    // INSERTING A LEADING ZERO IF THERE IS ONLY SINGLE DIGIT
    const leadingZeros = (seconds: number) => {
        return seconds < 10 ? `0${seconds}` : seconds
    }

    // CALCULATING RESULT
    const Result = (correctAnswerCount: number) => {
        switch (true) {
            case (correctAnswerCount < 5):
                return Fail
            case ((correctAnswerCount >= 5) && (correctAnswerCount <= 9)):
                return Pass
            case (correctAnswerCount > 9):
                return Excellent
        }
    }

    // RESULT TITLE
    // const ResultTitle = (count: number) => {
    //     switch (true) {
    //         case (count >= 5):
    //             return 'Congratulation! You Have Passed The Test'
    //         case (count < 5):
    //             return 'Sorry! You Have Failed The Test'

    //     }
    // }

    // Handle Another Quiz
    const HandleAnotherQuiz = () => {
        dispatch({ type: 'clear_quiz' })
        dispatch({ type: 'reset_form_data' })
        dispatch({ type: 'clear_minute' })
        dispatch({ type: 'clear_second' })
        dispatch({ type: 'clear_correct_answer_count' })
        dispatch({ type: 'hide_quiz_card' })
        dispatch({ type: 'hide_result' })
        dispatch({ type: 'show_quiz_form' })
    }


    return (
        <>
            <Grid container >
                <Grid item xs={12} md={6} >
                    <Paper className={Styles.paper}>
                        <h1><span>RESULT CARD</span></h1>
                        <div className={Styles.Badge}>
                            <img src={Result(correctAnswerCount)} alt="result badge" />
                        </div>

                        <div className={Styles.result}>
                            <h2>Name : <span>{formFields.name}</span></h2>
                            <h2>Category : <span>{category}</span></h2>
                            <h2>Difficulty Level : <span>{formFields.difficulty}</span></h2>
                            <h2>Score :<span> {correctAnswerCount} Out Of 10</span></h2>
                            <h2>Time Taken : <span>{TotalTimeTaken(min, sec)}</span></h2>
                        </div>

                        <div className={Styles.button}>
                            <Button variant="contained" color="primary" onClick={HandleAnotherQuiz}>
                                Take Another Quiz
                            </Button>
                        </div>
                    </Paper>
                </Grid>

                {/* CORRECT ANSWER */}
                <Grid item xs={12} md={6} >
                    <Paper className={Styles.paperAnswers}>
                        <h1> CORRECT ANSWERS</h1>
                        {QuizData.map((value: QuizData, index: number) => (
                            <div key={index} className={Styles.qacontainer}>
                                <div>
                                    Q : {decode(value.question)}
                                </div>
                                <div className={Styles.Answer}>
                                    {value.correct_answer}
                                </div>
                            </div>
                        ))}
                    </Paper>
                </Grid>

            </Grid>
        </>
    );
}

export default Result;