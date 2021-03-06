import React, { ChangeEvent } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { QuizCardData } from '../../QuizType';
import { decode } from 'html-entities';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import CountDownTimer from '../CountDownTimer';
import FormHelperText from '@material-ui/core/FormHelperText';
import Styles from './index.module.css'
import Paper from '@material-ui/core/Paper';
import CardSkeleton from '../CardSkeleton';


const QuizCard: React.FC = () => {
    const dispatch = useDispatch()
    const QuizData: QuizCardData[] = useSelector((state: RootStateOrAny) => state.QuizData)
    const [questionNumber, setquestionNumber] = useState<number>(0)
    const [checkedValue, setcheckedValue] = useState<string>('');
    const [questionCount, setquestionCount] = useState<number>(1)
    const [showError, setshowError] = useState<boolean>(false)


    // HANDLE NEXT QUESTION
    const HandleNext = () => {
        if (!checkedValue) {
            setshowError(true)
        }
        else {
            setshowError(false)
            setcheckedValue('')
            // incrementing count if the user selected answer is correct
            if (checkedValue === QuizData[questionNumber].correct_answer) {
                dispatch({ type: 'increment_correct_answer_count' })
            }

            if (questionNumber < QuizData.length - 1) {
                setquestionNumber((prev: number) => prev + 1)
                setquestionCount((prev: number) => prev + 1)
            }
            else {
                dispatch({ type: 'hide_quiz_card' })
                dispatch({ type: 'show_result' })
            }
        }
    }

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setcheckedValue(e.target.value);
    };

    return (
        <>
            {
                (QuizData.length === 0) ? <CardSkeleton />
                    :
                    <Paper className={Styles.paper}>
                        {/* QUESTION COUNT */}
                        <div className={Styles.header}>
                            <div className={Styles.count}>
                                Question {questionCount}/10
                            </div>

                            {/* COUNTDOWN TIMER */}
                            <div className={Styles.timer}>
                                <CountDownTimer />
                            </div>
                        </div>

                        {/* QUESTION */}
                        <div className={Styles.question}>
                            {decode(QuizData[questionNumber].question)}
                        </div>

                        {/* OPTIONS */}
                        <RadioGroup
                            value={checkedValue}
                            onChange={handleOptionChange}

                        >
                            <Grid container spacing={3}>
                                {
                                    QuizData[questionNumber].options.map((value: string, index: number) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <FormControlLabel value={decode(value)} control={<Radio />} label={decode(value)} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </RadioGroup>

                        {/* NEXT BUTTON */}
                        <div className={Styles.button}>
                            <Button variant="contained" color="primary" onClick={HandleNext}>
                                NEXT
                            </Button>
                        </div>
                        {
                            showError && <FormHelperText className={Styles.error}>Please select An Option Before Proceed !</FormHelperText>
                        }
                    </Paper>
            }
        </>
    );
}
export default React.memo(QuizCard);