import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { FaEye, FaEyeSlash, FaArrowRight, FaGoogle, FaSpinner } from "react-icons/fa";
import { loginUser } from "../../redux/slice/userSlice"; 
import Footer from "../../components/shared/Footer";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPending, error } = useSelector((state) => state.userState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col text-gray-900 overflow-y-auto lg:overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-105 flex flex-col items-center">
          
          <div className="mb-8 text-center">
            <Link to="/" className="text-2xl font-extrabold text-black tracking-tight cursor-pointer">
              ShortLink
            </Link>
          </div>

          <div className="w-full bg-white p-8 sm:p-9 rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100/80">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                Please enter your details to sign in.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email address is required",
                  })}
                  className={`w-full px-3.5 py-2.5 bg-white border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-gray-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`w-full pl-3.5 pr-10 py-2.5 bg-white border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Log In</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <span className="relative bg-white px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                OR CONTINUE WITH
              </span>
            </div>

            <button
              type="button"
              className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm rounded-xl flex items-center justify-center space-x-2.5 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <FaGoogle className="w-4 h-4 text-gray-800" />
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="text-center mt-6 text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to={"/auth/register"}
              className="font-bold text-primary hover:text-primary-hover transition-colors"
            >
              Sign up
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;