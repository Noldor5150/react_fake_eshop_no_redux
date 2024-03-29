import React, { useState } from 'react';
import { useFetch } from '../hooks';
import { API_ENDPOINTS } from '../../constants';
import { toggleArrayItem } from '../util';

const DEFAULT_SHOP_CONTEXT = {
  products: [],
  loading: false,
  error: null,
};
const ShopContext = React.createContext(DEFAULT_SHOP_CONTEXT);
function onError() {
  return 'Ooops! Monkeys stole our products! 😱👟';
}

function ShopProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleFavorite = id => {
    setFavorites(toggleArrayItem(favorites, id));
  };

  const addToCart = id => {
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
      setCart(cart.map((item, i) => (i === itemIndex ? { ...item, count: item.count + 1 } : item)));
    } else {
      setCart([...cart, { id, count: 1 }]);
    }
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const { products, loading, error } = useFetch({
    onError,
    src: API_ENDPOINTS.getProducts,
    initialState: DEFAULT_SHOP_CONTEXT.products,
    dataKey: 'products',
  });
  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        favorites,
        loading,
        error,
        addToCart,
        toggleFavorite,
        removeFromCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
export default ShopContext;
export { ShopProvider };
