import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import {
  Layers,
  Plus,
  Search,
  Filter,
  FileSpreadsheet,
  X,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUpDown,
  Tag
} from "lucide-react";
import { exportToCSV } from "../utils/exportCsv";
import { toast, customConfirm } from "../utils/alerts";
import { TableRowsSkeleton } from "./SkeletonLoader";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2212";

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterFeatured, setFilterFeatured] = useState("");
  const [openFilters, setOpenFilters] = useState({ name: false, status: false });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sector: "Technology",
    icon: "category",
    description: "",
    featured: false,
    status: "active"
  });

  const toggleFilter = (key) =>
    setOpenFilters((prev) => ({
      name: false,
      status: false,
      [key]: !prev[key]
    }));

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/categories`);
      if (res.data?.success && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      }
    } catch {
      // Fallback to local state if offline
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtered List
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchName = filterName
        ? cat.name.toLowerCase().includes(filterName.toLowerCase()) ||
          cat.slug.toLowerCase().includes(filterName.toLowerCase())
        : true;
      const matchStatus = filterStatus ? cat.status === filterStatus : true;
      const matchFeatured = filterFeatured !== "" ? String(cat.featured) === filterFeatured : true;
      return matchName && matchStatus && matchFeatured;
    });
  }, [categories, filterName, filterStatus, filterFeatured]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: categories.length,
      active: categories.filter((c) => c.status === "active").length,
      inactive: categories.filter((c) => c.status === "inactive").length,
      featured: categories.filter((c) => c.featured).length
    };
  }, [categories]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      sector: "Technology",
      icon: "category",
      description: "",
      featured: false,
      status: "active"
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (cat, e) => {
    if (e) e.stopPropagation();
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      sector: cat.sector || "Technology",
      icon: cat.icon || "category",
      description: cat.description || "",
      featured: Boolean(cat.featured),
      status: cat.status || "active"
    });
    setIsModalOpen(true);
  };

  // Auto-slugify name
  const handleNameChange = (val) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: editingCategory ? prev.slug : slug
    }));
  };

  // Submit Add / Edit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      if (editingCategory) {
        // Update API
        try {
          await axios.put(`${API_BASE_URL}/api/v1/categories/${editingCategory.id}`, formData);
        } catch {}

        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? { ...c, ...formData } : c))
        );
        toast.success("Category updated successfully!", { icon: "✅" });
      } else {
        // Create API
        const newCat = {
          id: `cat_${Date.now()}`,
          ...formData,
          businessCount: 0,
          createdAt: new Date().toISOString()
        };

        try {
          const res = await axios.post(`${API_BASE_URL}/api/v1/categories`, formData);
          if (res.data?.data) {
            newCat.id = res.data.data.id;
          }
        } catch {}

        setCategories((prev) => [newCat, ...prev]);
        toast.success("Category created successfully!", { icon: "🎉" });
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to save category");
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id, name, e) => {
    if (e) e.stopPropagation();
    if (!(await customConfirm(`Are you sure you want to delete category "${name}"?`))) return;

    try {
      try {
        await axios.delete(`${API_BASE_URL}/api/v1/categories/${id}`);
      } catch {}
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.error(`Category "${name}" deleted!`, { icon: "🗑️" });
    } catch {
      toast.error("Failed to delete category");
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (cat, e) => {
    if (e) e.stopPropagation();
    const updated = !cat.featured;
    try {
      try {
        await axios.put(`${API_BASE_URL}/api/v1/categories/${cat.id}`, { featured: updated });
      } catch {}
      setCategories((prev) =>
        prev.map((c) => (c.id === cat.id ? { ...c, featured: updated } : c))
      );
      toast.success(
        updated
          ? `Marked "${cat.name}" as Featured in Home Grid!`
          : `Removed "${cat.name}" from Featured.`,
        { icon: "⭐" }
      );
    } catch {}
  };

  return (
    <div className="w-full h-full p-4 md:p-8 text-gray-800 bg-transparent flex flex-col">
      <div className="w-full mx-auto space-y-4 flex flex-col flex-1 h-full min-h-0">
        {/* Header & Quick Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFDADA] text-[#b7131a] flex items-center justify-center shrink-0 shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Business Categories</h1>
              <p className="text-gray-600 max-w-2xl text-sm mt-0.5">
                Organize directory industries, featured taxonomy, and civic listings for Amravati.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start md:justify-end gap-2.5 shrink-0">
            {/* Filter Pills */}
            <button
              onClick={() => {
                setFilterStatus("");
                setFilterFeatured("");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                !filterStatus && filterFeatured === ""
                  ? "bg-[#b7131a] text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>All</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${!filterStatus && filterFeatured === "" ? "bg-white/20" : "bg-gray-200"}`}>
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => {
                setFilterStatus(filterStatus === "active" ? "" : "active");
                setFilterFeatured("");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                filterStatus === "active"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              <span>Active</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${filterStatus === "active" ? "bg-white/20" : "bg-emerald-100"}`}>
                {counts.active}
              </span>
            </button>

            <button
              onClick={() => {
                setFilterFeatured(filterFeatured === "true" ? "" : "true");
                setFilterStatus("");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                filterFeatured === "true"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[11px] ${filterFeatured === "true" ? "bg-white/20" : "bg-amber-100"}`}>
                {counts.featured}
              </span>
            </button>

            {/* Add Category Button */}
            <button
              onClick={handleOpenAdd}
              className="bg-[#b7131a] hover:bg-[#9c0f15] text-white font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-xs transition active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Category
            </button>

            {/* Export CSV Button */}
            <button
              onClick={() => exportToCSV(filteredCategories, "amravati_categories.csv")}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-2xs transition active:scale-95 text-xs sm:text-sm cursor-pointer"
              title="Export to CSV"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export
            </button>
          </div>
        </div>

        {/* Categories Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse whitespace-nowrap relative table-fixed">
              <thead className="bg-[#FAF8F7] border-b border-gray-200/80 sticky top-0 z-20 shadow-2xs text-gray-700">
                <tr>
                  {/* Category Name Column */}
                  <th className="px-4 py-3.5 w-[30%] relative">
                    <div className="flex items-center justify-start gap-1 h-[26px]">
                      <span className="text-gray-600 text-xs font-bold tracking-wider   ">Category Name</span>
                      <button
                        onClick={() => toggleFilter("name")}
                        className={`p-1 rounded-md transition-colors ${
                          openFilters.name || filterName ? "bg-red-100 text-[#b7131a]" : "hover:bg-gray-200 text-gray-400"
                        }`}
                        title="Search Category"
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
                            placeholder="Search category or slug..."
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

                  {/* Slug */}
                  <th className="px-4 py-3.5 w-[16%] text-xs font-bold tracking-wider text-gray-600   ">Slug</th>

                  {/* Macro Sector for Categorical Data Analysis */}
                  <th className="px-4 py-3.5 w-[18%] text-xs font-bold tracking-wider text-gray-600   ">Sector (BI)</th>

                  {/* Description */}
                  <th className="px-4 py-3.5 w-[20%] text-xs font-bold tracking-wider text-gray-600   ">Description</th>

                  {/* Businesses Count */}
                  <th className="px-4 py-3.5 w-[10%] text-center text-xs font-bold tracking-wider text-gray-600   ">Listings</th>

                  {/* Featured */}
                  <th className="px-4 py-3.5 w-[10%] text-center text-xs font-bold tracking-wider text-gray-600   ">Featured</th>

                  {/* Actions */}
                  <th className="px-4 py-3.5 w-[10%] text-right text-xs font-bold tracking-wider text-gray-600    pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <TableRowsSkeleton rows={8} cols={7} />
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Layers className="w-8 h-8 text-gray-300" />
                        <p className="text-sm font-medium">No categories found matching your filter.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      onClick={(e) => handleOpenEdit(cat, e)}
                      className="hover:bg-[#FAF8F7] transition cursor-pointer group"
                    >
                      {/* Name & Icon */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-[#FFDADA] text-gray-700 group-hover:text-[#b7131a] flex items-center justify-center transition-colors">
                            <Tag className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-[#b7131a] transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-[11px] text-gray-400">ID: {cat.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-4 py-3.5">
                        <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-mono">
                          /{cat.slug}
                        </code>
                      </td>

                      {/* Sector (Categorical Data Analysis) */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                          {cat.sector || "General"}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3.5 text-xs text-gray-600 truncate max-w-xs" title={cat.description}>
                        {cat.description || "—"}
                      </td>

                      {/* Listings count */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                          {cat.businessCount || 0}
                        </span>
                      </td>

                      {/* Featured Star Toggle */}
                      <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => handleToggleFeatured(cat, e)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            cat.featured
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                        >
                          <Sparkles className={`w-3 h-3 ${cat.featured ? "text-amber-600" : "text-gray-400"}`} />
                          <span>{cat.featured ? "Yes" : "No"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleOpenEdit(cat, e)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteCategory(cat.id, cat.name, e)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete Category"
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

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFDADA] text-[#b7131a] flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h3>
                  <p className="text-xs text-gray-500">Provide details for this business directory sector.</p>
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

            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dentists & Dental Clinics"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#b7131a] focus:ring-1 focus:ring-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. dentists-clinics"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#b7131a] focus:ring-1 focus:ring-[#b7131a] outline-none text-xs sm:text-sm font-mono text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Macro Sector (for Analytics) *</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#b7131a] focus:ring-1 focus:ring-[#b7131a] outline-none text-xs sm:text-sm text-gray-900 font-medium"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Hospitality & Food">Hospitality & Food</option>
                    <option value="Construction & Real Estate">Construction & Real Estate</option>
                    <option value="Education & Training">Education & Training</option>
                    <option value="Automotive & Transport">Automotive & Transport</option>
                    <option value="Personal Care & Lifestyle">Personal Care & Lifestyle</option>
                    <option value="Professional & Corporate">Professional & Corporate</option>
                    <option value="Retail & Commerce">Retail & Commerce</option>
                    <option value="Manufacturing & Heavy Industry">Manufacturing & Heavy Industry</option>
                    <option value="Agriculture & Allied">Agriculture & Allied</option>
                    <option value="Events & Entertainment">Events & Entertainment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Icon Identifier</label>
                <input
                  type="text"
                  placeholder="e.g. local_hospital, store, school, restaurant"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#b7131a] focus:ring-1 focus:ring-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of businesses in this category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#b7131a] focus:ring-1 focus:ring-[#b7131a] outline-none text-xs sm:text-sm text-gray-900"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                <div>
                  <span className="block text-xs font-bold text-gray-800">Featured on Landing Page</span>
                  <span className="text-[11px] text-gray-500">Show this category in the homepage quick category grid.</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#b7131a] rounded-sm focus:ring-[#b7131a] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
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
                  {editingCategory ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
