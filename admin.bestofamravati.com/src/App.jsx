import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainApp from './components/MainApp.jsx';
import AdminLogin from './components/AdminLogin.jsx';

const contextClass = {
  success: "bg-[#EBF3FF] text-[#004A77] border-blue-200/50",
  error: "bg-red-50 text-red-700 border-red-200/50",
  info: "bg-gray-50 text-gray-700 border-gray-200/50",
  warning: "bg-orange-50 text-orange-700 border-orange-200/50",
  default: "bg-[#EBF3FF] text-[#004A77] border-blue-200/50",
};

// Security: Check karega ki admin logged in hai ya nahi
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken') === 'active_session';
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#F0F4F9] text-[#1F1F1F]">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        closeButton={false}
        limit={1}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-3 min-h-[50px] rounded-full items-center justify-center overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(30,58,138,0.12)] border mt-6 mx-4 sm:mx-0 sm:min-w-[320px] transition-all"
        }
        bodyClassName={() => "flex flex-row-reverse text-[14px] font-semibold items-center justify-center p-1 m-0 gap-2"}
      />
      <Router>
        <Routes>
          {/* Pehle Login Page dikhega */}
          <Route path="/" element={<AdminLogin />} />

          {/* Tera pura dashboard Protected hai */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            } 
          />

          {/* Galat URL par redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
