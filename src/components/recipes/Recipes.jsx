import React, { useEffect, useState } from "react";
import { fetchRecipesByPage } from "../../services/recipes";
import { Pagination } from "../pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../base/Spinner";
import { SearchBar } from "../searchbar/SearchBar";
import "./recipes.css";

export const Recipes = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading, data, error } = useFetch(() => fetchRecipesByPage(page, limit), [page]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (data) {
      setFilteredData(data.recipes.filter((recipes) => recipes.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, data]);

  const handlePostClick = (id) => {
    window.history.pushState({}, "", `/recipes/${id}`);
    const recipe = filteredData.find((x) => x.id === id);
    setSelectedPost({ ...recipe });
  };

  return (
    <>
      <div className="container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="recipes-container">
          {/* Eğer bir tarif seçilmemişse tüm tarifleri göster */}
          {filteredData.length > 0 && !loading && !selectedPost ? (
            filteredData.map((x) => (
              <div onClick={() => handlePostClick(x.id)} className="recipes-item" key={x.id}>
                <p>{x.name}</p>
                <img src={x.image} alt={x.name} />

                {/* Acordion Start */}
                <details>
                  <summary>Malzemeler</summary>
                  <div className="ingredients">
                    <h3>Malzemeler</h3>
                    <ul>{x.ingredients && x.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}</ul>
                  </div>
                </details>

                <details>
                  <summary>Hazırlanış</summary>
                  <div className="instructions">
                    <h3>Hazırlanış</h3>
                    <ol>
                      {x.instructions &&
                        x.instructions.map((instruction, i) => (
                          <li type="number" key={i}>
                            {instruction}
                          </li>
                        ))}
                    </ol>
                  </div>
                </details>
                {/* Acordion End */}
              </div>
            ))
          ) : !loading && !selectedPost ? (
            "İçerik bulunamadı"
          ) : null}

          {/* Eğer bir tarif seçildiyse, tarif detaylarını göster */}
          {selectedPost && (
            <div className="recipe-details">
              <img src={selectedPost.image} alt={selectedPost.name} />
              <ul>
                <li>Mutfak: {selectedPost.cuisine}</li>
                <li>Zorluk Derecesi: {selectedPost.difficulty}</li>
                <li>Servis Başına Kalori: {selectedPost.caloriesPerServing}</li>
                <li>Tercihen Öğün Seçimi: {selectedPost.mealType}</li>
                <li>{selectedPost.servings} kişilik</li>
                <li>Pişirme süresi: {selectedPost.cookTimeMinutes} dakika</li>
                <li>Hazırlama süresi: {selectedPost.prepTimeMinutes} dakika</li>
              </ul>

              <details>
                <summary>Malzemeler</summary>
                <div className="ingredients">
                  <h3>Malzemeler</h3>
                  <ul>
                    {selectedPost.ingredients &&
                      selectedPost.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
                  </ul>
                </div>
              </details>

              <details>
                <summary>Hazırlanış</summary>
                <div className="instructions">
                  <h3>Hazırlanış</h3>
                  <ol>
                    {selectedPost.instructions &&
                      selectedPost.instructions.map((instruction, i) => (
                        <li type="number" key={i}>
                          {instruction}
                        </li>
                      ))}
                  </ol>
                </div>
              </details>

              <button
                onClick={() => {
                  window.history.pushState({}, "", "/recipes");
                  setSelectedPost(null);
                }}
              >
                Geri Dön
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div>
            <Spinner />
          </div>
        )}
        {error && <div>Error...</div>}
        {data && <Pagination page={page} setPage={setPage} limit={limit} total={data.total} />}
      </div>
    </>
  );
};

