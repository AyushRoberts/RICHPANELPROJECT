import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  loginHandle,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Login = ({ setlogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user] = useAuthState(auth);
  const n = useNavigate();
  useEffect(() => {
    document.getElementById("remember").checked = "true";
    setPersistence(auth, browserLocalPersistence);
  }, []);

  useEffect(() => {
    if (user) n("/subscribe");
  }, [user]);
  const handleRemember = () => {
    const ischecked = document.getElementById("remember").checked;
    ischecked
      ? setPersistence(auth, browserLocalPersistence)
      : setPersistence(auth, browserSessionPersistence);
  };
  return (
    <div className="maincont">
      <form className="loginForm">
        <p>Login To Your Account</p>
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
            onClick={handleRemember}
          />
          Remember Me
        </label>
        <button
          type="submit"
          className="bluebut"
          onClick={(e) => loginHandle(e, email, pass)}
        >
          Login
        </button>
        <div className="switchformcont">
          New to MyApp?{" "}
          <span className="switchform" onClick={() => setlogin(false)}>
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
