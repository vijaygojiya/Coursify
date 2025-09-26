import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut as fireSignOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  deleteUser,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';

const fireAuth = getAuth();

const configureGoogleSignin = () => {
  GoogleSignin.configure({
    offlineAccess: false,
    profileImageSize: 150,
  });
};

const createUserInFirebase = async ({
  email,
  password,
  name,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const { user } = await createUserWithEmailAndPassword(
    fireAuth,
    email,
    password,
  );
  user.updateProfile({ displayName: name });
  return user;
};

const signInUserWithFirebase = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return signInWithEmailAndPassword(fireAuth, email, password);
};
const getFireAuthToken = async () => {
  return await fireAuth.currentUser?.getIdToken();
};

const signOut = async () => {
  return fireSignOut(fireAuth);
};
const deleteCurrentUser = () => {
  if (fireAuth.currentUser) {
    return deleteUser(fireAuth.currentUser);
  }
};

const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const idToken = response.data?.idToken;
      if (!idToken) {
        throw response;
      }
      const googleCredential = GoogleAuthProvider.credential(idToken);
      return await signInWithCredential(fireAuth, googleCredential);
    } else {
      throw response;
    }
  } catch (error) {
    throw error;
  }
};

export {
  fireAuth,
  createUserInFirebase,
  signInUserWithFirebase,
  getFireAuthToken,
  signOut,
  googleSignIn,
  configureGoogleSignin,
  deleteCurrentUser,
};
