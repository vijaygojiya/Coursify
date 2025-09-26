import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { IUser } from '@/typings/types';
import { fireCollections } from './fireConst';
import { fireAuth } from './fireAuth';

export const db = getFirestore();

const userCollectionRef = collection(db, fireCollections.users);

// Create a user
export const createUser = async ({
  email,
  firebaseId,
  name,
}: {
  email: string;
  firebaseId: string;
  name: string;
}): Promise<IUser> => {
  try {
    const userRef = doc(userCollectionRef, firebaseId);
    const newUser: IUser = {
      email,
      firebaseId,
      name,
      role: 'student',
      interest: [],
    };
    await setDoc(userRef, {
      ...newUser,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

// Get current user info
export const getCurrentUserInfo = async (): Promise<IUser | null> => {
  try {
    console.log('==fetching');
    const firebaseId = fireAuth.currentUser?.uid;
    if (!firebaseId) {
      return null;
    }
    console.log();
    const userRef = doc(userCollectionRef, firebaseId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data() as IUser;
    } else {
      return null; // user not found
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
};

// Update current user info
export const updateCurrentUserInfo = async ({
  data,
}: {
  data: Partial<Omit<IUser, 'firebaseId' | 'email'>>;
}): Promise<void> => {
  try {
    const firebaseId = fireAuth.currentUser?.uid;
    if (!firebaseId) {
      return;
    }
    const userRef = doc(userCollectionRef, firebaseId);
    await updateDoc(userRef, { ...data, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

// Delete user
export const deleteUser = async (): Promise<void> => {
  try {
    const firebaseId = fireAuth.currentUser?.uid;
    const userRef = doc(userCollectionRef, firebaseId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};
