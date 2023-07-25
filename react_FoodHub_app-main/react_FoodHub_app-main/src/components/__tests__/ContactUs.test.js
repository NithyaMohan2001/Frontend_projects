import { AuthProvider } from "../../utils/userContext.js";
import store from "../../utils/Store.js";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { fireEvent, render } from "@testing-library/react";
import ContactUs from "../../pages/ContactUs.js";
import { ToastContainer, toast } from "react-toastify";

global.scrollTo = jest.fn(() => "scroll");

test("Click on submit button alert message should be displayed ", async () => {
  const contact = render(
    <StaticRouter>
      <ToastContainer />
      <Provider store={store}>
        <AuthProvider>
          <ContactUs />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const submitBtn = contact.getByTestId("test_submitBtn");

  const InName = contact.getByPlaceholderText("Full Name");
  fireEvent.change(InName, { target: { value: "abc" } });
  // expect(InName.value).toBe("abc");

  const InEmail = contact.getByPlaceholderText("Email Address");
  fireEvent.change(InEmail, { target: { value: "abc@gg" } });
  //expect(InEmail.value).toBe("abc@gg");

  const InTextMsg = contact.getByPlaceholderText("Write Something..");
  fireEvent.change(InTextMsg, { target: { value: "hello" } });
  //expect(InTextMsg.value).toBe("hello");

  fireEvent.click(submitBtn);

  let element = await contact.findByText(
    "Thank you for your valuable feedback !!"
  );
  expect(element).not.toBe("");
  /*  expect(global.alert).toHaveBeenCalledWith(
    "Thank you for your valuable feedback !!"
  ); */
  //expect(global.scrollTo).toBeCalledWith(0, 0);
});

test("Click on clear button all fields should be emplty ", () => {
  const contact = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <ContactUs />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const clearBtn = contact.getByTestId("test_ClearBtn");

  const InName = contact.getByPlaceholderText("Full Name");
  fireEvent.change(InName, { target: { value: "abc" } });

  const InEmail = contact.getByPlaceholderText("Email Address");
  fireEvent.change(InEmail, { target: { value: "abc@gg" } });

  const InTextMsg = contact.getByPlaceholderText("Write Something..");
  fireEvent.change(InTextMsg, { target: { value: "hello" } });

  fireEvent.click(clearBtn);
  expect(InName.value).toBe("");
  expect(InEmail.value).toBe("");
  expect(InTextMsg.value).toBe("");
});

test("Mobile number should be in integer format ", () => {
  const contact = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <ContactUs />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );

  const InMobileNumber = contact.getByPlaceholderText(
    "Mobile Number(Optional)"
  );
  fireEvent.change(InMobileNumber, { target: { value: "12" } });
  expect(InMobileNumber.value).toBe("12");

  fireEvent.change(InMobileNumber, { target: { value: "12a" } });
  expect(InMobileNumber.value).toBe("12");

  fireEvent.change(InMobileNumber, { target: { value: "1" } });
  fireEvent.change(InMobileNumber, { target: { value: "" } });
  expect(InMobileNumber.value).toBe("");
});

test("Click on submit button name ,email and text fields should be filled ", () => {
  const contact = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <ContactUs />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const submitBtn = contact.getByTestId("test_submitBtn");

  fireEvent.click(submitBtn);
  const spName = contact.getByTestId("test_name");
  expect(spName.innerHTML).toBe("Enter your name");
});

test("Click on submit button mobile number length should be in 10", () => {
  const contact = render(
    <StaticRouter>
      <Provider store={store}>
        <AuthProvider>
          <ContactUs />
        </AuthProvider>
      </Provider>
    </StaticRouter>
  );
  const submitBtn = contact.getByTestId("test_submitBtn");

  const InMobileNumber = contact.getByPlaceholderText(
    "Mobile Number(Optional)"
  );
  fireEvent.change(InMobileNumber, { target: { value: "12" } });

  fireEvent.click(submitBtn);

  const spMobile = contact.getByTestId("test_mobile");
  expect(spMobile.innerHTML).toBe("Enter valid mobile number");
});
