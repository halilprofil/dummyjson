import { useState } from "react";
import "./App.css";
import { Recipes } from "./components/recipes/Recipes";
import { Products } from "./components/product/Products";
import { Post } from "./components/blog/Post";
function App() {
  const [context, setContext] = useState("recipes");
  return (
    <>
      <header>
        <button onClick={() => setContext("recipes")}>Recipes</button>
        <button onClick={() => setContext("blog")}>Blog</button>
        <button onClick={() => setContext("products")}>Products</button>
      </header>
      {context === "recipes" ? <Recipes /> : ""}
      {context === "blog" ? <Post /> : ""}
      {context === "products" ? <Products /> : ""}
    </>
  );
}

export default App;
