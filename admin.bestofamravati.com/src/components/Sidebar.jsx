"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Layers,
  Building2,
  MessageSquare,
  Star,
  Settings as SettingsIcon,
  HelpCircle
} from "lucide-react"

// Import Best of Amravati dashboard components
import MainDashboard from "./Dashboard.jsx"
import Categories from "./Categories.jsx"
import Businesses from "./Businesses.jsx"
import Inquiries from "./Inquiries.jsx"
import ReviewsManagement from "./ReviewsManagement.jsx"
import Settings from "./Settings.jsx"

// Sidebar configuration for Best of Amravati
const sidebarItems = [
  {
    title: "Dashboard",
    Content: MainDashboard,
    Icon: LayoutDashboard,
    bg: "#FFDADA",
    fg: "#b7131a"
  },
  {
    title: "Categories",
    Content: Categories,
    Icon: Layers,
    bg: "#EBF3FF",
    fg: "#004A77"
  },
  {
    title: "Businesses",
    Content: Businesses,
    Icon: Building2,
    bg: "#DDF5E6",
    fg: "#0F5223"
  },
  {
    title: "Leads & Inquiries",
    Content: Inquiries,
    Icon: MessageSquare,
    bg: "#FFEBD4",
    fg: "#8A5300"
  },
  {
    title: "Reviews",
    Content: ReviewsManagement,
    Icon: Star,
    bg: "#FEF3C7",
    fg: "#B45309"
  },
  {
    title: "Settings",
    Content: Settings,
    Icon: SettingsIcon,
    bg: "#E2E8F0",
    fg: "#334155"
  }
]

function Sidebar({ isOpen: propIsOpen }) {
  const [activeContent, setActiveContent] = useState(() => {
    const savedTab = localStorage.getItem("activeDashboardTab")
    return savedTab ? savedTab : "Dashboard"
  })
  const [activeFilter, setActiveFilter] = useState("")

  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(propIsOpen)

  const switchTab = (tab, filter = "") => {
    setActiveContent(tab)
    setActiveFilter(filter)
  }

  useEffect(() => {
    localStorage.setItem("activeDashboardTab", activeContent)
  }, [activeContent])

  useEffect(() => {
    const handleNav = (e) => {
      if (typeof e.detail === "object" && e.detail !== null) {
        switchTab(e.detail.tab, e.detail.filter || "")
      } else if (typeof e.detail === "string") {
        switchTab(e.detail, "")
      }
    }
    window.addEventListener("navigateDashboardTab", handleNav)
    return () => window.removeEventListener("navigateDashboardTab", handleNav)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setIsOpen(false)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) setIsOpen(propIsOpen)
  }, [propIsOpen, isMobile])

  const getContent = (title) => {
    const item = sidebarItems.find((item) => item.title === title)
    return item ? (
      <item.Content
        key={`${title}-${activeFilter}`}
        setActiveContent={switchTab}
        initialFilter={activeFilter}
      />
    ) : null
  }

  const renderSidebarButton = (item, index) => {
    const isActive = activeContent === item.title
    return (
      <div key={index} className="w-full">
        <button
          onClick={() => {
            switchTab(item.title, "")
            if (isMobile) setIsOpen(false)
          }}
          title={item.title}
          className={`flex items-center w-full ${
            isOpen ? "justify-start gap-3 pl-2.5 pr-4" : "justify-center px-0"
          } py-2 rounded-full text-[14px] font-medium transition-all duration-150 ease-in-out whitespace-nowrap cursor-pointer ${
            isActive
              ? "bg-white text-gray-900 font-bold shadow-xs border border-gray-200/60"
              : "text-gray-700 hover:bg-[#E5E9EF]"
          }`}
        >
          <span
            className="shrink-0 w-[38px] h-[38px] rounded-full flex items-center justify-center transition-transform"
            style={{ backgroundColor: item.bg }}
          >
            <item.Icon size={18} color={item.fg} strokeWidth={2.4} />
          </span>
          {isOpen && <span className="truncate">{item.title}</span>}
        </button>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <div className="flex h-[calc(100vh-72px)]">
        {/* Sidebar Navigation */}
        <aside
          className={`bg-[#F0F4F9] h-full flex flex-col py-4 px-3 space-y-1.5 shrink-0 overflow-y-auto z-10 border-r border-gray-200/60 no-scrollbar transition-all duration-200 ${
            isOpen ? "w-[17.5rem]" : "w-[5.5rem]"
          }`}
        >
          {sidebarItems.map((item, index) => renderSidebarButton(item, index))}
        </aside>

        {/* Main Content Area */}
        <div className="content flex-1 bg-[#F0F4F9] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {getContent(activeContent)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
