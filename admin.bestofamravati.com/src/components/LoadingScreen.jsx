import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ text = "Loading data..." }) {
  // Array to map through for dummy skeleton rows
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="w-full h-full p-4 md:p-8 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Skeleton Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="h-7 w-48 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 w-72 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
          <div className="h-11 w-full md:w-[400px] bg-gray-100 rounded-md animate-pulse"></div>
        </div>

        {/* Skeleton Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-[#DCE6FA]">
                <tr>
                  <th className="px-6 py-4 border-b border-gray-100"><div className="h-4 w-24 bg-blue-200/50 rounded animate-pulse"></div></th>
                  <th className="px-6 py-4 border-b border-gray-100"><div className="h-4 w-20 bg-blue-200/50 rounded animate-pulse"></div></th>
                  <th className="px-6 py-4 border-b border-gray-100"><div className="h-4 w-24 bg-blue-200/50 rounded animate-pulse"></div></th>
                  <th className="px-6 py-4 border-b border-gray-100"><div className="h-4 w-32 bg-blue-200/50 rounded animate-pulse"></div></th>
                  <th className="px-6 py-4 border-b border-gray-100 text-right"><div className="h-4 w-16 bg-blue-200/50 rounded ml-auto animate-pulse"></div></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {skeletonRows.map((_, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
                      </div>
                    </td>
                    <td className="px-6 py-5"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div></td>
                    <td className="px-6 py-5"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse"></div></td>
                    <td className="px-6 py-5"><div className="h-4 w-40 bg-gray-100 rounded animate-pulse"></div></td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-8 w-8 bg-gray-100 rounded-md animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-100 rounded-md animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-100 rounded-md animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading Text Indicator */}
        <div className="flex justify-center pt-4">
           <motion.p
             initial={{ opacity: 0.5 }}
             animate={{ opacity: 1 }}
             transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
             className="text-gray-400 font-medium text-sm"
           >
             {text}
           </motion.p>
        </div>

      </div>
    </div>
  );
}

