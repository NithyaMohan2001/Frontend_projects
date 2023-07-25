import Header from "./Header.js";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../utils/userContext.js";
import store from "../utils/Store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_DURATION } from "../utils/Constants.js";

const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Outlet />
          <Footer />
        </AuthProvider>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={TOAST_DURATION}
        closeOnClick="true"
        className="toast_design"
      />
    </div>
  );
};

export default App;
