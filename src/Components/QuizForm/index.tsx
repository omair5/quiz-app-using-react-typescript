import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, RootStateOrAny } from 'react-redux';


interface categoryItems {
    id: number,
    name: string
}

const QuizForm: React.FC = () => {

    const Category_select_options = useSelector((state: RootStateOrAny) => state.FormCategory)
    console.log('this is what i want', Category_select_options)

    return (
        <>
            <form>

                <div>
                    <TextField id="outlined-basic" placeholder='Enter Your Name' variant="outlined" />
                </div>

                <div>
                    <TextField
                        id="filled-select-currency-native"
                        select
                        label="Select Category"
                        // value={ }
                        // onChange={ }
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please Select Category"
                        variant="outlined"
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

                <div>
                    <TextField
                        id="filled-select-currency-native"
                        select
                        label="Select Difficulty"
                        // value={ }
                        // onChange={ }
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Difficulty"
                        variant="outlined"
                    >
                        {/* {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))} */}
                    </TextField>
                </div>

            </form>
        </>
    );
}

export default QuizForm;