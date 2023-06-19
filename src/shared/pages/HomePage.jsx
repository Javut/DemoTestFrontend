import React, { useState } from 'react'
import '../../styles/homepage.css'
import logo from '../utils/logo.png'
import shopping from '../utils/shopping.png'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../store/actions'
import { data } from '../../data'

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedClass, setSelectedClass] = useState('')
  const [productData, setProductData] = useState(data)

  const cart = useSelector((state) => state.cart.products)
  const dispatch = useDispatch()

  const renderCards = () => {
    return productData.map((product) => (
      <div
        className={`card ${
          selectedProduct === product.id ? selectedClass : ''
        }`}
        key={product.id}
        onClick={() => handleCardClick(product.id)}
      >
        <img src={product.img} alt={product.nameProduct} />
      </div>
    ))
  }

  const handleCardClick = (productId) => {
    if (selectedProduct === productId) {
      // Si se hace clic en el producto seleccionado nuevamente, reinicia el contador
      setSelectedProduct(null);
      setSelectedClass('');
    } else {
      setSelectedProduct(productId);
      setSelectedClass('selected');
    }
  };

  const handleAddProductClick = (quantity) => {
    if (quantity > 0 && selectedProduct !== null) {
      const selectedProductData = productData[selectedProduct - 1];
      const { img, quantity: productQuantity, price, id } = selectedProductData;
  
      const selectedProductIndex = cart.findIndex((product) => product.id === id);
      if (selectedProductIndex !== -1) {
        const selectedQuantity = cart[selectedProductIndex].selectedQuantity;
        const maxQuantity = productQuantity - selectedQuantity;
        if (selectedQuantity < maxQuantity) {
          const updatedCart = [...cart];
          updatedCart[selectedProductIndex].selectedQuantity += 1;
          dispatch(addToCart(updatedCart));
        }
      } else {
        const productToAdd = {
          img,
          quantity: productQuantity,
          price,
          id,
          selectedQuantity: 1,
        };
        dispatch(addToCart(productToAdd));
      }
    }
    console.log(cart);
  };
  
  

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="cart">
          <img src={shopping} alt="Carrito" />
          <p className="cart-counter">{cart?.length}</p>
        </div>
      </header>

      <section className="content">
        <div className="store">
          <div className="store-content">
            <h2>Store</h2>
            <hr />
          </div>
          <div className="cards-container">{renderCards()}</div>
        </div>
        <div className="product">
          <div className="product-details">
            {selectedProduct !== null ? (
              <>
                <h2>Product</h2>
                <hr />
              </>
            ) : (
              <>
                <h2 style={{ visibility: 'hidden' }}>Product</h2>
                <hr />
              </>
            )}
          </div>
          <div className="content-product">
            {selectedProduct !== null ? (
              <>
                <div className="display-product-selected">
                  <div className="counter-product">
                    {cart.find((product) => product.id === selectedProduct)
                      ?.selectedQuantity || 0}
                  </div>
                  <img
                    src={productData[selectedProduct - 1].img}
                    alt={`Card ${selectedProduct}`}
                  />
                </div>
                <div className="product-selected">
                  <h3>{productData[selectedProduct - 1].nameProduct}</h3>
                  <h3>${productData[selectedProduct - 1].price}</h3>
                  <div
                    onClick={() =>
                      handleAddProductClick(
                        productData[selectedProduct - 1].quantity
                      )
                    }
                  >
                    +
                  </div>
                  <div>-</div>
                </div>
                <hr style={{ margin: 1 }} />
                <p className="description">
                  {productData[selectedProduct - 1].description}...
                </p>
                <hr />
              </>
            ) : (
              <h2>Please choose a product on the left</h2>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
