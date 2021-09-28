import { FetchQuizResponse, QuizCardData } from '../QuizType'
import { decode } from 'html-entities';

const ShuffleArray = (optionsArray: string[]) => {
    return optionsArray.sort(() => Math.random() - 0.5)
}

const FetchQuiz = async (quizCategory: number, quizDifficulty: string): Promise<QuizCardData[]> => {
    console.log(quizCategory, quizDifficulty)
    const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${quizCategory}&difficulty=${quizDifficulty}&type=multiple`)
    const { results } = await res.json()

    const quizData = results.map((value: FetchQuizResponse, index: number) => (
        {
            question: value.question,
            options: ShuffleArray(value.incorrect_answers.concat(value.correct_answer)).map(value => decode(value)),
            correct_answer: decode(value.correct_answer)
        }
    ))
    return quizData
}
export default FetchQuiz;