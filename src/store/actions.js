export const addProduct = (product) => ({
    type: 'ADD_PRODUCT',
    payload: product,
});

export const deleteProduct = (productId) => ({
    type: 'DELETE_PRODUCT',
    payload: productId,
});

export const emptyCar = () => ({
    type: 'EMPTY_CAR',
})

export const updateProductAmount = (productId, quantity) => ({
   type: 'UPDATE_PRODUCT_AMOUNT',
   payload: {
    productId,
    quantity
   },
});