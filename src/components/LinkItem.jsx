import { FaLink, FaCopy, FaTrash, FaRegCalendarAlt, FaChartBar } from "react-icons/fa";
import { Link } from "react-router";

function LinkItem({ shortUrl, originalUrl, date, clicks, onCopy, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100/80 hover:border-gray-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <FaLink className="w-3.5 h-3.5 text-primary shrink-0" />
          <Link
            to={`https://${shortUrl}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-primary hover:underline truncate"
          >
            {shortUrl}
          </Link>
        </div>

        <p className="text-xs text-gray-400 truncate pr-4 font-normal">
          {originalUrl}
        </p>

        <div className="flex items-center space-x-4 pt-1.5 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
          <div className="flex items-center space-x-1.5">
            <FaRegCalendarAlt className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <FaChartBar className="w-3 h-3" />
            <span>{clicks} CLICKS</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
        <button
          onClick={onCopy}
          title="Copy Link"
          className="p-2.5 rounded-xl bg-blue-50 text-primary hover:bg-blue-100 transition-colors cursor-pointer"
        >
          <FaCopy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          title="Delete Link"
          className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <FaTrash className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default LinkItem;