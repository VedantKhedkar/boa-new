import React from 'react';
import { createRoot } from 'react-dom/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// We export toast so we can use toast.success and toast.error easily
export { toast };

// Custom async confirmation dialog
export const customConfirm = (message) => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleClose = (result) => {
      root.unmount();
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      resolve(result);
    };

    root.render(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Action</h3>
          <p className="text-gray-600 text-sm mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button 
              onClick={() => handleClose(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={() => handleClose(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  });
};
