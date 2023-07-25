import { AuthProvider } from "../../utils/userContext.js";
import store from "../../utils/Store.js";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import Cart from "../../pages/Cart.js";
import Header from "../Header.js";
import RestaurantDetail from "../RestaurantDetail.js";
import { RESTAURANT_MENU } from "../../mocks/DummyRestaurantList.js";
import { act } from "react-dom/test-utils";

global.fetch = jest.fn(() => {
  return Promise.resolve({ json: () => Promise.resolve(RESTAURANT_MENU) });
});

global.scrollTo = jest.fn(() => "scrollTo");

test("Cart should be empty if no item is selected from restaurant menu.", () => {
  const cart = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Cart />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const cartEmpty = cart.getByTestId("test_cartEmpty");
  expect(cartEmpty.children[1].innerHTML).toBe("Your cart is empty");
});

test("Click on see restaurant near you  should be on home page.", () => {
  const cart = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Cart />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const cartEmpty = cart.getByTestId("test_cartEmpty");
  expect(cartEmpty.children[1].innerHTML).toBe("Your cart is empty");

  fireEvent.click(cart.getByTestId("test_restaurant"));
  expect(global.scrollTo).toBeCalledWith(0, 0);
});

test("Cart page should be updated when added item from restaurant menu", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <Header />
            <RestaurantDetail />
            <Cart />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });
  await waitFor(() => expect(screen.getByTestId("test_rest_Menu")));
  const rest_menu = screen.getByTestId("test_rest_Menu");

  const addBtn = rest_menu.getElementsByClassName("test_menu_btn");
  fireEvent.click(addBtn[0]);
  fireEvent.click(addBtn[0].children[2]);
  fireEvent.click(addBtn[0].children[2]);

  fireEvent.click(screen.getByTestId("test_cartPage"));

  await waitFor(() => expect(screen.getByTestId("test_cartFilled")));
  expect(screen.getByTestId("test_cartFilled").children.length).not.toBe(0);

  //should be cleared otherwise screen component has added item in cart
  //fireEvent.click(screen.getByTestId("test_clearBtn"));
});

test("Add item when click on pluse button", () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Cart />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );

  const cartFilled = screen.getByTestId("test_cartFilled");
  const addCartItem = cartFilled.getElementsByClassName("test_itemUpdate");
  fireEvent.click(addCartItem[0].children[2]);
  expect(addCartItem[0].children[1].innerHTML).toBe("4");
  //should be cleared otherwise screen component has added item in cart
  //fireEvent.click(screen.getByTestId("test_clearBtn"));
});

test("remove item when click on minus button", () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Cart />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const cartFilled = screen.getByTestId("test_cartFilled");
  const removeCartItem = cartFilled.getElementsByClassName("test_itemUpdate");
  fireEvent.click(removeCartItem[0].children[0]);
  expect(removeCartItem[0].children[1].innerHTML).toBe("3");
  //should be cleared otherwise screen component has added item in cart
  //fireEvent.click(screen.getByTestId("test_clearBtn"));
});

test("Click on clear btn cart should be empty", () => {
  render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Cart />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );

  fireEvent.click(screen.getByTestId("test_clearBtn"));

  // check on header cart icon item number should be 0
  const cartItem = screen.getByTestId("test_cart");
  expect(cartItem.innerHTML).toBe("0");

  const cartEmpty = screen.getByTestId("test_cartEmpty");
  expect(cartEmpty.children[1].innerHTML).toBe("Your cart is empty");
});
