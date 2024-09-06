import { useEffect, useState } from "react";
import "./App.css";
import { Recipes } from "./components/recipes/Recipes";
import { Products } from "./components/product/Products";
import { Post } from "./components/blog/Post";

function App() {
  const [context, setContext] = useState(window.location.pathname+'/recipes'); // Başlangıçta URL ile eşleştirme

  useEffect(() => {
    // URL değiştiğinde context'i güncelle
    const handlePopState = () => setContext(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const changeContext = (newContext) => {
    window.history.pushState({}, "", newContext); 
    setContext(newContext); 
  };

  return (
    <>
      <header style={{display:'flex',gap:'16px',justifyContent:'center',marginBottom:'16px'}}> 
        <button className={context === '/recipes' ? "active":''} onClick={() => changeContext("/recipes")}>Recipes</button>
        <button className={context === '/blog' ? "active":''} onClick={() => changeContext("/blog")}>Blog</button>
        <button className={context === '/products' ? "active":''} onClick={() => changeContext("/products")}>Products</button>
      </header>

      {/* URL'ye göre bileşen render etme */}
      {context === "/recipes" &&  <Recipes />}
      {context === "/blog" &&  <Post />}
      {context === "/products" && <Products />}
    </>
  );
}

export default App;
