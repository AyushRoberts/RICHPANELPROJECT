import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyCGmv-V-_vxvYCePBJ3zKeHbNa3oq1PwUQ",
  authDomain: "subscription20bcs7165.firebaseapp.com",
  projectId: "subscription20bcs7165",
  storageBucket: "subscription20bcs7165.appspot.com",
  messagingSenderId: "580129118396",
  appId: "1:580129118396:web:735c45bbbbe93c741dd8b9",
  databaseURL: "https://subscription20bcs7165-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Login = ({ setlogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const loginHandle = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  return (
    <div className="maincont">
      <div className="loginForm">
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
          />
          Remember Me
        </label>
        <button className="bluebut" onClick={() => loginHandle(email, pass)}>
          Login
        </button>
        <div className="switchformcont">
          New to MyApp?{" "}
          <span className="switchform" onClick={() => setlogin(false)}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
