import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setUserProperties, setUserId } from "firebase/analytics";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClwj-vszn2j8HsJvdHgA8-FDXFpC48IiU",
  authDomain: "qliky-d21fa.firebaseapp.com",
  projectId: "qliky-d21fa",
  storageBucket: "qliky-d21fa.firebasestorage.app",
  messagingSenderId: "953352814984",
  appId: "1:953352814984:web:937d42cccd24a71debba3d",
  measurementId: "G-PTCG8DNM2F"
};


export const isMobileDevice = (): boolean => {
  let check = false;
  const ua = navigator.userAgent;
  try {
      if (ua) {
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))) {
              check = true;
          }
      }
  } catch (e) {
      console.log(e);
  }
  return check;
};

const firebase = initializeApp(firebaseConfig);

export const analytics = getAnalytics(firebase);


export const auth = getAuth();

export const LoginViaEmail =  (email: string, _props: any) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `${window.location.origin}/loginvialink`,
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.pseudoclan.qliky'
    },
    android: {
      packageName: 'com.pseudoclan.qliky',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: "qliky.pseudoclan.com",
  };
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    _props.alert(`An email with login link has been sent to ${email}. Please do check the spam folder if email not found in inbox.`);

    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    _props.alert(errorMessage);
    // ...
  });
} 

export const CompleteLoginViaEmail =(callback: (user?: User, errorMessage?: string)=>void)=>{
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    if(email){
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        callback(result.user);
      })
      .catch((error) => {
        callback(undefined, error.message);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
    }
  }
}

export const signInWithGoogle = async (): Promise<any> => {
  try {
    const provider = new GoogleAuthProvider();
    if (isMobileDevice()) {
      await signInWithRedirect(auth, provider);
      return null;
    }
    console.log("signInWithGoogle", "Using Popup");
    
    const result = await signInWithPopup(auth, provider);
    console.log("signInWithGoogle", result);
    
    return result; // Return the result instead of processing it here
  } catch (error) {
    // Handle Errors here.
    const errorCode = (error as any).code;
    const errorMessage = (error as any).message;
    // The email of the user's account used.
    //const email = error.email;
    // The AuthCredential type that was used.
    //const credential = GoogleAuthProvider.credentialFromError(error as any);
     throw new Error(errorCode + ': ' + errorMessage);
  }
};

export const getUser = () => {
  return auth.currentUser;
};

export const SignOutUser = async () => {
  await auth.signOut();
};

export const LogSignup = (params: any) => {
  logEvent(analytics, "sign_up", params);
};

export const LogSignIn = (params: any) => {
  logEvent(analytics, "login", params);
  if(params && params.uid){
    SetUserId(params.uid)
  }
};

export const LogDownload = (params: any) => {
  logEvent(analytics, "app_download", params);
};

export const SetUserId=(uid: string)=>{
  setUserId(analytics, uid);
} 

export const SetUserProps=(parameters: any)=>{
  setUserProperties(analytics, parameters);
} 

// Clear any persisted Firebase auth state
export const clearFirebaseAuth = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log("Error clearing Firebase auth:", error);
  }
};

export default firebase;

