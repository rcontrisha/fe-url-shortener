import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowRight, FaGoogle } from "react-icons/fa";
import Footer from "../../components/shared/Footer";
import { Link } from "react-router";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col text-gray-900 overflow-y-auto lg:overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-105 flex flex-col items-center">
          
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-extrabold text-black tracking-tight cursor-pointer">
              ShortLink
            </h1>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    required
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
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-hover text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                <span>Log In</span>
                <FaArrowRight className="w-3.5 h-3.5" />
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