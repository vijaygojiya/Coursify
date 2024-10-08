import {webClientId} from '@/types/constant';
import auth from '@react-native-firebase/auth';

import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {Settings, LoginManager, AccessToken} from 'react-native-fbsdk-next';

const facebookSettings = () => {
  Settings.initializeSDK();
};

const configureGoogleSignin = () => {
  GoogleSignin.configure({
    webClientId: webClientId,
    offlineAccess: false,
    profileImageSize: 150,
  });
};

const fireAuth = auth();

const createUserInFirebase = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return fireAuth.createUserWithEmailAndPassword(email, password);
};

const signInUserWithFirebase = ({
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
      console.log('error while sign in with google');
    }
  } catch (error) {
    throw error;
  }
};

const facebookLogin = async () => {
  // Attempt login with permissions
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return await fireAuth.signInWithCredential(facebookCredential);
    // Sign-in the user with the credential
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  return fireAuth.signOut();
};

export default {
  configureGoogleSignin,
  facebookSettings,
  facebookLogin,
  googleSignIn,
  fireAuth,
  createUserInFirebase,
  getCurrentUserInfo,
  signInUserWithFirebase,
  getFireAuthToken,
  signOut,
};
