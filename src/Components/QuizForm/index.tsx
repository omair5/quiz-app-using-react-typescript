import React from 'react';
import TextField from '@material-ui/core/TextField';




const QuizForm: React.FC = () => {
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
                        {/* {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))} */}
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