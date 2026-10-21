import { useState } from "react";
import { FaLink, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import Footer from "../../components/shared/Footer";
import { Link } from "react-router";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col font-sans text-gray-900 overflow-y-auto lg:overflow-hidden">
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
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
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
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1.5">
                  MINIMUM 6 CHARACTERS
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
                    required
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
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 px-4 bg-primary hover:bg-primary-hover text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                <span>Sign Up</span>
                <FaArrowRight className="w-3.5 h-3.5" />
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