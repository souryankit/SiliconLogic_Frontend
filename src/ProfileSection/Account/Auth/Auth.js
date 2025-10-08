import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, updateUserDatabase } from "../../../Utils/firebase";
import InputControl from "./InputControl/InputControl";
import styles from "./Auth.module.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSelect,
  MDBRadio,
  MDBFile
} from 'mdb-react-ui-kit';


function Auth(props) {
  const isSignup = props.signup ? true : false;
  const navigate = useNavigate();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleLogin = () => {
    if (!values.email || !values.password) {
      setErrorMsg("All fields required*");
      return;
    }

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        setSubmitButtonDisabled(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleSignup = () => {
    if (!values.first_name || !values.email || !values.password) {
      setErrorMsg("All fields required*");
      return;
    }

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (response) => {
        const userId = response.user.uid;
        await updateUserDatabase(
          { first_name: values.first_name, last_name: values.last_name, email: values.email, phone: values.phone,  },
          userId
        );
        setSubmitButtonDisabled(false);
        navigate("/dashboard/account");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleSubmission = (event) => {
    event.preventDefault();

    if (isSignup) handleSignup();
    else handleLogin();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmission}>
        <p className={styles.smallLink}> <Link to="/">{"< Back to Home"}</Link> </p>
        <p className={styles.heading}>{isSignup ? "Signup" : "Login"}</p>

        {isSignup && (
          <>
            <div className="row">
              <div className="col">
                <InputControl
                  label="First Name *"
                  placeholder="Enter your first name"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, first_name: event.target.value }))
                  } />
              </div>
              <div className="col">
                <InputControl
                  label="Last Name *"
                  placeholder="Enter your last name"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, last_name: event.target.value }))
                  } />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputControl
                  label="Email ID *"
                  placeholder="Enter your email ID"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
              </div>
              <div className="col">
                <InputControl
                  label="Phone No *"
                  placeholder="Enter your phone number"
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, phone: event.target.value }))
                  } />
              </div>
            </div>
          </>
        )}
        {!isSignup && (
          <InputControl
            label="User ID *"
            placeholder="Enter your user ID"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />)}
        <div className="row">
          <div className="col">
            <InputControl
              label="Password *"
              placeholder="Enter your password"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, password: event.target.value }))
              }
              isPassword
            />
          </div>
          {isSignup && (
            <div className="col">
              <InputControl
                label="Confirm Password *"
                placeholder="Confirm your password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, password: event.target.value }))
                }
                isPassword
              />
            </div>
          )}
        </div>
        {isSignup && (
          <div className="row">           
            <MDBCol md='12' className='mb-0'>
              <h6 className="fw">Role * </h6>
              <MDBRadio name='inlineRadio' id='inlineRadio1' value='Student' label='Student' inline />
              <MDBRadio name='inlineRadio' id='inlineRadio2' value='Professional' label='Professional' inline />
              <MDBRadio name='inlineRadio' id='inlineRadio3' value='Member' label='Member' inline />
              
            </MDBCol>             
          </div>
        )}
        <p className={styles.error}>{errorMsg}</p>

        <button type="submit" disabled={submitButtonDisabled}>
          {isSignup ? "Signup" : "Login"}
        </button>

        <div className={styles.bottom}>
          {isSignup ? (
            <p>
              Already have an account ? <Link to="/login">Login here</Link>
            </p>
          ) : (
            <p>
              New here ? <Link to="/signup">Create an account</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Auth;
