import { auth } from '../libs/firebaseHelper';
import { getToken } from '../libs/storageHelper';

export const isAuthenticated = (): boolean => {
  // Check both Firebase auth state and local storage
  const token = getToken();
  const currentUser = auth.currentUser;
  
  return !!(token && currentUser);
};

export const waitForAuthState = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (auth.currentUser !== undefined) {
      resolve(isAuthenticated());
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
};

export const getAuthenticatedUser = () => {
  if (isAuthenticated()) {
    return auth.currentUser;
  }
  return null;
};
