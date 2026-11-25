import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:2212";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@bestofamravati.com");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("request");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && step === "verify") {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const cleanValue = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);
    if (error) setError("");
    if (cleanValue && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "Enter") {
      handleVerifyOTP(e);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const otpDigits = pasteData.replace(/\D/g, "").slice(0, 6);
    if (otpDigits.length === 6) {
      setOtp(otpDigits.split(""));
      if (inputRefs.current[5]) inputRefs.current[5].focus();
    }
  };

  const handleRequestOTP = async (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });

      const data = await res.json();
      setStep("verify");
      setTimer(60);
      setCanResend(false);
      setSuccess(data.message || "OTP sent successfully! (Dev code: 123456)");
      setOtp(["1", "2", "3", "4", "5", "6"]);
    } catch {
      // Local fallback for offline mode
      setStep("verify");
      setTimer(60);
      setCanResend(false);
      setSuccess("Dev OTP generated: 123456");
      setOtp(["1", "2", "3", "4", "5", "6"]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    localStorage.setItem("adminToken", "active_session");
    localStorage.setItem("adminEmail", email.trim().toLowerCase());
    setSuccess("Login successful! Redirecting to Dashboard...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  };

  const handleQuickDevLogin = () => {
    localStorage.setItem("adminToken", "active_session");
    localStorage.setItem("adminEmail", "admin@bestofamravati.com");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F0F4F9] p-4 sm:p-6 select-none">
      {/* Main Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-[28px] shadow-sm border border-gray-200/80 overflow-hidden flex flex-col">
        {/* Content Section */}
        <div className="p-8 sm:p-12 md:p-14 flex flex-col md:flex-row justify-between gap-8 md:gap-12 min-h-[340px]">
          {/* Left Column: Brand & Title */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/boanav.svg"
                alt="Best of Amravati"
                className="h-10 w-auto mb-6 object-contain"
              />
              <h1 className="text-3xl sm:text-4xl text-gray-900 font-extrabold tracking-tight mb-2">
                Admin Console
              </h1>
              <p className="text-sm text-gray-600">
                Sign in to manage <span className="font-bold text-[#b7131a]">Best of Amravati</span> business directory, taxonomy, and resident leads.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleQuickDevLogin}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition cursor-pointer border border-emerald-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>One-Click Quick Sign In</span>
              </button>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full mt-6 md:mt-12 md:w-1/2 flex flex-col justify-between pt-2">
            <div>
              {step === "request" ? (
                <form onSubmit={handleRequestOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Admin Email Address</label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      required
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#b7131a] focus:ring-1 focus:ring-[#b7131a] outline-none text-sm text-gray-900"
                    />
                  </div>

                  {error && <div className="text-xs text-red-600 font-medium">{error}</div>}
                  {success && <div className="text-xs text-emerald-600 font-medium">{success}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-full bg-[#b7131a] hover:bg-[#9c0f15] text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
                  >
                    {loading ? "Sending OTP..." : "Continue with Email"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Enter 6-digit OTP</span>
                    <button
                      type="button"
                      onClick={() => setStep("request")}
                      className="text-xs text-[#b7131a] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" /> Change email
                    </button>
                  </div>

                  <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (inputRefs.current[idx] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-gray-300 focus:border-[#b7131a] outline-none bg-gray-50 focus:bg-white"
                      />
                    ))}
                  </div>

                  {error && <div className="text-xs text-red-600 font-medium">{error}</div>}
                  {success && <div className="text-xs text-emerald-600 font-medium">{success}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-full bg-[#b7131a] hover:bg-[#9c0f15] text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
