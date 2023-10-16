import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [login, setLogin] = useState(false);
  return (
    <>
      {login ? <Login setlogin={setLogin} /> : <Signup setlogin={setLogin} />}
    </>
  );
};

export default Auth;
