import { renderHook, act } from "@testing-library/react";
import useCart from "./useCart";
import { allGames } from "../utils/endpoint";

describe("useCart Hook", () => {
  test("should add item to cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(allGames[0]);
    });
    let items = Object.values(result.current.cart).map((v) => v);
    const item = result.current.cart[allGames[0].id];
    expect(items.length).toBe(1);
    expect(item.id).toBe(allGames[0].id);

    act(() => {
      result.current.addToCart(allGames[1]);
    });
    items = Object.values(result.current.cart).map((v) => v);
    expect(items.length).toBe(2);
  });

  test("should remove item from cart", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(allGames[0]);
      result.current.addToCart(allGames[1]);
      result.current.removeFromCart(allGames[0].id);
    });
    const item = result.current.cart[allGames[1].id];
    const items = Object.values(result.current.cart).map((v) => v);
    expect(items.length).toBe(1);
    expect(item.id).toBe(allGames[1].id);
  });
});
