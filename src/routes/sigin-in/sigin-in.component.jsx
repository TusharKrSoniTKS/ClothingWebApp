import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";

import SignUpForm from '../../components/sign-up-form/sign-up-from.compoent'

const SignIn = () => {
  
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
 

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with google Popup</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
