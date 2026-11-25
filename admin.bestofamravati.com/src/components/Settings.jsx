import React, { useState } from "react";
import { Settings as SettingsIcon, Globe, Shield, Database, Save, Check } from "lucide-react";
import { toast } from "../utils/alerts";

export default function SettingsDashboard() {
  const [siteName, setSiteName] = useState("Best of Amravati (BOA)");
  const [portalCity, setPortalCity] = useState("Amravati, Maharashtra");
  const [supportEmail, setSupportEmail] = useState("support@bestofamravati.com");
  const [supportPhone, setSupportPhone] = useState("+91 7212530123");
  const [apiUrl, setApiUrl] = useState("http://localhost:2212");

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings saved successfully!", { icon: "✅" });
  };

  return (
    <div className="w-full h-full p-4 md:p-8 text-gray-800 bg-transparent flex flex-col overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Portal Settings &amp; Configuration</h1>
            <p className="text-gray-600 text-sm mt-0.5">
              Manage system parameters, endpoint gateway, and Best of Amravati platform branding.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> General Platform Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Platform Brand Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm outline-none focus:border-[#b7131a]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Operating City / Region</label>
                <input
                  type="text"
                  value={portalCity}
                  onChange={(e) => setPortalCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm outline-none focus:border-[#b7131a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm outline-none focus:border-[#b7131a]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Support Phone</label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm outline-none focus:border-[#b7131a]"
                />
              </div>
            </div>
          </div>

          {/* API Gateway */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" /> API Gateway &amp; Port Settings
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">REST API Gateway URL</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-mono outline-none focus:border-[#b7131a]"
                />
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex flex-col gap-1">
                <span className="font-bold text-gray-800">Assigned Architecture Ports:</span>
                <span>• Main Directory Frontend: <code className="font-mono text-primary font-bold">http://localhost:2210</code></span>
                <span>• Admin Dashboard Console: <code className="font-mono text-primary font-bold">http://localhost:2211</code></span>
                <span>• Central REST API Gateway: <code className="font-mono text-primary font-bold">http://localhost:2212</code></span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#b7131a] hover:bg-[#9c0f15] text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
