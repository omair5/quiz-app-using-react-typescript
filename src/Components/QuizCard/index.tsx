import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { QuizCardData, FetchQuizResponse } from '../../QuizType';

const QuizCard: React.FC = () => {
    const QuizData: FetchQuizResponse[] = useSelector((state: RootStateOrAny) => state.QuizData)

    console.log('this is quiz data', QuizData)
    return (
        <>
            this is quiz card
        </>
    );
}

export default React.memo(QuizCard);