import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import {
  X,
  Trash2,
  Search,
  CheckCircle,
  Download,
  ChevronDown,
  Filter,
  FileSpreadsheet,
  Tag,
  MessageSquare,
  Phone,
  Building2,
  Calendar,
  Clock
} from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { exportToCSV } from "../utils/exportCsv";
import { toast, customConfirm } from "../utils/alerts";
import { TableRowsSkeleton } from "./SkeletonLoader";
import { getViewedIds, markIdAsViewed } from "../utils/viewedTracker";
import { notifyStatusChange } from "../utils/statusNotificationTracker";

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.472-1.761-1.645-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2212";

export default function InquiriesDashboard({ initialFilter = "" }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterName, setFilterName] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState(initialFilter || "");

  const [openFilters, setOpenFilters] = useState({
    name: false,
    number: false,
    category: false,
    status: false
  });

  const toggleFilter = (key) =>
    setOpenFilters((prev) => ({
      name: false,
      number: false,
      category: false,
      status: false,
      [key]: !prev[key]
    }));

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [remarkInput, setRemarkInput] = useState("");
  const [viewedIds, setViewedIds] = useState(() => new Set(getViewedIds().map(String)));

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/enquiries`);
      if (res.data?.success && Array.isArray(res.data.data)) {
        setEnquiries(res.data.data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      contacted: enquiries.filter((e) => e.status === "contacted").length,
      pending: enquiries.filter((e) => e.status === "pending").length
    };
  }, [enquiries]);

  const getCategoryName = (enq) => {
    if (!enq) return "";
    if (typeof enq.category === "object" && enq.category !== null) {
      return enq.category.name || "";
    }
    return enq.categoryName || enq.category || "";
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      const matchName = filterName ? enq.name.toLowerCase().includes(filterName.toLowerCase()) : true;
      const matchNumber = filterNumber ? enq.contact.includes(filterNumber) : true;
      const catName = getCategoryName(enq);
      const matchCategory = filterCategory ? catName === filterCategory : true;
      const matchStatus = filterStatus ? enq.status === filterStatus : true;
      return matchName && matchNumber && matchCategory && matchStatus;
    });
  }, [enquiries, filterName, filterNumber, filterCategory, filterStatus]);

  const handleMarkContacted = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      try {
        await axios.put(`${API_BASE_URL}/api/v1/enquiries/${id}`, { status: "contacted" });
      } catch {}
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: "contacted" } : e)));
      toast.success("Enquiry marked as Contacted!", { icon: "✅" });
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: "contacted" }));
      }
    } catch {}
  };

  const handleSaveRemark = async (id) => {
    try {
      try {
        await axios.put(`${API_BASE_URL}/api/v1/enquiries/${id}`, { remark: remarkInput });
      } catch {}
      setEnquiries((prev) => prev.map((enq) => (enq.id === id ? { ...enq, remark: remarkInput } : enq)));
      toast.success("Remark saved successfully!", { icon: "📝" });
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, remark: remarkInput }));
      }
    } catch {}
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!(await customConfirm("Are you sure you want to delete this enquiry?"))) return;
    try {
      try {
        await axios.delete(`${API_BASE_URL}/api/v1/enquiries/${id}`);
      } catch {}
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast.error("Enquiry deleted.", { icon: "🗑️" });
      setSelectedEnquiry(null);
    } catch {}
  };

  return (
    <div className="w-full h-full p-4 md:p-8 text-gray-800 bg-transparent flex flex-col">
      <div className="w-full mx-auto space-y-4 flex flex-col flex-1 h-full min-h-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FF] text-[#004A77] flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Portal Inquiries &amp; Leads</h1>
              <p className="text-gray-600 max-w-2xl text-sm mt-0.5">
                Review visitor inquiries, business quotes, and communication requests from Best of Amravati.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start md:justify-end gap-2.5 shrink-0">
            {/* Filter Pills */}
            <button
              onClick={() => setFilterStatus("")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                !filterStatus ? "bg-[#b7131a] text-white shadow-xs" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>All</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${!filterStatus ? "bg-white/20" : "bg-gray-200"}`}>
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => setFilterStatus(filterStatus === "contacted" ? "" : "contacted")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                filterStatus === "contacted"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <span>Contacted</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${filterStatus === "contacted" ? "bg-white/20" : "bg-emerald-100"}`}>
                {counts.contacted}
              </span>
            </button>

            <button
              onClick={() => setFilterStatus(filterStatus === "pending" ? "" : "pending")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                filterStatus === "pending"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              <span>Pending</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${filterStatus === "pending" ? "bg-white/20" : "bg-amber-100"}`}>
                {counts.pending}
              </span>
            </button>

            <button
              onClick={() => exportToCSV(filteredEnquiries, "amravati_inquiries.csv")}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-2xs transition active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export Data
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse whitespace-nowrap relative table-fixed">
              <thead className="bg-[#FAF8F7] border-b border-gray-200/80 sticky top-0 z-20 shadow-2xs text-gray-700">
                <tr>
                  <th className="px-4 py-3.5 w-[14%] text-xs font-bold tracking-wider text-gray-600   ">Received Date</th>
                  <th className="px-4 py-3.5 w-[16%] relative">
                    <div className="flex items-center justify-start gap-1 h-[26px]">
                      <span className="text-gray-600 text-xs font-bold tracking-wider   ">Customer Name</span>
                      <button
                        onClick={() => toggleFilter("name")}
                        className={`p-1 rounded-md transition-colors ${
                          openFilters.name || filterName ? "bg-red-100 text-[#b7131a]" : "hover:bg-gray-200 text-gray-400"
                        }`}
                      >
                        <Search className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {openFilters.name && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-[calc(100%-8px)] mx-2 z-50 animate-in fade-in slide-in-from-top-1">
                        <div className="relative shadow-xl rounded-xl bg-white border border-gray-200 p-1">
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search customer..."
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            className="w-full bg-transparent pl-2.5 pr-6 py-1.5 text-xs font-medium text-gray-800 outline-none"
                          />
                          {filterName && (
                            <button
                              onClick={() => setFilterName("")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </th>
                  <th className="px-4 py-3.5 w-[14%] text-xs font-bold tracking-wider text-gray-600   ">Contact</th>
                  <th className="px-4 py-3.5 w-[18%] text-xs font-bold tracking-wider text-gray-600   ">Target Listing</th>
                  <th className="px-4 py-3.5 w-[24%] text-xs font-bold tracking-wider text-gray-600   ">Message Inquiry</th>
                  <th className="px-4 py-3.5 w-[10%] text-center text-xs font-bold tracking-wider text-gray-600   ">Status</th>
                  <th className="px-4 py-3.5 w-[8%] text-right text-xs font-bold tracking-wider text-gray-600    pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <TableRowsSkeleton rows={6} cols={7} />
                ) : filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MessageSquare className="w-8 h-8 text-gray-300" />
                        <p className="text-sm font-medium">No enquiries found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    onClick={() => {
                      markIdAsViewed(enq.id);
                      setViewedIds((prev) => new Set([...prev, String(enq.id)]));
                      setSelectedEnquiry(enq);
                      setRemarkInput(enq.remark || "");
                    }}
                    className="hover:bg-[#FAF8F7] transition cursor-pointer group"
                  >
                    {/* Date */}
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-medium text-gray-800">
                        {new Date(enq.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {new Date(enq.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3.5 font-bold text-gray-900 group-hover:text-[#b7131a] transition-colors truncate">
                      {enq.name}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3.5 text-xs text-gray-800 font-medium">
                      {enq.contact}
                    </td>

                    {/* Business */}
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-semibold text-gray-900 truncate">{enq.businessName}</div>
                      <div className="text-[11px] text-gray-400">{getCategoryName(enq) || "General"}</div>
                    </td>

                    {/* Message Preview with Hover Tooltip */}
                    <td className="px-4 py-3.5 relative group/tooltip" onClick={(e) => e.stopPropagation()}>
                      <p className="text-xs text-gray-700 truncate cursor-pointer hover:text-blue-600 transition-colors block max-w-xs">
                        {enq.message}
                      </p>
                      {/* Tooltip popover */}
                      <div className="absolute left-2 top-full mt-2 w-80 p-3.5 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[60]">
                        <div className="text-xs font-bold text-gray-900 mb-1">Message:</div>
                        <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{enq.message}</div>
                        {enq.remark && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-[11px] text-emerald-700 font-medium">
                            Internal Remark: {enq.remark}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleMarkContacted(enq.id, e)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          enq.status === "contacted"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800 hover:bg-emerald-100 hover:text-emerald-800"
                        }`}
                        title="Click to toggle contacted status"
                      >
                        <span className="capitalize">{enq.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {/* Direct WhatsApp Action */}
                        {enq.contact && (
                          <a
                            href={`https://wa.me/${enq.contact.replace(/\D/g, "")}?text=${encodeURIComponent(
                              `Hello ${enq.name}, we received your inquiry on Best of Amravati.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                            title="Chat on WhatsApp"
                          >
                            <WhatsAppIcon className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={(e) => handleDelete(enq.id, e)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Detail & Remark Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EBF3FF] text-[#004A77] flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{selectedEnquiry.name}</h3>
                  <p className="text-xs text-gray-500">{selectedEnquiry.businessName} • {selectedEnquiry.category}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs sm:text-sm text-gray-800 leading-relaxed">
                <span className="font-bold block text-gray-500 text-[11px] mb-1    tracking-wider">Inquiry Content</span>
                {selectedEnquiry.message}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-400 block text-[10px]    font-bold">Phone</span>
                  <span className="font-bold text-gray-900">{selectedEnquiry.contact}</span>
                </div>
                <div className="p-3 rounded-xl bg-gray-50">
                  <span className="text-gray-400 block text-[10px]    font-bold">Status</span>
                  <span className="font-bold text-emerald-700 capitalize">{selectedEnquiry.status}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Internal Follow-up Remark</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Called client on 21st, sent pricing quotation..."
                    value={remarkInput}
                    onChange={(e) => setRemarkInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveRemark(selectedEnquiry.id)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleMarkContacted(selectedEnquiry.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  Mark as Contacted
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
