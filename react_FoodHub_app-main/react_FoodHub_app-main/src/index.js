import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error.js";
import { AboutUs, SearchBar, Cart, Login } from "./pages/index.js";
//import RestaurantDetail from "./components/RestaurantDetail.js";
import Home from "./components/Home";

const ContactUs = lazy(() => import("./pages/ContactUs"));
const RestaurantDetail = lazy(() => import("./components/RestaurantDetail.js"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <SearchBar /> },
      { path: "/about", element: <AboutUs /> },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>Loading ...</h1>}>
            <ContactUs />
          </Suspense>
        ),
      },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      {
        path: "/restaurant/:id",
        element: (
          <Suspense fallback={<h1>Loading ...</h1>}>
            <RestaurantDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
