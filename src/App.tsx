import './App.css';
import { useSelector, RootStateOrAny } from 'react-redux'
import QuizForm from './Components/QuizForm';
import QuizCard from './Components/QuizCard';
import Result from './Components/Result';



function App() {
  const formVisibility = useSelector((state: RootStateOrAny) => state.QuizFormVisibility)
  const cardVisibility = useSelector((state: RootStateOrAny) => state.QuizCardVisibility)
  const resultVisibility = useSelector((state: RootStateOrAny) => state.ResultVisibility)



  // useEffect(() => {
  //   async function CategoriesFetch() {
  //     const response = await FetchCategories()
  //     dispatch({ type: 'populate_category_select', payload: response })
  //   }
  //   CategoriesFetch()
  // }, [dispatch])

  return (
    <div>
      {formVisibility && <QuizForm />}
      {cardVisibility && <QuizCard />}
      {resultVisibility && <Result />}
    </div>
  );
}
export default App;