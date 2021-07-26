import { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux'
import FetchCategories from './Services/FetchCategories';
import QuizForm from './Components/QuizForm';
import QuizCard from './Components/QuizCard';



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function CategoriesFetch() {
      const response = await FetchCategories()
      dispatch({ type: 'populate_category_select', payload: response })
    }
    CategoriesFetch()
  }, [dispatch])

  return (
    <div>
      <QuizForm />
      <QuizCard />
    </div>
  );
}
export default App;