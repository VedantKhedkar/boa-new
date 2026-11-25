import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Building2,
  Plus,
  Search,
  Filter,
  FileSpreadsheet,
  X,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Star
} from "lucide-react";
import { exportToCSV } from "../utils/exportCsv";
import { toast, customConfirm } from "../utils/alerts";
import { TableRowsSkeleton } from "./SkeletonLoader";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2212";

export default function BusinessesDashboard({ initialFilter = "" }) {
  const [businesses, setBusinesses] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState(initialFilter || "");
  const [openFilters, setOpenFilters] = useState({ name: false, category: false });

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("basic");
  const [editingBusiness, setEditingBusiness] = useState(null);
  const emptyForm = {
    name: "",
    category: "IT & Software",
    subCategory: "",
    tagline: "",
    owner: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    address: "",
    locality: "Saturna",
    pincode: "444601",
    timings: "Open · Closes 7:00 PM",
    directionsUrl: "",
    establishedYear: "",
    employeeCount: "1-10",
    pricingTier: "Verified",
    status: "verified",
    featured: false,
    logoUrl: "",
    coverImage: "",
    photosText: "",
    videosText: "",
    about: "",
    servicesText: "",
    productsText: "",
    tagsText: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    twitter: ""
  };
  const [formData, setFormData] = useState(emptyForm);

  const fetchBusinesses = async () => {
    try {
      const [bizRes, catRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/v1/businesses`),
        axios.get(`${API_BASE_URL}/api/v1/categories`)
      ]);
      if (bizRes.data?.success && Array.isArray(bizRes.data.data)) {
        setBusinesses(bizRes.data.data);
      }
      if (catRes.data?.success && Array.isArray(catRes.data.data)) {
        setAvailableCategories(catRes.data.data);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const counts = useMemo(() => {
    return {
      all: businesses.length,
      verified: businesses.filter((b) => b.status === "verified").length,
      pending: businesses.filter((b) => b.status === "pending").length
    };
  }, [businesses]);

  const getCategoryName = (biz) => {
    if (!biz) return "";
    if (typeof biz.category === "object" && biz.category !== null) {
      return biz.category.name || "";
    }
    return biz.categoryName || biz.category || "";
  };

  const getCategorySector = (biz) => {
    if (!biz) return "";
    if (typeof biz.category === "object" && biz.category !== null) {
      return biz.category.sector || "";
    }
    return biz.sector || "";
  };

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      const matchName = filterName
        ? biz.name.toLowerCase().includes(filterName.toLowerCase()) ||
          biz.address.toLowerCase().includes(filterName.toLowerCase()) ||
          biz.phone.includes(filterName)
        : true;
      const catName = getCategoryName(biz);
      const matchCategory = filterCategory ? catName === filterCategory : true;
      const matchStatus = filterStatus ? biz.status === filterStatus : true;
      return matchName && matchCategory && matchStatus;
    });
  }, [businesses, filterName, filterCategory, filterStatus]);

  const handleOpenAdd = () => {
    setEditingBusiness(null);
    setModalTab("basic");
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (biz, e) => {
    if (e) e.stopPropagation();
    setEditingBusiness(biz);
    setModalTab("basic");
    const sl = biz.socialLinks && typeof biz.socialLinks === "object" ? biz.socialLinks : {};
    setFormData({
      name: biz.name || "",
      category: getCategoryName(biz) || "IT & Software",
      subCategory: biz.subCategory || "",
      tagline: biz.tagline || "",
      owner: biz.owner || "",
      phone: biz.phone || "",
      whatsapp: biz.whatsapp || "",
      email: biz.email || "",
      website: biz.website || "",
      address: biz.address || "",
      locality: biz.locality || "Amravati",
      pincode: biz.pincode || "444601",
      timings: biz.timings || "Open · Closes 7:00 PM",
      directionsUrl: biz.directionsUrl || "",
      establishedYear: biz.establishedYear ? String(biz.establishedYear) : "",
      employeeCount: biz.employeeCount || "1-10",
      pricingTier: biz.pricingTier || "Verified",
      status: biz.status || "verified",
      featured: Boolean(biz.featured),
      logoUrl: biz.logoUrl || "",
      coverImage: biz.coverImage || "",
      photosText: Array.isArray(biz.photos) ? biz.photos.join("\n") : "",
      videosText: Array.isArray(biz.videos) ? biz.videos.join("\n") : "",
      about: biz.about || "",
      servicesText: Array.isArray(biz.services) ? biz.services.join(", ") : "",
      productsText: Array.isArray(biz.products) ? biz.products.join(", ") : "",
      tagsText: Array.isArray(biz.tags) ? biz.tags.join(", ") : "",
      instagram: sl.instagram || "",
      linkedin: sl.linkedin || "",
      facebook: sl.facebook || "",
      youtube: sl.youtube || "",
      twitter: sl.twitter || ""
    });
    setIsModalOpen(true);
  };

  const parseLines = (str) =>
    str
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter business name");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      category: formData.category,
      subCategory: formData.subCategory.trim(),
      tagline: formData.tagline.trim() || null,
      owner: formData.owner.trim(),
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim(),
      website: formData.website.trim(),
      address: formData.address.trim(),
      locality: formData.locality.trim() || "Amravati",
      pincode: formData.pincode.trim() || "444601",
      timings: formData.timings.trim() || "Open · Closes 7:00 PM",
      directionsUrl: formData.directionsUrl.trim() || null,
      establishedYear: formData.establishedYear ? Number(formData.establishedYear) : null,
      employeeCount: formData.employeeCount,
      pricingTier: formData.pricingTier,
      status: formData.status,
      featured: Boolean(formData.featured),
      logoUrl: formData.logoUrl.trim() || null,
      coverImage: formData.coverImage.trim() || null,
      photos: parseLines(formData.photosText),
      videos: parseLines(formData.videosText),
      about: formData.about.trim() || null,
      services: parseLines(formData.servicesText),
      products: parseLines(formData.productsText),
      tags: parseLines(formData.tagsText),
      socialLinks: {
        instagram: formData.instagram.trim(),
        linkedin: formData.linkedin.trim(),
        facebook: formData.facebook.trim(),
        youtube: formData.youtube.trim(),
        twitter: formData.twitter.trim()
      }
    };

    try {
      if (editingBusiness) {
        const res = await axios.put(`${API_BASE_URL}/api/v1/businesses/${editingBusiness.id}`, payload);
        const updatedRow = res.data?.data || { ...editingBusiness, ...payload };
        setBusinesses((prev) =>
          prev.map((b) => (b.id === editingBusiness.id ? updatedRow : b))
        );
        toast.success("Business profile updated!", { icon: "✅" });
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/v1/businesses`, payload);
        const createdRow = res.data?.data || {
          id: `biz_${Date.now()}`,
          ...payload,
          rating: 5.0,
          reviewCount: 0,
          createdAt: new Date().toISOString()
        };
        setBusinesses((prev) => [createdRow, ...prev]);
        toast.success("New business listing added!", { icon: "🎉" });
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to save business");
    }
  };

  const handleToggleStatus = async (biz, e) => {
    if (e) e.stopPropagation();
    const nextStatus = biz.status === "verified" ? "pending" : "verified";
    try {
      try {
        await axios.put(`${API_BASE_URL}/api/v1/businesses/${biz.id}`, { status: nextStatus });
      } catch {}
      setBusinesses((prev) =>
        prev.map((b) => (b.id === biz.id ? { ...b, status: nextStatus } : b))
      );
      toast.success(
        nextStatus === "verified" ? `Verified ${biz.name}!` : `Marked ${biz.name} as Pending.`,
        { icon: nextStatus === "verified" ? "🛡️" : "⏳" }
      );
    } catch {}
  };

  const handleDelete = async (biz, e) => {
    if (e) e.stopPropagation();
    if (!(await customConfirm(`Delete "${biz.name}" from directory?`))) return;

    try {
      try {
        await axios.delete(`${API_BASE_URL}/api/v1/businesses/${biz.id}`);
      } catch {}
      setBusinesses((prev) => prev.filter((b) => b.id !== biz.id));
      toast.error(`"${biz.name}" deleted.`, { icon: "🗑️" });
    } catch {}
  };

  return (
    <div className="w-full h-full p-4 md:p-8 text-gray-800 bg-transparent flex flex-col">
      <div className="w-full mx-auto space-y-4 flex flex-col flex-1 h-full min-h-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1a73e8] flex items-center justify-center shrink-0 shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Directory Businesses</h1>
              <p className="text-gray-600 max-w-2xl text-sm mt-0.5">
                Verify, inspect, and manage verified commercial establishments in Amravati.
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
              onClick={() => setFilterStatus(filterStatus === "verified" ? "" : "verified")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                filterStatus === "verified"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${filterStatus === "verified" ? "bg-white/20" : "bg-emerald-100"}`}>
                {counts.verified}
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
              onClick={handleOpenAdd}
              className="bg-[#b7131a] hover:bg-[#9c0f15] text-white font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-xs transition active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Business
            </button>

            <button
              onClick={() => {
                const exportData = filteredBusinesses.map((b) => ({
                  ...b,
                  category: getCategoryName(b),
                  sector: getCategorySector(b)
                }));
                exportToCSV(exportData, "amravati_businesses.csv");
              }}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-2xs transition active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export
            </button>
          </div>
        </div>

        {/* Businesses Table */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse whitespace-nowrap relative table-fixed">
              <thead className="bg-[#FAF8F7] border-b border-gray-200/80 sticky top-0 z-20 shadow-2xs text-gray-700">
                <tr>
                  <th className="px-4 py-3.5 w-[28%] relative">
                    <div className="flex items-center justify-start gap-1 h-[26px]">
                      <span className="text-gray-600 text-xs font-bold tracking-wider   ">Business Name</span>
                      <button
                        onClick={() => setOpenFilters((p) => ({ ...p, name: !p.name }))}
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
                            placeholder="Search name, phone, address..."
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
                  <th className="px-4 py-3.5 w-[16%] text-xs font-bold tracking-wider text-gray-600   ">Category</th>
                  <th className="px-4 py-3.5 w-[16%] text-xs font-bold tracking-wider text-gray-600   ">Contact</th>
                  <th className="px-4 py-3.5 w-[22%] text-xs font-bold tracking-wider text-gray-600   ">Location</th>
                  <th className="px-4 py-3.5 w-[10%] text-center text-xs font-bold tracking-wider text-gray-600   ">Status</th>
                  <th className="px-4 py-3.5 w-[8%] text-right text-xs font-bold tracking-wider text-gray-600    pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <TableRowsSkeleton rows={8} cols={6} />
                ) : filteredBusinesses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Building2 className="w-8 h-8 text-gray-300" />
                        <p className="text-sm font-medium">No businesses found matching your filter.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBusinesses.map((biz) => (
                  <tr
                    key={biz.id}
                    onClick={(e) => handleOpenEdit(biz, e)}
                    className="hover:bg-[#FAF8F7] transition cursor-pointer group"
                  >
                    {/* Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-[#FFDADA] text-gray-700 group-hover:text-[#b7131a] flex items-center justify-center transition-colors shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 group-hover:text-[#b7131a] transition-colors truncate">
                            {biz.name}
                          </div>
                          <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                            <span className="flex items-center text-amber-500 font-semibold">
                              <Star className="w-3 h-3 fill-current mr-0.5" /> {biz.rating}
                            </span>
                            <span>•</span>
                            <span>{biz.reviewCount} reviews</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Macro Sector */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                          {getCategoryName(biz) || "General"}
                        </span>
                        {getCategorySector(biz) && (
                          <span className="text-[10px] text-indigo-600 font-semibold px-1">
                            {getCategorySector(biz)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3.5">
                      <div className="text-xs font-semibold text-gray-800">{biz.phone}</div>
                      <div className="text-[11px] text-gray-400 truncate">{biz.owner || biz.email}</div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 text-xs text-gray-600 truncate max-w-xs" title={biz.address}>
                      <div className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">{biz.address}</span>
                      </div>
                    </td>

                    {/* Status Badge Toggle */}
                    <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleToggleStatus(biz, e)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          biz.status === "verified"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="capitalize">{biz.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => handleOpenEdit(biz, e)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(biz, e)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
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

      {/* Add / Edit Business Modal (3 Tabs: Basic, Media & Videos, About & Socials) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in duration-150 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E8F0FE] text-[#1a73e8] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {editingBusiness ? "Edit Business Profile" : "Add New Business"}
                  </h3>
                  <p className="text-xs text-gray-500">Manage profile details, images, video links, services, and socials.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Section Tabs */}
            <div className="flex items-center gap-2 mt-4 border-b border-gray-100 pb-3">
              {[
                { id: "basic", label: "Basic & Contact" },
                { id: "media", label: "Images & Videos" },
                { id: "about", label: "About, Services & Socials" }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setModalTab(t.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    modalTab === t.id
                      ? "bg-[#b7131a] text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4">
              {modalTab === "basic" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BIZONANCE INDIA PVT. LTD."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Category &amp; Sector</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      >
                        {availableCategories.length > 0 ? (
                          availableCategories.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name} ({c.sector})
                            </option>
                          ))
                        ) : (
                          <option value="IT & Software">IT & Software (Technology)</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Sub-Category / Niche</label>
                      <input
                        type="text"
                        placeholder="e.g. Software Company in Amravati"
                        value={formData.subCategory}
                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Tagline / Short Bio</label>
                    <input
                      type="text"
                      placeholder="e.g. The Special Kind of Business Reinforcement"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Owner / Contact Person</label>
                      <input
                        type="text"
                        placeholder="e.g. Ritesh Wankhade"
                        value={formData.owner}
                        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        placeholder="+91 7212550123"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        placeholder="919822001122"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="contact@business.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Website URL</label>
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Address</label>
                      <input
                        type="text"
                        placeholder="Ravi Kiran, near DPS, Saturna, Amravati"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Locality / Area</label>
                      <input
                        type="text"
                        placeholder="Saturna"
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Opening Timings</label>
                      <input
                        type="text"
                        placeholder="Open · Closes 7:00 PM"
                        value={formData.timings}
                        onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Pricing Tier</label>
                      <select
                        value={formData.pricingTier}
                        onChange={(e) => setFormData({ ...formData, pricingTier: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      >
                        <option value="Verified">Verified</option>
                        <option value="Premium">Premium</option>
                        <option value="Enterprise / Custom">Enterprise / Custom</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Basic Pack">Basic Pack</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Verification Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm font-bold text-gray-900"
                      >
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Google Maps Directions URL</label>
                      <input
                        type="url"
                        placeholder="https://maps.google.com/..."
                        value={formData.directionsUrl}
                        onChange={(e) => setFormData({ ...formData, directionsUrl: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Established Year</label>
                      <input
                        type="number"
                        placeholder="2020"
                        value={formData.establishedYear}
                        onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div className="flex items-end pb-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 accent-[#b7131a] rounded"
                        />
                        <span>Featured Listing (#1 Priority)</span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {modalTab === "media" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Transparent Company Logo URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://... or /bizonance_logo.png"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                      {formData.logoUrl && (
                        <div className="mt-2 p-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center h-20">
                          <img src={formData.logoUrl} alt="Logo Preview" className="max-h-16 object-contain" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Cover / Banner Image URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                      {formData.coverImage && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 h-20">
                          <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Photos Gallery URLs (One URL per line or comma-separated)
                    </label>
                    <textarea
                      rows={3}
                      placeholder={"https://images.unsplash.com/photo-1...\nhttps://images.unsplash.com/photo-2..."}
                      value={formData.photosText}
                      onChange={(e) => setFormData({ ...formData, photosText: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Video Links (YouTube / Vimeo URLs, one per line)
                    </label>
                    <textarea
                      rows={3}
                      placeholder={"https://www.youtube.com/watch?v=...\nhttps://youtu.be/..."}
                      value={formData.videosText}
                      onChange={(e) => setFormData({ ...formData, videosText: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900 font-mono"
                    />
                  </div>
                </>
              )}

              {modalTab === "about" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      About Us (Full Description)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write a detailed overview of the business, mission, and key achievements..."
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Services &amp; Specializations (Comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="Custom Software, Cloud Apps, Digital Marketing & SEO, Branding"
                      value={formData.servicesText}
                      onChange={(e) => setFormData({ ...formData, servicesText: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Products / Packages (Comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="ERP Suite, E-Commerce Starter, Cloud Hosting"
                        value={formData.productsText}
                        onChange={(e) => setFormData({ ...formData, productsText: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Search Tags (Comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="software, cloud, amravati, seo"
                        value={formData.tagsText}
                        onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <label className="block text-xs font-bold text-gray-800 mb-2">
                      Follow Us / Social Media Links
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="url"
                        placeholder="Instagram URL"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs text-gray-900"
                      />
                      <input
                        type="url"
                        placeholder="LinkedIn URL"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs text-gray-900"
                      />
                      <input
                        type="url"
                        placeholder="Facebook URL"
                        value={formData.facebook}
                        onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs text-gray-900"
                      />
                      <input
                        type="url"
                        placeholder="YouTube URL"
                        value={formData.youtube}
                        onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none text-xs text-gray-900"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#b7131a] hover:bg-[#9c0f15] text-white text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  {editingBusiness ? "Save Changes" : "Create Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
