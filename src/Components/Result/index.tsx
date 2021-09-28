import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Category_select_options } from '../../Services/FetchCategories'

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

    const leadingZeros = (seconds: number) => {
        return seconds < 10 ? `0${seconds}` : seconds
    }

    return (
        <>
            this is result compoennt
            <h1>{TotalTimeTaken(min, sec)}</h1>
        </>
    );
}

export default Result;