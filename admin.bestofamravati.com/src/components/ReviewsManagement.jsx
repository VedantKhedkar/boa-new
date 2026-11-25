import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Star, CheckCircle, XCircle, Trash2, Search, Filter, FileSpreadsheet, Building2 } from "lucide-react";
import { exportToCSV } from "../utils/exportCsv";
import { toast, customConfirm } from "../utils/alerts";
import { ReviewsGridSkeleton } from "./SkeletonLoader";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2212";

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/reviews`);
      if (res.data?.success && Array.isArray(res.data.data)) {
        setReviews(res.data.data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchText = filterText
        ? r.name.toLowerCase().includes(filterText.toLowerCase()) ||
          r.businessName.toLowerCase().includes(filterText.toLowerCase()) ||
          r.comment.toLowerCase().includes(filterText.toLowerCase())
        : true;
      const matchRating = filterRating ? String(r.rating) === filterRating : true;
      return matchText && matchRating;
    });
  }, [reviews, filterText, filterRating]);

  const handleDelete = async (id) => {
    if (!(await customConfirm("Delete this customer review permanently?"))) return;
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.error("Review removed.", { icon: "🗑️" });
  };

  const handleToggleStatus = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "approved" ? "flagged" : "approved" } : r))
    );
    toast.success("Review status updated!", { icon: "⭐" });
  };

  return (
    <div className="w-full h-full p-4 md:p-8 text-gray-800 bg-transparent flex flex-col">
      <div className="w-full mx-auto space-y-4 flex flex-col flex-1 h-full min-h-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 shadow-xs">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Customer Reviews Moderation</h1>
              <p className="text-gray-600 max-w-2xl text-sm mt-0.5">
                Monitor and moderate ratings, testimonials, and verified customer feedback.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(filteredReviews, "amravati_reviews.csv")}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-2xs transition active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export CSV
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter reviews by reviewer, business, or text..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm outline-none focus:border-[#b7131a]"
            />
          </div>
        </div>

        {/* Reviews Cards List */}
        {loading ? (
          <ReviewsGridSkeleton count={4} />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-3 hover:border-gray-300 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">{rev.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-primary" />
                      <span className="font-semibold text-gray-700">{rev.businessName}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed mt-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <span className="text-gray-400">{rev.timeAgo || "Recently"}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(rev.id)}
                    className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                      rev.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {rev.status === "approved" ? "Approved" : "Flagged"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(rev.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
