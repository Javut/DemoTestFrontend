export const addToCart = (productToAdd) => ({
  type: 'ADD_TO_CART',
  payload: productToAdd,
})

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
})

export const emptyCar = () => ({
  type: 'EMPTY_CART',
})

export const updateQuantity = (productId, quantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: {
    productId,
    quantity,
  },
})
