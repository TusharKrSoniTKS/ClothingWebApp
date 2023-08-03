import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss'

import Button from "../button/button.component";

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassoword,
} from "../../utils/firebase/firebase.util";

const defaultFormFeilds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { displayName, email, password, confirmPassword } = formFeilds;

  console.log(formFeilds);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassoword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFeilds();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encounted an error", error);
      }
    }
  };

  const resetFormFeilds = () => {
    setFormFeilds(defaultFormFeilds);
  };

  const alertfun = () => {
    alert("Hiiii");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFeilds({ ...formFeilds, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with email and password</span>

      <form onSubmit={handleSubmit}>
        {/* <label>Display name</label> */}
        <FormInput
          label= "Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        {/* <label>email</label> */}
        <FormInput
          label= "email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        {/* <label>Password</label> */}
        <FormInput
          label= "Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        {/* <label>confirm Password</label> */}
        <FormInput
          label= "Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
