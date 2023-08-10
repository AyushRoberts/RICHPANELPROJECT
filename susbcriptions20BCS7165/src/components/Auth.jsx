import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = ({ user, setUser }) => {
  const [login, setLogin] = useState(false);
  return (
    <>
      {login ? (
        <Login setUser={setUser} setlogin={setLogin} />
      ) : (
        <Signup setlogin={setLogin} />
      )}
    </>
  );
};

export default Auth;
