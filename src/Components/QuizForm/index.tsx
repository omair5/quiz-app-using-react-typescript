import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import FetchQuiz from '../../Services/FetchQuiz';
import { QuizCardData } from '../../QuizType'
import { Category_select_options } from '../../Services/FetchCategories'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Styles from './index.module.css'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FailurePopUpMessage from '../FailurePopUpMessage';
import CircularProgress from '@material-ui/core/CircularProgress';



const CssTextField = withStyles({
    root: {
        // '& label.Mui-focused': {
        //     color: 'white',
        // },
        // '& .MuiInput-underline:after': {
        //     borderBottomColor: 'yellow',
        // },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid #fcb812'
            },
            '&:hover fieldset': {
                borderColor: '#fcb812',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fcb812',
            },
        },
    },
})(TextField);

const useStyles = makeStyles({
    inputfield: {
        margin: '10px 0px',
        width: '100%',
    },
    inputStyles: {
        color: "black",
    },
});


interface categoryItems {
    id: number,
    name: string
}

interface difficultyLevelItems {
    id: number,
    name: string,
    value: string
}

const DifficultyLevel = [
    { id: 1, name: 'Easy', value: 'easy' },
    { id: 2, name: 'Medium', value: 'medium' },
    { id: 3, name: 'Hard', value: 'hard' },
]

const QuizForm: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const formFields = useSelector((state: RootStateOrAny) => state.FormData)
    const [loader, setloader] = useState<boolean>(false)
    const [open, setopen] = useState<boolean>(false)
    // TO CLOSE DIALOG BOX
    const HandleClose = useCallback(() => {
        setopen(false)
    }, [])

    const HandleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'set_form_data', payload: { [e.target.name]: e.target.value } })
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setloader(true)
        const QuizFetch = async () => {
            const quizdata: QuizCardData[] = await FetchQuiz(formFields.category, formFields.difficulty)
            if (quizdata.length === 0) {
                setloader(false)
                setopen(true)
            }
            else {
                dispatch({ type: 'hide_quiz_form' })
                dispatch({ type: 'show_quiz_card' })
                dispatch({ type: 'set_quiz', payload: quizdata })
            }

        }
        QuizFetch().catch(err => {
            console.log('some error occurs')
            setloader(false)
            setopen(true)
        })
    }

    return (
        <>
            <Paper className={Styles.paper}>
                <form onSubmit={HandleSubmit}>
                    {/* NAME */}
                    <div>
                        <h4 className={Styles.textfieldHeading}>Enter Name</h4>
                        <CssTextField
                            id="outlined-basic"
                            placeholder='Enter Your Name'
                            variant="outlined"
                            value={formFields.name}
                            name='name'
                            onChange={HandleFormChange}
                            required
                            fullWidth
                            autoComplete='off'
                            autoFocus={true}
                            className={classes.inputfield}
                            inputProps={{
                                className: classes.inputStyles,
                            }}

                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <h4 className={Styles.textfieldHeading}>Select Category</h4>
                        <CssTextField
                            select
                            value={formFields.category}
                            onChange={HandleFormChange}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            name='category'
                            placeholder='Enter Your Name'
                            fullWidth
                            className={classes.inputfield}
                            inputProps={{
                                className: classes.inputStyles,
                            }}
                        >

                            {
                                Category_select_options.length === 0 ? 'Loading...' :
                                    Category_select_options.map((option: categoryItems, index: number) => (
                                        <option key={index} value={option.id} className={Styles.option}>
                                            {option.name}
                                        </option>
                                    ))
                            }
                        </CssTextField>
                    </div>

                    {/* DIFFICULTY LEVEL */}
                    <div>
                        <h4 className={Styles.textfieldHeading}>Select Difficulty Level</h4>
                        <CssTextField
                            id="filled-select-currency-native"
                            select
                            value={formFields.difficulty}
                            onChange={HandleFormChange}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                            name='difficulty'
                            fullWidth
                            className={classes.inputfield}
                            inputProps={{
                                className: classes.inputStyles,
                            }}
                        >
                            {DifficultyLevel.map((option: difficultyLevelItems, index: number) => (
                                <option key={index} value={option.value} className={Styles.option}>
                                    {option.name}
                                </option>
                            ))}
                        </CssTextField>
                    </div>
                    {/* BUTTON */}
                    <div className={Styles.button}>
                        <Button variant="contained" type='submit' color="primary" disabled={loader} >
                            {
                                loader ?
                                    <CircularProgress style={{ width: '20px', height: '20px', color: 'white' }} />
                                    :
                                    'START QUIZ'

                            }
                        </Button>
                    </div>
                </form>
                {/* NOTE */}
                <div>
                    <h5 className={Styles.note}>NOTE</h5>
                    <ul>
                        <p>The Quiz Consist Of 10 Questions.</p>
                        <p>You Will Have 10 Minutes To Complete Your Quiz.</p>
                    </ul>
                </div>
            </Paper>
            <FailurePopUpMessage
                heading='Something Went Wrong'
                message='Dear User Extremely Sorry For The Inconvenience.The Servers Are Not Responding At The Moment Please Try Again Later' open={open} HandleClose={HandleClose} />
        </>
    );
}
export default React.memo(QuizForm);