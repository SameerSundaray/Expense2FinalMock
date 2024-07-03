import React, { useContext, useRef, useState } from "react";
import "../SignUp/Signin.css";
// import Profile from "../Profile/Profile";
// import { CgProfile } from "react-icons/cg";
import AuthContext from "../SignupProvider/Signinprovider";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [profileInComplete, setProfileInComplete] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [emailVerification, setEmailVerification] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const navigate = useNavigate();

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitting = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmPassRef.current
      ? confirmPassRef.current.value
      : null;

    if (!isLogin && password !== confirm) {
      console.error("PASSWORDS DO NOT MATCH");
      return;
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbj2ZqFZQTWUUSIu5W6zB9GdR8kjJlTWI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbj2ZqFZQTWUUSIu5W6zB9GdR8kjJlTWI";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setProfileInComplete(true);
          setEmailVerification(false);
          return res.json();
        } else {
          return res.json().then((data) => {
            const errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idtoken);
        navigate("/");
      })
      .catch((err) => {});
  };

  // const emailVerifyHandling = () => {
  //   let url =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDbj2ZqFZQTWUUSIu5W6zB9GdR8kjJlTWI";
  //   fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       requestType: "VERIFY_EMAIL",
  //       idToken: authCtx.token,
  //     }),
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         setEmailVerification(true);
  //         alert("VERIFICATION EMAIL SENT = PLEASE CHECK YOUR EMAIL INBOX");
  //         return res.json();
  //       } else {
  //         return res.json().then((data) => {
  //           const errorMessage = "ERROR verification email";
  //           throw new Error(errorMessage);
  //         });
  //       }
  //     })
  //     .then((data) => {})
  //     .catch((err) => {});
  // };

  const forgotclick = () => {
    navigate("/forgot");
  };

  const homerender = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="All_sign_in">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitting} className="form_elements">
          <input type="email" placeholder="E-MAIL" ref={emailRef} required />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPassRef}
              required
            />
          )}

          <button type="submit" className="btn" onClick={homerender}>
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {isLogin && (
            <p className="forgot" onClick={forgotclick}>
              Forgot password
            </p>
          )}
        </form>
        <button className="have" onClick={switchHandler}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
}
