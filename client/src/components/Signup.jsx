import React, { useEffect, useState } from "react";
import { auth, signUpHandle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Signup = ({ setlogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      setlogin(true);
    }
  }, [user]);
  return (
    <>
      <div className="maincont">
        <div className="signUpForm">
          <p>Create Account</p>
          <label className="inputlabel" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
          <label className="inputlabel" htmlFor="em">
            E-Mail
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="em"
          />
          <label className="inputlabel" htmlFor="pw">
            Password
          </label>
          <input
            onChange={(e) => setPass(e.target.value)}
            type="password"
            name="password"
            id="pw"
          />
          <label className="rememberme" htmlFor="remember">
            <input
              className="check"
              type="checkbox"
              name="remember"
              id="remember"
            />
            Remember Me
          </label>
          <button
            className="bluebut"
            onClick={(e) => {
              signUpHandle(e, name, email, pass);
            }}
          >
            Get Started
          </button>
          <div className="switchformcont">
            Already have an account?{" "}
            <span className="switchform" onClick={() => setlogin(true)}>
              Login
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
