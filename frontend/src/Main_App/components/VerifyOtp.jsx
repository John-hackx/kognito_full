import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../../api/api";
import axios from "axios";

// VerifyOTPPage.jsx
// Single-file React component (default export) styled with Tailwind CSS.
// Features:
// - Reads user id from route param: /verify/:id
// - 6-digit OTP input with auto-focus and paste handling
// - Resend OTP with cooldown timer
// - Sends OTP to backend: POST `${baseURL}/api/auth/verify/${id}`
// - Error / success handling and loading states

// const baseURL = process.env.REACT_APP_API_URL || "";
const OTP_LENGTH = 6;

export default function VerifyOTPPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  // Resend cooldown (in seconds)
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => {
    let t;
    if (cooldown > 0) {
      t = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    // focus first input on mount
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    if (!val)
      return setOtp((prev) => {
        const next = [...prev];
        next[idx] = "";
        return next;
      });

    setOtp((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
    // move focus
    if (idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      // move back
      inputsRef.current[idx - 1]?.focus();
      setOtp((prev) => {
        const next = [...prev];
        next[idx - 1] = "";
        return next;
      });
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1)
      inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\s+/g, "")
      .replace(/[^0-9]/g, "");
    if (!paste) return;
    const chars = paste.split("").slice(0, OTP_LENGTH);
    setOtp((prev) => {
      const next = [...prev];
      for (let i = 0; i < chars.length; i++) next[i] = chars[i];
      return next;
    });
    const focusIndex = Math.min(chars.length, OTP_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const otpString = otp.join("");
  const isComplete =
    otpString.length === OTP_LENGTH && !otp.some((ch) => ch === "");

  const submitOtp = async (e) => {
    e?.preventDefault();
    setError(null);
    if (!isComplete) {
      setError("Please enter the full OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${baseURL}/api/auth/verifyotp/${id}`,
        { otp: otpString },
        { withCredentials: true }
      );

      // handle successful verification: backend should indicate the result
      setInfo(res?.data?.message || "Verification successful");

      // small delay to show success then redirect to login or dashboard
      setTimeout(() => {
        navigate("/auth", { state: { isLoggin: true } });
      }, 1200);
    } catch (err) {
      console.error("verify error ->", err?.response ?? err);
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Verification failed";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    if (cooldown > 0) return;
    setError(null);
    setInfo(null);
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${baseURL}/api/auth/resend-otp/${id}`,
        {},
        { withCredentials: true }
      );
      setInfo(res?.data?.message || "OTP resent");
      setCooldown(60); // 60 second cooldown
    } catch (err) {
      console.error("resend error ->", err?.response ?? err);
      setError(err?.response?.data?.error || "Could not resend OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">
            Verify your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter the {OTP_LENGTH}-digit code we sent to your email.
          </p>
        </header>

        <form onSubmit={submitOtp} className="space-y-4">
          <div
            className="flex items-center justify-center gap-3"
            onPaste={handlePaste}
          >
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center text-lg rounded-lg border focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none shadow-sm"
                aria-label={`Digit ${idx + 1}`}
              />
            ))}
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {info && (
            <div className="text-sky-700 text-sm text-center">{info}</div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={!isComplete || isSubmitting}
              className={`w-full py-2 rounded-xl text-white font-medium transition ${
                isComplete
                  ? "bg-sky-600 hover:bg-sky-700"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify & Continue"}
            </button>

            <div className="text-center text-sm text-slate-500">
              Didn’t get the code?
              <button
                type="button"
                onClick={resendOtp}
                disabled={cooldown > 0 || isSubmitting}
                className={`ml-2 font-medium underline ${
                  cooldown > 0
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-sky-600 hover:text-sky-700"
                }`}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
              </button>
            </div>
          </div>

          <div className="pt-4 text-center text-xs text-slate-400">
            <p>
              Security tip: OTP expires after a short time. If you did not
              request this, contact support.
            </p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-slate-600 hover:text-slate-800"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
