import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  message: z.string().min(1, "Message is required").max(300, "Message too long"),
});

type FormData = z.infer<typeof schema>;

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    // You can handle form submission here (e.g., send to API)
    alert("Thank you for contacting us!");
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Let's Get In Touch.</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Or just reach out manually to <a href="mailto:hello@slothui.com" className="text-indigo-600 underline">hello@slothui.com</a>.
        </p>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Phone Number</label>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-2 border rounded-l-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 text-sm select-none">+44</span>
            <input
              type="tel"
              placeholder="(000) 000-0000"
              className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              {...register("phone")}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Message</label>
          <textarea
            placeholder="Enter your main text here..."
            maxLength={300}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
            rows={4}
            {...register("message")}
          />
          <div className="text-right text-xs text-gray-400 mt-1">
            {watch("message")?.length || 0}/300
          </div>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
}
