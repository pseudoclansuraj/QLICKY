import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CompleteLoginViaEmail } from "../libs/firebaseHelper";
import { signInUser } from "../libs/storageHelper";

export default function LoginViaLink() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    CompleteLoginViaEmail((user, errorMessage) => {
      if (user) {
        // signInUser handles the user properly
        signInUser(user);
        navigate("/dashboard/my-qrcode", {
          replace: true,
        });
      } else {
        setError(errorMessage || "Login failed. Please try again.");
      }
    });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-white dark:bg-gray-900 text-center">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-white">Completing Login...</h1>
        {error ? (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">Please wait while we log you in.</p>
        )}
      </div>
    </div>
  );
}
