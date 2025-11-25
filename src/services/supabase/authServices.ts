import { supabase } from "@/utils/supabase";

const configureGoogleSignin = () => {
  // GoogleSignin.configure({
  //   offlineAccess: false,
  //   profileImageSize: 150,
  // });
};

const signUpWithEmail = async ({
  email,
  password,
  name,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const { error, data } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { name },
    },
  });

  console.log("==>>", error);
  if (error) {
    throw error;
  }
  return data;
};

const signInUserWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw error;
  }
  return data;
};
const getFireAuthToken = async () => {
  return "";
};

const signOut = async () => {
  return supabase.auth.signOut();
};
const deleteCurrentUser = (id: string) => {
  return supabase.auth.admin.deleteUser(id, true);
};

const googleSignIn = async () => {};

export {
  signUpWithEmail,
  signInUserWithEmail,
  getFireAuthToken,
  signOut,
  googleSignIn,
  configureGoogleSignin,
  deleteCurrentUser,
};
