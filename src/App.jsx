import { useState,useEffect } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0);
  const [recipes, setRecipes] = useState([]);

  function Ingredients({recipes}){


    return(
      <>
      <ul>
        {recipes.map(x=> <li key={x.id}>{x.ingredients}</li>)}
      </ul>
  
      </>
    )
  }


  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then(res => res.json())
      .then(res => {
        setRecipes(res.recipes);
        
        
      })
  }, []);

  console.log(recipes);

  return (
    <>
      <Ingredients recipes={recipes}/>
    </>
  )
}

export default App



