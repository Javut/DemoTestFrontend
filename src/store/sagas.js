import { takeLatest, put, select } from 'redux-saga/effects';
import { addToCart, updateQuantity, removeFromCart, emptyCart } from './reducers';

function* addToCartSaga(action) {
  const productToAdd = action.payload;

  const cart = yield select((state) => state.cart.products);
  const existingProduct = cart.find((item) => item.id === productToAdd.id);

  if (existingProduct) {
    // Si el producto ya está en el carrito, actualizar su cantidad
    const newQuantity = existingProduct.quantity + 1;
    yield put(updateQuantity({ productId: existingProduct.id, quantity: newQuantity }));
  } else {
    // Si el producto no está en el carrito, agregarlo
    yield put(addToCart(productToAdd));
  }
}

function* removeFromCartSaga(action) {
  const productId = action.payload;

  yield put(removeFromCart(productId));
}

function* clearCartSaga() {
  yield put(emptyCart());
}

function* updateProductQuantitySaga(action) {
  const { productId, quantity } = action.payload;

  yield put(updateQuantity({ productId, quantity }));
}

export default function* rootSaga() {
  yield takeLatest('ADD_TO_CART', addToCartSaga);
  yield takeLatest('REMOVE_FROM_CART', removeFromCartSaga);
  yield takeLatest('EMPTY_CART', clearCartSaga);
  yield takeLatest('UPDATE_QUANTITY', updateProductQuantitySaga);
}
