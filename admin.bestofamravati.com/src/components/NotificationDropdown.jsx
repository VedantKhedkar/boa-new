import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Bell,
  Check,
  RotateCw,
  Building2,
  MessageSquare,
  Layers,
  Star
} from "lucide-react";
import { markIdAsViewed } from "../utils/viewedTracker";

const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:2212";
const STORAGE_KEY = "boa_read_notifications";

export default function NotificationDropdown({ setActiveContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: "notif_1",
      name: "Amit Kale",
      category: "New ERP Inquiry",
      tab: "Leads & Inquiries",
      categoryType: "inquiry",
      badgeColor: "bg-blue-100 text-blue-700",
      time: "10 mins ago",
      timestamp: Date.now() - 600000
    },
    {
      id: "notif_2",
      name: "Vidarbha Reality Developers",
      category: "Pending Verification",
      tab: "Businesses",
      categoryType: "business",
      badgeColor: "bg-amber-100 text-amber-700",
      time: "2 hours ago",
      timestamp: Date.now() - 7200000
    },
    {
      id: "notif_3",
      name: "Sagar Bahadurkar",
      category: "5-Star Review Added",
      tab: "Reviews",
      categoryType: "review",
      badgeColor: "bg-emerald-100 text-emerald-700",
      time: "Yesterday",
      timestamp: Date.now() - 86400000
    }
  ]);

  const [readIds, setReadIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
    } catch (e) {
      console.error("Failed to save read notifications:", e);
    }
  }, [readIds]);

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  const handleMarkAllRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
  };

  const handleItemClick = (item) => {
    if (!readIds.includes(item.id)) {
      setReadIds((prev) => [...prev, item.id]);
    }
    if (typeof setActiveContent === "function" && item.tab) {
      setActiveContent(item.tab);
    }
    window.dispatchEvent(
      new CustomEvent("navigateDashboardTab", {
        detail: { tab: item.tab }
      })
    );
    setIsOpen(false);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.categoryType === filter;
  });

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Bell Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
        title="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#b7131a] text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#b7131a]/10 text-[#b7131a]">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-[#b7131a] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Check size={13} /> Mark all read
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {["all", "inquiry", "business", "review"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filter === f
                    ? "bg-[#b7131a] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500">No notifications here.</div>
            ) : (
              filteredNotifications.map((item) => {
                const isRead = readIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`p-3.5 hover:bg-gray-50 transition cursor-pointer flex items-start gap-3 ${
                      !isRead ? "bg-red-50/20" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        item.badgeColor || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.categoryType === "inquiry" && <MessageSquare size={14} />}
                      {item.categoryType === "business" && <Building2 size={14} />}
                      {item.categoryType === "review" && <Star size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 truncate">{item.name}</span>
                        <span className="text-[10px] text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mt-0.5">{item.category}</p>
                      <span className="text-[10px] font-semibold text-[#b7131a] mt-1 inline-block">
                        Go to {item.tab} →
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
