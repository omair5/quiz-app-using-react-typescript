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



const QuizCard: React.FC = () => {
    const dispatch = useDispatch()
    const QuizData: QuizCardData[] = useSelector((state: RootStateOrAny) => state.QuizData)
    const [questionNumber, setquestionNumber] = useState<number>(0)
    const [checkedValue, setcheckedValue] = useState<string>('');
    const [questionCount, setquestionCount] = useState<number>(1)


    // HANDLE NEXT QUESTION
    const HandleNext = () => {
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

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setcheckedValue(e.target.value);
    };


    console.log('this is quiz data', QuizData)

    return (
        <>
            {
                (QuizData.length === 0) ? 'loadinggggggg'
                    :
                    <div>
                        {/* QUESTION COUNT */}
                        <div>
                            {questionCount}/10
                        </div>

                        {/* COUNTDOWN TIMER */}
                        <div>
                            <CountDownTimer />
                        </div>

                        {/* QUESTION */}
                        <div>
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
                                            <FormControlLabel value={value} control={<Radio />} label={value} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </RadioGroup>

                    </div>
            }

            {/* NEXT BUTTON */}
            <div>
                <Button variant="contained" color="primary" onClick={HandleNext}>
                    NEXT
                </Button>
            </div>
        </>
    );
}

export default React.memo(QuizCard);








