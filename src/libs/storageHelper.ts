import CryptoJS from "crypto-js";
import { User } from "firebase/auth";
import { LogSignIn } from "./firebaseHelper";

const AUTH_TOKEN = "AUTH_TOKEN";
const USER_DATA = "USERDATA";
const PROMO_CODE = "PROMO_CODE";

let token: string | undefined | null;
let promocode: string | undefined | null;

const encryptionKey =
  "is098765432Cantbechanged20210927NeedTOResolveAWANTIKAGEDINusersandbigkeyneededfor128charactersalmosqliky";

const encryptString = (planText: string) => {
  return CryptoJS.AES.encrypt(planText, encryptionKey).toString();
};

const decryptString = (ciphertext: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e: any) {
    console.log("Error: ", e);
  }
  return null;
};

export const signInUser = (user: User) => {
  LogSignIn(user);
  // Store the user UID as the auth token
  localStorage.setItem(AUTH_TOKEN, encryptString(user.uid));
  // Also store user data if needed
  localStorage.setItem(USER_DATA, encryptString(JSON.stringify({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  })));
};

export const getToken = () => {
  if (token) {
    return token;
  }
  const x = localStorage.getItem(AUTH_TOKEN) as string;
  if (x) {
    token = decryptString(x);
  }
  return token;
};

export const isValidSession = async () => {
  const storedToken = getToken();
  if (!storedToken) {
    return false;
  }
  
  // Check if Firebase auth state is still valid
  const { auth } = await import("./firebaseHelper");
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      // If there's a stored token but no Firebase user, the session is invalid
      resolve(!!user && user.uid === storedToken);
    });
  });
};

export const getUserData = () => {
  const userDataStr = decryptString(localStorage.getItem(USER_DATA) as string);
  if (userDataStr) {
    return JSON.parse(userDataStr);
  }
  return null;
};

export const setPromo = (promo: string) => {
  localStorage.setItem(PROMO_CODE, encryptString(promo));
};

export const getPromo = () => {
  if (promocode) {
    return promocode; //new Promise((resolve)=>resolve(token));
  }
  const x = localStorage.getItem(PROMO_CODE) as string;
  if (x) promocode = decryptString(x);
  return promocode;
};

export const signOut = () => {
  token = null;
  promocode = null;
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER_DATA);
  localStorage.removeItem(PROMO_CODE);
  // Clear any other auth-related data
  return true;
};
