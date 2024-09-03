import React, { useEffect, useState } from "react";
import { fetchAllRecipes, fetchRecipesByPage } from "../../services/recipes";
import { Pagination } from "../pagination/Pagination";

export const Recipes = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await fetchRecipesByPage(page, 10);

      setData(data);
    };

    fetchRecipes();
  }, [page]);
  return (
    <>
      <div>
        {data.recipes &&
          data.recipes.map((x) => (
            <div key={x.id}>
              <img width={50} src={x.image} alt="" />
              <p>{x.name}</p>
            </div>
          ))}
        {data.recipes && <Pagination page={page} setPage={setPage} limit={10} total={data.total}></Pagination>}
      </div>
    </>
  );
};
