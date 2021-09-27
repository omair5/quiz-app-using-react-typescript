import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';

const Result: React.FC = () => {
    const correctAnswerCount = useSelector((state: RootStateOrAny) => state.CorrectAnswerCount)
    console.log(correctAnswerCount)
    return (
        <>
            this is result compoennt
        </>
    );
}

export default Result;