const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            return { ...product, inCart: true };
          }
          return product;
        }),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
        products: state.products.map(product => {
          if (product.id === action.payload) {
            return { ...product, inCart: false };
          }
          return product;
        }),
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    case 'ADD_TO_SAVE_LATER':
      return {
        ...state,
        saveLater: [...state.saveLater, action.payload],
        cart: state.cart.filter(item => item.id !== action.payload.id),
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            return { ...product, inCart: false };
          }
          return product;
        }),
      };
    case 'REMOVE_FROM_SAVE_LATER':
      return {
        ...state,
        saveLater: state.saveLater.filter(item => item.id !== action.payload),
      };
    case 'MOVE_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
        saveLater: state.saveLater.filter(
          item => item.id !== action.payload.id
        ),
        products: state.products.map(product => {
          if (product.id === action.payload.id) {
            return { ...product, inCart: true };
          }
          return product;
        }),
      };
    default:
      return state;
  }
};

export default ProductReducer;
