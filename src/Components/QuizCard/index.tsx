import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { QuizCardData } from '../../QuizType';
import { decode } from 'html-entities';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useState } from 'react';

const QuizCard: React.FC = () => {
    const QuizData: QuizCardData[] = useSelector((state: RootStateOrAny) => state.QuizData)
    const [option, setoption] = useState<string>('')
    console.log('this is quiz data', QuizData)
    return (
        <>
            {
                QuizData.length === 0 ? 'loadinggg' :
                    // DECODING HTML ENTITIES THROUGH NPM PACKAGE
                    <div>
                        <div>
                            {decode(QuizData[0].question)}
                        </div>

                        <RadioGroup name="option" >
                            <FormControlLabel
                                value="end"
                                control={<Radio color="primary" />}
                                label="End"
                            />
                        </RadioGroup>

                        <FormHelperText>please select an option</FormHelperText>
                    </div>


            }

        </>

    );

}

export default React.memo(QuizCard);