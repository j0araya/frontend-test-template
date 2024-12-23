import { Game } from "@/utils/endpoint";
import { useState, useEffect } from "react";

const CART = "cart";

type CartGame = {
  [key: string]: Game;
};

const useCart = () => {
  const [cart, setCart] = useState<CartGame>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART);
      return savedCart ? JSON.parse(savedCart) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem(CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Game) => {
    setCart((c) => ({ ...c, [`${item.id}`]: item }));
  };

  const removeFromCart = (itemId: string) => {
    console.log("itemID", itemId);
    if (cart[itemId]) {
      delete cart[itemId];
      setCart({ ...cart });
    }
  };

  return { cart, addToCart, removeFromCart };
};

export default useCart;
