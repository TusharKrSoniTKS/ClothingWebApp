import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPasswordUser, signInWithGooglePopup } from "../../utils/firebase/firebase.util";
import "./sign-in-form.styles.scss"

const defaultFormFeilds = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFeilds, setFromFeilds] = useState(defaultFormFeilds);

  const { email, password } = formFeilds;

  console.log(formFeilds);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFromFeilds({ ...formFeilds, [name]: value });
  };

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPasswordUser(email, password);
      console.log(response);
      alert("User Signed In");
    } catch(error) {
        switch(error.code){
          case 'auth/wrong-password':
            alert('incorrect password for email');
            break;
          case 'auth/user-not-found':
            alert('no user found associated with this email');
            break;
          default:
            console.log(error);
        }

    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmitSignIn}>
        <FormInput
          label="Email"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-containers">
        <Button type="submit">Sign In</Button>
        <Button tyoe='button' buttonType ="google" onClick={signInWithGoogle}>
          Google Sign In
        </Button>
        </div>
        
      </form>
    </div>
  );
};

export default SignInForm;
