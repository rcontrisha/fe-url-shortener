import { Link } from "react-router";
import {
  FaArrowLeft,
  FaLinkSlash,
  FaExclamation,
  FaChartLine,
  FaLink,
  FaCode,
} from "react-icons/fa6";
import Footer from "../components/shared/Footer";

function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] flex flex-col justify-between font-sans text-gray-900 overflow-y-auto lg:overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center text-center max-w-lg">
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200/60 flex items-center justify-center border border-gray-100">
              <FaLinkSlash className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <div className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-blue-500/30 border-2 border-[#F8F9FA]">
              <FaExclamation className="w-4 h-4 text-white font-bold" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-2">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2.5 leading-relaxed max-w-sm">
            The page you're looking for doesn't exist. It may have been moved, deleted, or the link might be broken.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7 w-full sm:w-auto">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
              <span>Go to Dashboard</span>
            </Link>

            <a
              href="mailto:support@shortlink.com"
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-primary font-semibold text-xs rounded-xl shadow-xs flex items-center justify-center transition-all cursor-pointer"
            >
              Report an Issue
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
          <Link
            to="/analytics"
            className="p-5 bg-white rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md hover:border-gray-300 transition-all text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-3">
              <FaChartLine className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
              Check Analytics
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Track your active links and traffic sources in real-time.
            </p>
          </Link>

          <Link
            to="/dashboard"
            className="p-5 bg-white rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md hover:border-gray-300 transition-all text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-3">
              <FaLink className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
              New ShortLink
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Create a brand new architected URL in seconds.
            </p>
          </Link>

          <a
            href="#"
            className="p-5 bg-white rounded-2xl border border-gray-200/70 shadow-xs hover:shadow-md hover:border-gray-300 transition-all text-left group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center mb-3">
              <FaCode className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
              Developer API
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Integrate our link infrastructure into your apps.
            </p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;