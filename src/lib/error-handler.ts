export const getFriendlyErrorMessage = (error: any): string => {
  const code = error?.code || "";
  
  switch (code) {
    // Email/Password Auth
    case "auth/invalid-credential":
      return "Invalid email or password. Please verify your credentials.";
    case "auth/user-not-found":
      return "No account found with this email. Please sign up.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Account temporarily locked.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled. Contact support.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support.";
    // Google Popup Auth Errors
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed. Please try again.";
    case "auth/popup-blocked":
      return "Popup was blocked by your browser. Please allow popups for this site and try again.";
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled. Please try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email using a different sign-in method.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase. Add it in Firebase Console > Authentication > Settings.";
    case "auth/internal-error":
      return "An internal error occurred. Please try again.";
    default:
      return error.message || "An unexpected error occurred. Please try again.";
  }
};

