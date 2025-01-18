import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';

const fireAuth = auth();

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
  const {user} = await fireAuth.createUserWithEmailAndPassword(email, password);
  user.updateProfile({displayName: name});
  return user;
};

const signInUserWithFirebase = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return fireAuth.signInWithEmailAndPassword(email, password);
};
const getFireAuthToken = async () => {
  return await fireAuth.currentUser?.getIdToken();
};

const getCurrentUserInfo = () => {
  return fireAuth.currentUser;
};

const signOut = async () => {
  return fireAuth.signOut();
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
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return await fireAuth.signInWithCredential(googleCredential);
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
  getCurrentUserInfo,
  signInUserWithFirebase,
  getFireAuthToken,
  signOut,
  googleSignIn,
  configureGoogleSignin,
};
