import { useEffect } from 'react';
import './App.css';
// import store from './store';
import { Provider } from 'react-redux'
import FetchCategories from './Services/FetchCategories';
import QuizForm from './Components/QuizForm';



function App() {

  useEffect(() => {
    async function CategoriesFetch() {
      console.log(await FetchCategories())
    }
    CategoriesFetch()
  }, [])

  return (
    <div>
      {/* <Provider store={store}> */}
      <QuizForm />
      {/* </Provider> */}
    </div>
  );
}
export default App;