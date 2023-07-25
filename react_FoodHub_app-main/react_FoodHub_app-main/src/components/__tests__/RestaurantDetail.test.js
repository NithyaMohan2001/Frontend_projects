import { AuthProvider } from "../../utils/userContext.js";
import store from "../../utils/Store.js";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import RestaurantDetail from "../RestaurantDetail.js";
import { RESTAURANT_MENU } from "../../mocks/DummyRestaurantList.js";
import { act } from "react-dom/test-utils";
import Header from "../Header";

global.fetch = jest.fn(() => {
  return Promise.resolve({ json: () => Promise.resolve(RESTAURANT_MENU) });
});

test("Shimmer should be loaded first", async () => {
  const restMenu = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <RestaurantDetail />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );

  const shimmer = restMenu.getByTestId("test_shimmer");
  expect(shimmer.children.length).toBe(20);
});

test("Restaurant Outer Detail should be loaded", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <RestaurantDetail />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });
  await waitFor(() => expect(screen.getByTestId("test_rest_outerMenu")));
  const restaurant_outer = screen.getByTestId("test_rest_outerMenu");
  expect(restaurant_outer.children.length).not.toBe(0);
});

test("Restaurant Menu should be loaded", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <RestaurantDetail />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });
  await waitFor(() => expect(screen.getByTestId("test_rest_Menu")));
  const restaurant_menu = screen.getByTestId("test_rest_Menu");
  expect(restaurant_menu.children.length).not.toBe(0);
});

test("Cart should be updated when item added", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <Header />
            <RestaurantDetail />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });
  await waitFor(() => expect(screen.getByTestId("test_rest_Menu")));
  const rest_menu = screen.getByTestId("test_rest_Menu");

  const addBtn = rest_menu.getElementsByClassName("test_menu_btn");
  fireEvent.click(addBtn[0]);
  fireEvent.click(addBtn[1]);
  fireEvent.click(addBtn[3]);

  const cart = screen.getByTestId("test_cart");
  expect(cart.innerHTML).toBe("3");
});

test("Cart should be updated when click on pluse and minus button", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <Header />
            <RestaurantDetail />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });
  await waitFor(() => expect(screen.getByTestId("test_rest_Menu")));
  const rest_menu = screen.getByTestId("test_rest_Menu");

  const addBtn = rest_menu.getElementsByClassName("test_menu_btn");
  //fireEvent.click(addBtn[0]);
  //expect(addBtn[0].children.length).toBe(3);

  fireEvent.click(addBtn[0].children[2]);
  fireEvent.click(addBtn[0].children[0]);

  /* fireEvent.click(addBtn[6]);
  fireEvent.click(addBtn[7]);
 */
  const cart = screen.getByTestId("test_cart");
  expect(cart.innerHTML).toBe("3");
});
