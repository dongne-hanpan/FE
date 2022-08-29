import React, { useState } from "react";
import Signin from "../components/register/Signin";
import Signup from "../components/register/Signup";

const Register = () => {
  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignun] = useState(true);
  return (
    <div>
      {openSignin && <Signin />}
      {openSignup && <Signup />}
    </div>
  );
};

export default Register;
