import { AuthProvider } from "../../utils/userContext.js";
import store from "../../utils/Store.js";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { fireEvent, render } from "@testing-library/react";
import Login from "../../pages/Login.js";
import Header from "../Header.js";
import { ToastContainer } from "react-toastify";

global.scrollTo = jest.fn(() => "scrollTo");

test("Click on submit button alert message should be displayed ", async () => {
  const login = render(
    <StaticRouter>
      <ToastContainer />
      <Provider store={store}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const submitBtn = login.getByTestId("test_submitBtn");

  const InEmail = login.getByPlaceholderText("Email Address");
  fireEvent.change(InEmail, { target: { value: "abc@gg" } });

  const InPassword = login.getByPlaceholderText("Password");
  fireEvent.change(InPassword, { target: { value: "hello" } });

  fireEvent.click(submitBtn);
  let element = await login.findByText(
    "The Email you entered is not registered!!"
  );
  expect(element).not.toBe("");

  /* expect(global.alert).toHaveBeenCalledWith(
    "The Email you entered is not registered!!"
  ); */
});

test("Click on submit button email and password should be filled ", () => {
  const login = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const submitBtn = login.getByTestId("test_submitBtn");

  fireEvent.click(submitBtn);
  const spEmail = login.getByTestId("test_email");
  expect(spEmail.innerHTML).toBe("Enter your email address");

  const spPassword = login.getByTestId("test_password");
  expect(spPassword.innerHTML).toBe("Enter password");
});

test("Click on login as guest user name should be displayed", () => {
  const login = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Login />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const guestBtn = login.getByTestId("test_guest");

  fireEvent.click(guestBtn);

  const auth = login.getByTestId("test_auth");
  expect(auth.innerHTML).not.toBe("");

  /* expect(global.scroll).toBeCalledWith(0, 0);
  expect(aboutus.href.includes("/about")).toBe(true);
 */
});
