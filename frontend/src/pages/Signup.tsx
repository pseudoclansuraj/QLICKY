import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../libs/firebaseHelper";
import { signInUser } from "../libs/storageHelper";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
type FormData = z.infer<typeof schema>;

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const signupMutation = useMutation({
    mutationFn: async ({ email, password }: FormData) => {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        // signInUser only needs the User object, not additional properties
        signInUser(user);
        toast.success("Signup successful!");
        navigate("/dashboard/my-qrcode");
      } catch (error: any) {
        console.error('Signup error:', error);
        if (error.code === 'auth/quota-exceeded') {
          throw new Error('Daily signup limit exceeded. Please try again tomorrow or use Google signup.');
        } else if (error.code === 'auth/email-already-in-use') {
          throw new Error('This email is already registered. Please use the login page.');
        } else if (error.code === 'auth/weak-password') {
          throw new Error('Password is too weak. Please use a stronger password.');
        } else {
          throw new Error(error.message || 'Signup failed.');
        }
      }
    },
    onError: (err: unknown) => toast.error((err as Error).message || "Signup failed."),
  });

  const googleMutation = useMutation({
    mutationFn: async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        signInUser(user);
        toast.success("Signup with Google successful!");
        navigate("/dashboard/my-qrcode");
      } catch (err) {
        toast.error((err as Error).message || "Google signup failed.");
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-white mb-2">Sign Up</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Create your account</p>
        <form
          onSubmit={handleSubmit((data) => {
            signupMutation.mutate(data);
            reset();
          })}
          className="space-y-4"
        >
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              {...register("email")}
              disabled={signupMutation.isPending}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              {...register("password")}
              disabled={signupMutation.isPending}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-60"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? "Signing up..." : "Sign Up with Email"}
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>
        <button
          onClick={() => googleMutation.mutate()}
          className="w-full py-2 px-4 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-60"
          disabled={googleMutation.isPending}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.5 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.3 5.1 29.4 3 24 3 15.1 3 7.4 8.7 6.3 14.7z"/><path fill="#FBBC05" d="M24 45c5.8 0 10.7-1.9 14.3-5.1l-6.6-5.4C29.7 36.1 27 37 24 37c-5.7 0-10.6-3.7-12.3-8.9l-7 5.4C7.4 39.3 15.1 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.5 20-21 0-1.3-.1-2.7-.3-4z"/></g></svg>
          {googleMutation.isPending ? "Signing up..." : "Sign Up with Google"}
        </button>
        <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">Login</a>
        </div>
      </div>
    </div>
  );
}
