import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

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
const Signup = ({ setlogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const signUpHandle = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setlogin(true);
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage); // ..
      });
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
          <button className="bluebut" onClick={() => signUpHandle(email, pass)}>
            Sign Up
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
