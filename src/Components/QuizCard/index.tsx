import React, { ChangeEvent } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { QuizCardData } from '../../QuizType';
import { decode } from 'html-entities';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';



const QuizCard: React.FC = () => {
    const QuizData: QuizCardData[] = useSelector((state: RootStateOrAny) => state.QuizData)
    const [questionNumber, setquestionNumber] = useState<number>(0)
    const [checkedValue, setcheckedValue] = useState<string>('');

    // HANDLE NEXT QUESTION
    const HandleNext = () => {
        if (questionNumber < QuizData.length - 1) {
            setquestionNumber((prev: number) => prev + 1)
        }
        else {
            alert('hey')
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
                        {decode(QuizData[questionNumber].question)}

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








