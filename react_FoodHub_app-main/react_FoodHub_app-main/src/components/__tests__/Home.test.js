import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AuthProvider } from "../../utils/userContext.js";
import store from "../../utils/Store.js";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import Home from "../Home.js";
import { ALL_RESTAURANT_LIST } from "../../mocks/DummyRestaurantList.js";
import { act } from "react-dom/test-utils";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(ALL_RESTAURANT_LIST),
  });
});

test("Shimmer should be loaded on home ", async () => {
  const home = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const shimmer = home.getByTestId("test_shimmer");
  expect(shimmer.children.length).toBe(20);
});

test("Restaurants should be loaded on home ", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });

  //await waitFor(() => expect(screen.getByTestId("test_restaurant_list")));

  const restaurants = screen.getByTestId("test_restaurant_list");
  expect(restaurants.children.length).toBe(15);
});

test("Searched restaurants should be loaded on home ", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });

  //await waitFor(() => expect(screen.getByTestId("test_restaurant_list")));
  const searchInput = screen.getByTestId("test_search_input");
  fireEvent.change(searchInput, { target: { value: "burger" } });

  fireEvent.click(screen.getByTestId("test_search_btn"));
  const restaurants = screen.getByTestId("test_restaurant_list");
  expect(restaurants.children.length).not.toBe(0);
});

test("Search restaurant not exist display text", async () => {
  await act(async () => {
    render(
      <StaticRouter>
        <Provider store={store}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </Provider>
      </StaticRouter>
    );
  });

  // when act is used it will sync data with page so no need to put waitfor here
  //await waitFor(() => expect(screen.getByTestId("test_restaurant_list")));

  const searchInput = screen.getByTestId("test_search_input");
  fireEvent.change(searchInput, { target: { value: "446gr" } });

  fireEvent.click(screen.getByTestId("test_search_btn"));

  const restaurants = screen.getByTestId("test_rest_not_searched");
  expect(restaurants.innerHTML).toBe("Restaurent does not found !!");
});
