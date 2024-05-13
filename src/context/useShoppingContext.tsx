import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useLocalStorage } from "@/hooks";
import { calculateDiscount } from "@/helpers";
import type { CartTypeTemplate, ShoppingState } from "../types/state";
import type { DishTypeTemplate } from "@/types/food";

const INIT_STATE: ShoppingState = {
  cartItems: [],
  wishlists: [],
  addToCart: () => {},
  toggleToWishlist: () => {},
  isInWishlist: () => false,
  isInCart: () => false,
  removeFromCart: () => {},
  updateQuantityForDish: () => {},
  getCalculatedOrder: () => {
    return {
      orderTotal: 0,
      tax: 0,
      total: 0,
      totalDiscount: 0,
    };
  },
  getCartItemById: () => undefined,
};

const ShopContext = createContext<ShoppingState | undefined>(undefined);

export const useShoppingContext = (): ShoppingState => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within an ShopProvider");
  }
  return context;
};

const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useLocalStorage<ShoppingState>(
    "__Yum_Next_Session__",
    INIT_STATE
  );

  const addToCart = (dish: DishTypeTemplate, quantity: number): void => {
    const cartItems = state.cartItems;
    if (isInCart(dish)) {
      return;
    }
    cartItems.push({
      id: state.cartItems.length + 1,
      dish: dish,
      quantity: quantity,
      dish_id: dish.id,
    });
    updateState({ cartItems });
  };

  const getCalculatedOrder = useCallback(() => {
    let cartTotal = 0,
      cartDiscount = 0;

    state.cartItems.forEach((cart) => {
      cartDiscount += calculateDiscount(cart.dish!) * cart.quantity;
      cartTotal += cart.dish!.price * cart.quantity;
    });

    const cartAmount = cartTotal - cartDiscount;
    const tax = cartAmount * 0.18;

    return {
      total: cartTotal,
      totalDiscount: cartDiscount,
      tax: tax,
      orderTotal: cartAmount + tax,
    };
  }, [state.cartItems]);

  const getCartItemById = (
    dish: DishTypeTemplate
  ): CartTypeTemplate | undefined => {
    return state.cartItems.find((item) => item.dish_id == dish.id);
  };

  const removeFromCart = (dish: DishTypeTemplate): void => {
    let cartItems = state.cartItems;
    cartItems = cartItems.filter((cart) => cart.dish_id != dish.id);
    updateState({ cartItems });
  };

  const isInCart = (dish: DishTypeTemplate): boolean => {
    return (
      state.cartItems.find(
        (wishlistDish) => wishlistDish?.dish_id == dish?.id
      ) != null
    );
  };

  const isInWishlist = (dish: DishTypeTemplate): boolean => {
    return (
      state.wishlists.find((wishlistDish) => wishlistDish?.id == dish?.id) !=
      null
    );
  };

  const updateQuantityForDish = (
    dish: DishTypeTemplate,
    quantity: number
  ): void => {
    updateState({
      cartItems: state.cartItems.map((cartItem) => {
        if (cartItem.dish_id == dish.id) {
          return {
            ...cartItem,
            quantity: quantity,
          };
        }
        return cartItem;
      }),
    });
  };

  const toggleToWishlist = (dish: DishTypeTemplate): void => {
    let wishlists = state.wishlists;
    if (isInWishlist(dish)) {
      wishlists = wishlists.filter((p) => p.id != dish.id);
    } else {
      wishlists.push(dish);
    }
    updateState({ wishlists });
  };

  const updateState = (changes: Partial<ShoppingState>): void =>
    setState({ ...state, ...changes });

  return (
    <ShopContext.Provider
      value={useMemo(
        () => ({
          ...state,
          addToCart,
          toggleToWishlist,
          isInWishlist,
          isInCart,
          removeFromCart,
          updateQuantityForDish,
          getCalculatedOrder,
          getCartItemById,
        }),
        [state, isInWishlist, isInCart]
      )}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopProvider;
