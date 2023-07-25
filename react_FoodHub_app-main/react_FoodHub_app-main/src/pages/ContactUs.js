import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import contactUsImg from "../assets/images/contact_img.jpg";
import styles from "../styles/contact.module.css";
import { TOAST_DURATION } from "../utils/Constants.js";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCheckoutDisable, setIsCheckoutDisable] = useState(false);

  const navigate = useNavigate();

  const HandleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let error = false;
    if (!name || !email || !message) {
      error = true;
      //alert("Please fill name ,email and message fields !!");
    }
    if (mobileNumber !== "" && mobileNumber.length !== 10) {
      error = true;
      //alert("Please provide valid phone number !!");
    }
    if (!error) {
      //alert("Thank you for your valuable feedback !!");
      setIsCheckoutDisable(true);
      toast.success("Thank you for your valuable feedback !!");
      setTimeout(() => {
        navigate("/", window.scrollTo(0, 0));
      }, TOAST_DURATION + 1000);
    }
  };

  const onHandleChangeNumeric = (e) => {
    let value = e.target.value;
    if (mobileNumber.length === 1 && value === "") {
      setMobileNumber(e.target.value);
    }
    if (!Number(value)) {
      return;
    }
    setMobileNumber(e.target.value);
  };

  const HandleClearButton = () => {
    setName("");
    setEmail("");
    setMobileNumber("");
    setMessage("");
    setIsSubmit(false);
  };
  return (
    <div className={styles.contactUsContainer}>
      <div className={styles.top_item}>
        <img src={contactUsImg} alt="food-img"></img>
        <h1 className={styles.top_text}>We would love to hear from you!</h1>
      </div>
      <div className={styles.bottom_item}>
        <div className={styles.form_div}>
          <form onSubmit={HandleSubmitFeedback}>
            <span
              style={{ color: "red", textAlign: "left", marginLeft: "8px" }}
            >
              *
            </span>
            <input
              className={styles.input_field}
              type="text"
              name="Full Name"
              value={name}
              placeholder={"Full Name"}
              onChange={(e) => setName(e.target.value)}
            />
            <span data-testid="test_name" className={styles.validation_check}>
              {isSubmit && name === "" ? "Enter your name" : ""}
            </span>
            <span
              style={{ color: "red", textAlign: "left", marginLeft: "8px" }}
            >
              *
            </span>
            <input
              className={styles.input_field}
              type="email"
              name="Email Address"
              value={email}
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={styles.validation_check}>
              {isSubmit && email === "" ? "Enter your email address" : ""}
            </span>
            <span style={{ marginBottom: "10px" }}></span>
            <input
              className={styles.input_field}
              type="text"
              maxLength={10}
              name="Mobile Number"
              value={mobileNumber}
              pattern="[0-9]*"
              placeholder="Mobile Number(Optional)"
              onChange={(e) => onHandleChangeNumeric(e)}
            />
            <span data-testid="test_mobile" className={styles.validation_check}>
              {isSubmit && mobileNumber !== "" && mobileNumber.length !== 10
                ? "Enter valid mobile number"
                : ""}
            </span>
            <span
              style={{ color: "red", textAlign: "left", marginLeft: "8px" }}
            >
              *
            </span>
            <textarea
              className={`${styles.input_field} ${styles.input_textArea}`}
              name="subject"
              placeholder="Write Something.."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <span className={styles.validation_check}>
              {isSubmit && message === "" ? "Leave some feedback" : ""}
            </span>
            <div>
              <button
                disabled={isCheckoutDisable}
                data-testid="test_submitBtn"
                className="submit_btnContainer submit_Btn"
              >
                Submit feedback
              </button>
              <button
                type="reset"
                data-testid="test_ClearBtn"
                className="submit_btnContainer clear_Btn"
                onClick={HandleClearButton}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
        <div className={styles.statement}>
          <p style={{ fontWeight: "bold", fontSize: "25px" }}>
            Issue with your live order?
          </p>
          <span>
            Click on the 'Support' or 'Online ordering help' section in your app
            to connect to our customer support team.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
