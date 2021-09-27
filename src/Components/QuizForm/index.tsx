import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import FetchQuiz from '../../Services/FetchQuiz';
import { QuizCardData } from '../../QuizType'


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
    const dispatch = useDispatch()
    const Category_select_options = useSelector((state: RootStateOrAny) => state.FormCategory)
    const [formFields, setformFields] = useState({ name: '', category: 9, difficulty: 'easy' })

    const HandleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setformFields({ ...formFields, [e.target.name]: e.target.value })
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formFields)
        dispatch({ type: 'hide_quiz_form' })
        dispatch({ type: 'show_quiz_card' })
        const QuizFetch = async () => {
            const quizdata: QuizCardData[] = await FetchQuiz(formFields.category, formFields.difficulty)
            dispatch({ type: 'set_quiz', payload: quizdata })
        }
        QuizFetch()
        setformFields({ name: '', category: 9, difficulty: 'easy' })
    }

    return (
        <>
            <form onSubmit={HandleSubmit}>
                {/* NAME */}
                <div>
                    <TextField
                        id="outlined-basic"
                        placeholder='Enter Your Name'
                        variant="outlined"
                        value={formFields.name}
                        name='name'
                        onChange={HandleFormChange}
                    />
                </div>

                {/* CATEGORY */}
                <div>
                    <TextField
                        id="filled-select-currency-native"
                        select
                        value={formFields.category}
                        onChange={HandleFormChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please Select Category"
                        variant="outlined"
                        name='category'
                        placeholder='Enter Your Name'
                    >
                        {
                            Category_select_options.length === 0 ? 'Loading...' :
                                Category_select_options.map((option: categoryItems, index: number) => (
                                    <option key={index} value={option.id}>
                                        {option.name}
                                    </option>
                                ))
                        }
                    </TextField>
                </div>

                {/* DIFFICULTY LEVEL */}
                <div>
                    <TextField
                        id="filled-select-currency-native"
                        select
                        value={formFields.difficulty}
                        onChange={HandleFormChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Difficulty"
                        variant="outlined"
                        name='difficulty'
                    >
                        {DifficultyLevel.map((option: difficultyLevelItems, index: number) => (
                            <option key={index} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                </div>

                <button type='submit'>START QUIZ</button>
            </form>
        </>
    );
}

export default React.memo(QuizForm);