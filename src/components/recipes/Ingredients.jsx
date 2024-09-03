import React, { useEffect, useState } from 'react'
import { fetchAllRecipes } from '../../services/recipes';

export const Ingredients = () => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetchAllRecipes();
      setRecipes(data.recipes);
    };

    fetchRecipes();
  }, []);
    return(
        <>
        <ul>
          {recipes.map(x=> <li  key={x.id}>{x.ingredients}</li>)}
        </ul>
    
        </>
      )
}
