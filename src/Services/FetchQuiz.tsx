const FetchQuiz = async (quizCategory: number, quizDifficulty: string) => {
    console.log(quizCategory, quizDifficulty)
    const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${quizCategory}&difficulty=${quizDifficulty}&type=multiple`)
    const { results } = await res.json()
    console.log(results)
}
export default FetchQuiz;