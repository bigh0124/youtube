import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import data from "../data/items.json";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShopppingCartContext = {
  getItemQuantity(id: number): number;
  increaseCartQuantity(id: number): void;
  decreaseCartQuantity(id: number): void;
  removeFromCart(id: number): void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
};

const ShoppingCartContext = createContext({} as ShopppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", () => []);
  const [isOpen, setIsOpen] = useState(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === id) === undefined) {
        return [...prev, { id, quantity: 1 }];
      } else {
        return prev.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.quantity === 1)) {
        return prev.filter((item) => item.id !== id);
      } else {
        return prev.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = data.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isOpen,
      }}
    >
      {children}
      <ShoppingCart totalPrice={totalPrice} />
    </ShoppingCartContext.Provider>
  );
};
