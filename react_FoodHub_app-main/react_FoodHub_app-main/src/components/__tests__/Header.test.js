import { render } from "@testing-library/react";
import Header from "../Header";
import { AuthProvider } from "../../utils/userContext.js";
import store from "../../utils/Store.js";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";

//check logo render or not
test("Logo should load on rendering header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const logo = header.getAllByTestId("test_logo");
  //console.log(logo[0]);
  expect(logo[0].src).toBe("http://localhost/dummy.jpg");
});

//check cart should be 0 when rendering header
test("Cart should be empty when rendering header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );

  const cart = header.getByTestId("test_cart");
  expect(cart.innerHTML).toBe("0");
});

//user name not displayed when rendering header
test("User name should not be displayed when rendering header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );

  const auth = header.getByTestId("test_auth");
  expect(auth.innerHTML).toBe("");
});

//login button present when rendering header
test("Login button should be there when rendering header", () => {
  const header = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );

  const loginBtn = header.getByTestId("test_loginBtn");
  //console.log(loginBtn);
  expect(loginBtn.innerHTML).toBe("Log In");
});
