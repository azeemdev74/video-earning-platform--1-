import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut} from 'firebase/auth';

const auth = getAuth();

async function registerUser(email:string, password:string) {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);
    return userCredential.user
    console.log('Verification email sent to:', user.email);
  } catch (error) {
    // console.error('Error during registration:', error.code, error.message);
  }
}


async function SignIn(email:string, password:string) {
  try {
    // Create a new user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);
    return userCredential.user
    console.log('Verification email sent to:', user.email);
  } catch (error) {
    // console.error('Error during registration:', error.code, error.message);
  }
}


async function signOutUser() {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    // Optionally, redirect to a login page or update UI
  } catch (error) {
    // console.error('Error signing out:', error.code, error.message);
  }
}