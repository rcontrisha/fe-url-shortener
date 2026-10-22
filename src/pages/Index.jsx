import { useState } from "react";
import Navbar from "../components/shared/Navbar";
import { FaLink, FaBolt, FaEdit, FaUsers, FaCheckCircle } from "react-icons/fa";
import Footer from "../components/shared/Footer";

function Index() {
  const [url, setUrl] = useState(
    "https://very-long-architectural-url.com/asset-id-99238-x1",
  );

  const handleShorten = (e) => {
    e.preventDefault();
  };

  const features = [
    {
      icon: <FaBolt className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-100",
      accentBar: "bg-blue-200",
      title: "Easy Create",
      description:
        "Instantly generate high-performance short links with a single click or through our surgical API endpoints.",
    },
    {
      icon: <FaEdit className="w-4 h-4 text-indigo-600" />,
      iconBg: "bg-indigo-100",
      accentBar: "bg-indigo-200",
      title: "Custom Slugs",
      description:
        "Maintain brand authority with readable, custom link endings that resonate with your digital audience.",
    },
    {
      icon: <FaUsers className="w-4 h-4 text-orange-600" />,
      iconBg: "bg-orange-100",
      accentBar: "bg-orange-200",
      title: "Team Ready",
      description:
        "Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.",
    },
  ];

  const insightsPoints = [
    "Geographic Distribution Maps",
    "Device & Browser Breakdown",
    "UTM Parameter Tracking",
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-12 md:py-20 px-4 sm:px-6 md:px-8 font-inter">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-gray-900">Shorten URLs. </span>
            <span className="text-blue-600">Share Easily.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed">
            Create short, memorable links for your team communications.
            Transform long, cumbersome URLs into powerful digital assets that
            drive engagement.
          </p>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[16px] rounded-lg shadow-sm transition-all duration-200 cursor-pointer">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white hover:bg-gray-50 text-[#004AC6] font-bold text-[16px] border-2 border-gray-200 rounded-lg transition-all duration-200 cursor-pointer">
              Learn More
            </button>
          </div>

          <div className="mt-12 w-full max-w-2xl">
            <form
              onSubmit={handleShorten}
              className="bg-white p-2 sm:p-2.5 border-2 border-gray-200 rounded-2xl shadow-xl shadow-gray-100 flex items-center space-x-3 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
            >
              <div className="pl-3 text-gray-400">
                <FaLink className="w-5 h-5" />
              </div>

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a long URL here..."
                className="flex-1 bg-transparent text-gray-600 text-sm focus:outline-none placeholder-gray-400"
              />

              <button
                type="submit"
                className="px-6 py-3 bg-[#004AC6] hover:bg-blue-700 text-white font-semibold text-sm rounded-md shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Shorten
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Architectural Features Section */}
      <section className="bg-[#F8F9FA] py-12 md:py-24 px-6 font-inter">
        <div className="mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Architectural Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Built for Enterprise Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-lg ${feature.iconBg} flex items-center justify-center mb-6`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    {feature.description}
                  </p>
                </div>

                <div
                  className={`w-10 h-1 rounded-full ${feature.accentBar}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Driven Insights Section */}
      <section className="bg-white py-12 md:py-24 px-6 font-inter overflow-hidden">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-100 to-indigo-100 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
              <img
                src="/ba7818af9d86e091dd2240250e24f806a0b042c4.png"
                alt="Workspace laptop dashboard"
                className="w-full h-80 sm:h-100 object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Data Driven Insights
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Observe your link architecture in real-time.
            </h2>

            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Every click is a data point. Our dashboard provides surgical precision
              into where your traffic originates, who is engaging, and how your team
              communications are performing across the globe.
            </p>

            <div className="space-y-4">
              {insightsPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FaCheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-gray-800">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Index;