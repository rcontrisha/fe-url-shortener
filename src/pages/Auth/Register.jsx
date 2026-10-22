import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { FaLink, FaArrowRight, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { registerUser } from "../../redux/slice/userSlice";
import Footer from "../../components/shared/Footer";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPending, error } = useSelector((state) => state.userState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    const resultAction = await dispatch(
      registerUser({
        email: data.email,
        password: data.password,
      })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/auth/login");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col font-inter text-gray-900 overflow-y-auto lg:overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-110 flex flex-col items-center">
          
          <div className="w-10 h-10 rounded-xl bg-blue-100/70 flex items-center justify-center mb-5 shadow-sm">
            <FaLink className="w-4 h-4 text-primary" />
          </div>

          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Join the elite architects of the web.
            </p>
          </div>

          <div className="w-full bg-white p-8 sm:p-9 rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100/80">
            
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
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full pl-3.5 pr-10 py-2.5 bg-white border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all`}
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
                {errors.password ? (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.password.message}
                  </p>
                ) : (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1.5">
                    MINIMUM 6 CHARACTERS
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                    className={`w-full pl-3.5 pr-10 py-2.5 bg-white border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs font-medium mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full mt-3 py-3 px-4 bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 leading-relaxed mt-5">
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="text-center mt-6 text-xs text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/auth/login"}
              className="font-bold text-primary hover:text-primary-hover transition-colors"
            >
              Log in
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;