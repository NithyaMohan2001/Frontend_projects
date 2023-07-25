import { AuthProvider } from "../../utils/userContext.js";
import store from "../../utils/Store.js";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { fireEvent, render } from "@testing-library/react";
import Footer from "../Footer.js";

global.scroll = jest.fn();

test("Click on about us link go to about us page", () => {
  const footer = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Footer />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const aboutus = footer.getByTestId("test_aboutus");
  fireEvent.click(aboutus);
  expect(global.scroll).toBeCalledWith(0, 0);
  expect(aboutus.href.includes("/about")).toBe(true);
});

test("Click on help & support should go to contact page", () => {
  const footer = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Footer />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const contact = footer.getByTestId("test_contact");
  fireEvent.click(contact);
  expect(global.scroll).toBeCalledWith(0, 0) &&
    expect(contact.href.includes("/contact")).toBe(true);
});

test("Click on site logo go to home page", () => {
  const footer = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <Footer />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const home = footer.getByTestId("test_logo");
  fireEvent.click(home);
  expect(global.scroll).toBeCalledWith(0, 0);
  expect(home.children[0].src).toBe("http://localhost/dummy.jpg");
});
