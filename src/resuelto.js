import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (event) => setCategory(event.target.value)

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Código de estado inesperado");
        }
      })
      .then(data => setProducts(data))
      .catch(error => setErrorMessage(error.message))
  }
  useEffect(() => {
    getProducts();
    getCartProducts();
    getCategories();
  }, [])

  const getProductsCategory = () => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Código de estado inesperado");
        }
      })
      .then(data => setCategoryProducts(data))
      .catch(error => setErrorMessage(error.message))
  }

  const getCartProducts = () => {
    fetch("https://fakestoreapi.com/carts")
      .then(response => response.json())
      .then(data => setCartProducts(data.filter(cart => cart.products.length >= 2)))
  }

  const getCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(response => response.json())
    .then(data => setCategories(data))
  }


  return (
    <main>

      <h1>Recuperatorio Requests con React</h1>

      <div>
        <h2>Lista de todos los productos disponibles:</h2>
        <p className="result-box">
          <ul>
            {products.map(product => <li>{product.title} - {product.price}</li>)}
          </ul>
        </p>
      </div>

      <div>
        <h2>Obtener productos de una categoría determinada</h2>

        <h3>Ingrese una categoría:</h3>
        <select onChange={handleCategoryChange}>
          {categories.map(category => <option value={category}>{category}</option>)}
        </select>
        <button onClick={getProductsCategory}>Enviar</button>

        <h3>Productos de la categoría ingresada:</h3>
        <p className="result-box">
          <ul>
            {categoryProducts.map(product => <li>{product.title} - {product.price}</li>)}
          </ul>
        </p>
      </div>

      <div>
        <h2>Mensaje en caso de error:</h2>
        <p className="result-box">{errorMessage}</p>
      </div>

      <div>
        <h2>Carritos con al menos 2 productos:</h2>
        <p className="result-box">
          <ul>
            {cartProducts.map(cart => <li>{cart.id} - {cart.products.length}</li>)}
          </ul>
        </p>
      </div>

    </main>
  );
}

export default App;
