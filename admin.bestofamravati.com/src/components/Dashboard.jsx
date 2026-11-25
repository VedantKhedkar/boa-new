import { useState, useEffect } from "react";
import axios from "axios";
import {
  Building2,
  CheckCircle,
  Clock,
  Layers,
  MessageSquare,
  Star,
  RefreshCw,
  Plus,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { DashboardSkeleton } from "./SkeletonLoader";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2212";

export default function MainDashboard({ setActiveContent }) {
  const [stats, setStats] = useState({
    totalBusinesses: 4,
    verifiedBusinesses: 3,
    pendingBusinesses: 1,
    totalCategories: 8,
    activeCategories: 8,
    totalEnquiries: 3,
    pendingEnquiries: 2,
    contactedEnquiries: 1,
    totalReviews: 3,
    ratingAverage: 4.9
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sectorAnalytics, setSectorAnalytics] = useState([]);

  const fetchMetrics = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const [metricsRes, analyticsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/v1/dashboard/metrics`),
        axios.get(`${API_BASE_URL}/api/v1/analytics/categories`)
      ]);
      if (metricsRes.data?.success && metricsRes.data.data) {
        setStats(metricsRes.data.data);
      }
      if (analyticsRes.data?.success && analyticsRes.data.data?.sectors) {
        setSectorAnalytics(analyticsRes.data.data.sectors);
      }
    } catch (err) {
      console.log("Using cached stats");
    } finally {
      setLoading(false);
      if (isManualRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleNavigate = (tabName, filterStatus = "") => {
    if (typeof setActiveContent === "function") {
      setActiveContent(tabName, filterStatus);
    }
    window.dispatchEvent(
      new CustomEvent("navigateDashboardTab", {
        detail: { tab: tabName, filter: filterStatus }
      })
    );
  };

  return (
    <div className="w-full h-full p-4 md:p-8 bg-[#F0F4F9] text-gray-800 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Best of Amravati <span className="text-[#b7131a]">Executive Dashboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Real-time monitoring of civic directory listings, sectors, and resident leads.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchMetrics(true)}
              className="p-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition cursor-pointer shadow-2xs"
              title="Refresh metrics"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[#b7131a]" : ""}`} />
            </button>
            <button
              onClick={() => handleNavigate("Categories")}
              className="px-4 py-2 rounded-full bg-[#b7131a] hover:bg-[#9c0f15] text-white text-xs sm:text-sm font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>
        </div>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {/* Card 1: Total Businesses */}
          <div
            onClick={() => handleNavigate("Businesses")}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-blue-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] text-[#1a73e8] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-gray-500    tracking-wider">Total Listings</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.totalBusinesses}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Amravati directory
            </div>
          </div>

          {/* Card 2: Verified Listings */}
          <div
            onClick={() => handleNavigate("Businesses", "verified")}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-emerald-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-gray-500    tracking-wider">Verified</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.verifiedBusinesses}</div>
            <div className="text-[10px] text-gray-400 font-medium mt-1">Trust badge active</div>
          </div>

          {/* Card 3: Pending Approvals */}
          <div
            onClick={() => handleNavigate("Businesses", "pending")}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-amber-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-gray-500    tracking-wider">Pending Review</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.pendingBusinesses}</div>
            <div className="text-[10px] text-amber-600 font-semibold mt-1">Requires review</div>
          </div>

          {/* Card 4: Categories */}
          <div
            onClick={() => handleNavigate("Categories")}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-[#b7131a]/40 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFDADA] text-[#b7131a] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-gray-500    tracking-wider">Categories</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.totalCategories}</div>
            <div className="text-[10px] text-gray-400 font-medium mt-1">Taxonomy sectors</div>
          </div>

          {/* Card 5: Inquiries / Leads */}
          <div
            onClick={() => handleNavigate("Leads & Inquiries")}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#EBF3FF] text-[#004A77] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-bold text-gray-500    tracking-wider">Customer Leads</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.totalEnquiries}</div>
            <div className="text-[10px] text-indigo-600 font-semibold mt-1">
              {stats.pendingEnquiries} pending reply
            </div>
          </div>

          {/* Card 6: Reviews */}
          <div
            onClick={() => handleNavigate("Reviews")}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-amber-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div className="text-[11px] font-bold text-gray-500    tracking-wider">Reviews</div>
            <div className="text-2xl font-black text-gray-900 mt-0.5">{stats.totalReviews}</div>
            <div className="text-[10px] text-gray-400 font-medium mt-1">5.0 Star avg</div>
          </div>
        </div>

        {/* Quick Launch Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Manage Categories shortcut */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#FFDADA] text-[#b7131a] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Dynamic API Ready
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-3">Business Categories &amp; Taxonomy</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                Add new industry verticals (e.g. Healthcare, IT, Cafes), configure URL slugs, and choose which categories are highlighted on the public landing page.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">8 active categories in Amravati</span>
              <button
                type="button"
                onClick={() => handleNavigate("Categories")}
                className="text-xs font-bold text-[#b7131a] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open Categories</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Commercial Listings shortcut */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#E8F0FE] text-[#1a73e8] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  Verification Console
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mt-3">Directory Businesses Management</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                Review newly registered businesses in Amravati, verify phone &amp; address authenticity, award verified badges, and toggle featured visibility.
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">3 verified • 1 pending approval</span>
              <button
                type="button"
                onClick={() => handleNavigate("Businesses")}
                className="text-xs font-bold text-[#1a73e8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Directory</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categorical Sector Analysis (BI & Analytics) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b7131a]"></span>
                <h3 className="text-base font-bold text-gray-900">Categorical Data Analysis &amp; Industry Distribution</h3>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Macro-economic sector clustering across Amravati commercial entities.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 self-start sm:self-auto">
              PostgreSQL BI Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sectorAnalytics.length > 0 ? (
              sectorAnalytics.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-gray-50/70 border border-gray-200/60 hover:bg-white hover:border-[#b7131a]/30 hover:shadow-xs transition flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 truncate max-w-[180px]">{sec.sector}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                      {sec.categoryCount} {sec.categoryCount === 1 ? "Category" : "Categories"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-200/50">
                    <span>Active Listings: <strong className="text-gray-900">{sec.totalListings}</strong></span>
                    <span>Demand Leads: <strong className="text-indigo-600">{sec.totalInquiries}</strong></span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-4 text-center text-xs text-gray-400">
                Loading categorical analytical distribution...
              </div>
            )}
          </div>
        </div>

        {/* System Ports Info Strip */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-bold text-gray-800">Connected Microservices Ports:</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600 flex-wrap">
            <span>Frontend: <code className="font-mono font-bold text-primary">localhost:2210</code></span>
            <span>Admin Dashboard: <code className="font-mono font-bold text-primary">localhost:2211</code></span>
            <span>REST API: <code className="font-mono font-bold text-primary">localhost:2212</code></span>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
