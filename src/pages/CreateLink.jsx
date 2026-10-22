import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { 
  FaArrowLeft, 
  FaLink, 
  FaEye, 
  FaChartLine, 
  FaQrcode, 
  FaBoltLightning,
  FaSpinner
} from "react-icons/fa6";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

function CreateLink() {
  const navigate = useNavigate();
  
  const token = useSelector(
    (state) => state.userState?.auth?.token || state.auth?.auth?.token
  );

  const [destinationUrl, setDestinationUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      original_url: destinationUrl,
      ...(customSlug && { slug: customSlug }),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/link/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create short link.");
      }

      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        
        <Link 
          to="/dashboard" 
          className="inline-flex items-center space-x-2 text-primary hover:text-blue-700 font-semibold text-xs sm:text-sm mb-5 transition-colors cursor-pointer"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Create New Short Link
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Transform your long URLs into clean, manageable assets.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-9 rounded-2xl border border-gray-100/80 shadow-xl shadow-gray-200/40 mb-8 sm:mb-10">
          
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-2">
                DESTINATION URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FaLink className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  required
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  placeholder="https://example.com/your-long-url-here"
                  className="w-full pl-11 pr-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <p className="text-[10px] italic text-gray-400 mt-1.5">
                Ensure your URL starts with http:// or https://
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-widest text-gray-700 uppercase mb-2">
                CUSTOM SLUG (OPTIONAL)
              </label>
              <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-primary transition-all">
                <span className="bg-[#F1F5F9] border-r border-gray-200 text-gray-500 px-4 py-3 text-sm font-medium select-none shrink-0 flex items-center">
                  short.link/
                </span>
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value.replace(/\s+/g, "-"))}
                  placeholder="my-custom-slug"
                  className="flex-1 px-4 py-3 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <p className="text-[10px] italic text-gray-400 mt-1.5">
                Leave blank to generate a random unique identifier.
              </p>
            </div>

            <div className="bg-[#EFF6FF] border border-blue-100 p-4 rounded-xl flex items-start space-x-3">
              <div className="p-1 text-primary shrink-0">
                <FaEye className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-extrabold tracking-wider text-primary uppercase">
                  LIVE PREVIEW
                </span>
                <p className="text-xs sm:text-sm text-gray-700 mt-1 font-medium break-all">
                  Your short link will be:{" "}
                  <span className="text-primary font-bold">
                    https://short.link/{customSlug || "[random-id]"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary hover:bg-blue-700 disabled:opacity-75 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Create Link</span>
                    <FaBoltLightning className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
              
              <Link
                to="/dashboard"
                className="px-6 py-3 hover:bg-gray-50 text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-bold rounded-xl transition-all"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-2">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#FFEAE1] text-[#FF6A39] flex items-center justify-center shrink-0">
              <FaChartLine className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Real-time Analytics
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Track every click, geographical location, and referral source instantly.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#E3E8FF] text-[#4E62FF] flex items-center justify-center shrink-0">
              <FaQrcode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                Auto-generated QR
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Every link automatically creates a high-resolution QR code for print.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* 3. Footer ditaruh di paling bawah */}
      <Footer />
    </div>
  );
}

export default CreateLink;