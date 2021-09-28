import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Category_select_options } from '../../Services/FetchCategories'
import Excellent from './excellent.png'
import Pass from './pass.png'
import Fail from './fail.png'


interface categoryType {
    id: number,
    name: string
}

const Result: React.FC = () => {
    const correctAnswerCount = useSelector((state: RootStateOrAny) => state.CorrectAnswerCount)
    const formFields = useSelector((state: RootStateOrAny) => state.FormData)
    const min = useSelector((state: RootStateOrAny) => state.CountDownMins)
    const sec = useSelector((state: RootStateOrAny) => state.CountDownSecs)
    console.log(min, sec)
    console.log(correctAnswerCount, formFields.name, formFields.difficulty)

    const category = Category_select_options.find((value: categoryType) => value.id === formFields.category)
    console.log(category?.name)

    // CALCULATING TOTAL TIME TAKEN TO COMPLETE THE QUIZ
    const TotalTimeTaken = (min: number, sec: number): string => {
        const seconds = 60 - sec
        if ((min === 0) && (sec === 0)) {
            console.log('both are empty')
            return `10:00`
        }
        else if ((min > 0) && (sec > 0)) {
            console.log('both are present')

            return `${(10 - min) - 1}:${leadingZeros(seconds)}`
        }
        else if ((min === 0) && (sec > 0)) {
            console.log('min is 0 while sec is non zero')

            return `9:${leadingZeros(seconds)}`
        }
        else {
            console.log('seconds are zero')

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


    return (
        <>
            this is result compoennt
            <h1>{TotalTimeTaken(min, sec)}</h1>
            <div>
                you scored {correctAnswerCount}
                <img src={Result(correctAnswerCount)} alt="result badge" />
            </div>
        </>
    );
}

export default Result;