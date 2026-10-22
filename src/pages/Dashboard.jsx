import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import LinkItem from "../components/LinkItem";
import { fetchUserLinks, deleteShortLink } from "../redux/slice/userSlice";
import {
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";

function Dashboard() {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    linkId: null,
    slug: "",
  });

  const { links, isPending, error } = useSelector((state) => state.userState);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); 
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      fetchUserLinks({
        search: debouncedSearch,
        page: currentPage,
        limit: 10,
      })
    );
  }, [dispatch, debouncedSearch, currentPage]);

  const openDeleteModal = (id, slug) => {
    setDeleteModal({ isOpen: true, linkId: id, slug });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, linkId: null, slug: "" });
  };

  const ConfirmDelete = async () => {
    if (deleteModal.linkId) {
      await dispatch(deleteShortLink(deleteModal.linkId));
      closeDeleteModal();
    }
  };

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
              {links.meta?.totalActive ?? 0}
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-3.5 mb-10">
          {isPending ? (
            <div className="py-12 text-center text-gray-400 flex flex-col items-center justify-center space-y-3">
              <FaSpinner className="w-6 h-6 animate-spin text-primary" />
              <p className="text-xs font-medium">Fetching links...</p>
            </div>
          ) : links.data.length > 0 ? (
            links.data.map((item) => {
              const baseUrl = import.meta.env.VITE_API_URL || "shrt.lnk";
              const formattedDate = new Date(item.created_at).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              ).toUpperCase();

              return (
                <LinkItem
                  key={item.id}
                  shortUrl={`${baseUrl}/${item.slug}`}
                  originalUrl={item.original_url}
                  date={formattedDate}
                  clicks={item.clicks || 0}
                  onCopy={() =>
                    navigator.clipboard.writeText(`${baseUrl}/${item.slug}`)
                  }
                  onDelete={() => openDeleteModal(item.id, item.slug)}
                />
              );
            })
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-400 text-sm">
              No shortened links found.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 pt-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center space-x-1 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <FaChevronLeft className="w-3 h-3" />
            <span>Prev Page</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100/70 text-primary flex items-center justify-center font-bold">
              {links.meta?.page || 1}
            </span>
            <span className="text-gray-400 font-normal">of</span>
            <span className="text-gray-700">{links.meta?.totalPages || 1}</span>
          </div>

          <button
            disabled={currentPage >= (links.meta?.totalPages || 1)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="flex items-center space-x-1 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <span>Next</span>
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </main>

      {/* Delete Popup Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-4 mx-auto">
              <FaExclamationTriangle className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 text-center">
              Delete Short Link?
            </h3>
            <p className="text-xs text-gray-500 text-center mt-1.5 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{deleteModal.slug}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={closeDeleteModal}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={ConfirmDelete}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-red-500/20 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;