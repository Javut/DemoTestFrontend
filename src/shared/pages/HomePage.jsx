import React, { useState } from 'react'
import '../../styles/homepage.css'
import logo from '../utils/logo.png'
import shopping from '../utils/shopping.png'
import { data } from '../../data'

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedClass, setSelectedClass] = useState('')
  const [counterProduct, setCounterProduct] = useState(0);

  const renderCards = () => {
    return data.map((product) => (
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
    setSelectedProduct(productId)
    setSelectedClass('selected')
  }

  const handleAddProductClick = (quantity) => {
    if(quantity>0){
      setCounterProduct(counterProduct+1);
      data[selectedProduct-1].quantity - 1
    }
  }

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="cart">
          <img src={shopping} alt="Carrito" />
          <span className="cart-counter">3</span>
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
                  <div className="counter-product">{counterProduct}</div>
                  <img
                    src={data[selectedProduct - 1].img}
                    alt={`Card ${selectedProduct}`}
                  />
                </div>
                <div className="product-selected">
                  <h3>{data[selectedProduct - 1].nameProduct}</h3>
                  <h3>${data[selectedProduct - 1].price}</h3>
                  <div
                   onClick={() => handleAddProductClick(data[selectedProduct-1].quantity)}
                  >+</div>
                  <div>-</div>
                </div>
                <hr style={{ margin: 1 }} />
                <p className="description">
                  {data[selectedProduct - 1].description}...
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
