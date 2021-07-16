import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, RootStateOrAny } from 'react-redux';


interface categoryItems {
    id: number,
    name: string
}

const DifficultyLevel = [
    { id: 1, name: 'Easy' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Hard' },
]

const QuizForm: React.FC = () => {

    const Category_select_options = useSelector((state: RootStateOrAny) => state.FormCategory)
    const [formFields, setformFields] = useState({ name: '', category: '', difficulty: '' })

    const HandleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setformFields({ ...formFields, [e.target.name]: e.target.value })
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formFields)
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
                        {DifficultyLevel.map((option: categoryItems, index: number) => (
                            <option key={index} value={option.name}>
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

export default QuizForm;