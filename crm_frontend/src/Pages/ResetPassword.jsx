import React, { useContext, useState } from "react";
import { AppContext } from "../Components/Context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  // SEND RESET OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/send-reset-otp?email=${email}`);
      if (response.status === 200) {
        toast.success("OTP sent successfully!");
        setEmailSent(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      toast.error("OTP & New Password required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/reset-password`, {
        email,
        otp,
        newPassword
      });

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100"
         style={{ background: "linear-gradient(90deg, #60faf9, #8268f9)" }}>

      <div className="text-center">

        {/* Logo */}
        <a href="/" className="text-decoration-none d-inline-flex align-items-center mb-4">
          <img src={assets.Logo} alt="logo" height={32} width={32} />
          <span className="fs-4 fw-semibold text-light ms-2">Customer</span>
        </a>

        {/* White Theme Card */}
        <div className="p-5 rounded-4 shadow bg-white" style={{ width: "400px" }}>
          <h4 className="text-center fw-bold mb-2 text-dark">
            Reset Password
          </h4>

          {!isEmailSent && (
            <>
              <p className="text-center text-secondary mb-4">
                Enter your email to receive OTP
              </p>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="email@example.com"
                style={{ height: "50px", fontSize: "1.2rem" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="btn btn-primary w-100 fw-semibold"
                disabled={loading}
                onClick={handleSendOtp}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {isEmailSent && (
            <>
              <p className="text-center text-secondary mb-4">
                Enter OTP and your new password
              </p>

              <label className="text-dark mb-1">OTP</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="6-digit OTP"
                style={{ height: "50px", fontSize: "1.2rem" }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <label className="text-dark mb-1">New Password</label>
              <input
                type="password"
                className="form-control mb-4"
                placeholder="Enter new password"
                style={{ height: "50px", fontSize: "1.2rem" }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                className="btn btn-success w-100 fw-semibold"
                disabled={loading}
                onClick={handleResetPassword}
              >
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
