import React, { useState } from "react";
import Signin from "../components/register/Signin";
import Signup from "../components/register/Signup";

const Register = () => {
  const [openSignin, setOpenSignin] = useState(true);
  const [openSignup, setOpenSignun] = useState(false);
  return (
    <div>
      {openSignin && <Signin />}
      {openSignup && <Signup />}
    </div>
  );
};

export default Register;
