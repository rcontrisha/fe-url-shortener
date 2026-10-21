import { useState } from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import LinkItem from "../components/LinkItem";
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const dummyLinks = [
    {
      id: 1,
      shortUrl: "shrt.lnk/aB3x9",
      originalUrl: "https://www.architecturaldigest.com/story/modern-mini...",
      date: "OCT 24, 2023",
      clicks: "1.2K",
    },
    {
      id: 2,
      shortUrl: "shrt.lnk/v9Pq2",
      originalUrl: "https://medium.com/design-ethics/the-future-of-headle...",
      date: "OCT 21, 2023",
      clicks: "842",
    },
    {
      id: 3,
      shortUrl: "shrt.lnk/zR4t1",
      originalUrl: "https://github.com/frameworks/modern-stack-documen...",
      date: "OCT 19, 2023",
      clicks: "2.4K",
    },
    {
      id: 4,
      shortUrl: "shrt.lnk/mL5k8",
      originalUrl: "https://dribbble.com/shots/21435678-Fintech-Dashboar...",
      date: "OCT 15, 2023",
      clicks: "341",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-gray-900">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              My Links
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage and track your shortened digital assets.
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              TOTAL ACTIVE
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              124
            </p>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <FaSearch className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or URL..."
            className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200/80 rounded-xl text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
            <FaFilter className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 mb-10">
          {dummyLinks.map((item) => (
            <LinkItem
              key={item.id}
              shortUrl={item.shortUrl}
              originalUrl={item.originalUrl}
              date={item.date}
              clicks={item.clicks}
              onCopy={() => navigator.clipboard.writeText(`https://${item.shortUrl}`)}
              onDelete={() => console.log("Delete item:", item.id)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 pt-2">
          <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors cursor-pointer">
            <FaChevronLeft className="w-3 h-3" />
            <span>Prev Page</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100/70 text-primary flex items-center justify-center font-bold">
              1
            </span>
            <span className="text-gray-400 font-normal">of</span>
            <span className="text-gray-700">5</span>
          </div>

          <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors cursor-pointer">
            <span>Next</span>
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;