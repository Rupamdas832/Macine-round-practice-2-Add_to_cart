import { createContext, useContext, useReducer } from 'react';
import ProductReducer from './productReducer';
import productsData from '../Data/productsData.json';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const initialValue = {
    products: productsData.products.map(product => {
      return { ...product, inCart: false };
    }),
    cart: [],
    saveLater: [],
  };
  const [state, dispatch] = useReducer(ProductReducer, initialValue);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
