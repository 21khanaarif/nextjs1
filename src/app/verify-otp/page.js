
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtp({ searchParams }) {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(null); // Tracks verification or sending status
  const email = searchParams.email;
  const router = useRouter();

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success"); // Show green tick
        setTimeout(() => {
          router.push("/login"); // Navigate to login page after animation
        }, 1500); // Wait for animation before redirect
      } else {
        setStatus("failure"); // Show red cross
        setTimeout(() => setStatus(null), 1500); // Reset status after animation
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setStatus("failure"); // Show red cross
      setTimeout(() => setStatus(null), 1500); // Reset status after animation
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("otp-sent"); // Show OTP sent animation
        setTimeout(() => setStatus(null), 1500); // Reset status after animation
      } else {
        const data = await res.json();
        setStatus("failure"); // Show red cross
        setTimeout(() => setStatus(null), 1500); // Reset status after animation
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setStatus("failure"); // Show red cross
      setTimeout(() => setStatus(null), 1500); // Reset status after animation
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {status === "success" && (
          <div style={styles.animationContainer}>
            <div style={styles.greenTick}>✔</div>
            <p style={styles.successMessage}>OTP Verified Successfully!</p>
          </div>
        )}
        {status === "failure" && (
          <div style={styles.animationContainer}>
            <div style={styles.redCross}>✘</div>
            <p style={styles.failureMessage}>Operation Failed!</p>
          </div>
        )}
        {status === "otp-sent" && (
          <div style={styles.animationContainer}>
            <div style={styles.greenTick}>✔</div>
            <p style={styles.successMessage}>OTP Sent to Your Email!</p>
          </div>
        )}
        {status === null && (
          <>
            <p style={styles.prompt}>
              Your account is not verified. Click "Send OTP" to verify.
            </p>
            <button onClick={handleSendOtp} style={styles.button}>
              Send OTP
            </button>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleVerifyOtp} style={styles.button}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Styles object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  prompt: {
    color: "#444",
    fontWeight: "bold",
    fontSize: "18px",
    margin: "10px 0 20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "12px 0",
    fontSize: "16px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "10px",
    transition: "background-color 0.3s, transform 0.2s",
    fontWeight: "bold",
  },
  animationContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  greenTick: {
    fontSize: "50px",
    color: "green",
    marginBottom: "10px",
    animation: "fadeIn 0.5s ease-in-out",
  },
  redCross: {
    fontSize: "50px",
    color: "red",
    marginBottom: "10px",
    animation: "fadeIn 0.5s ease-in-out",
  },
  successMessage: {
    fontSize: "18px",
    color: "#333",
    fontWeight: "bold",
  },
  failureMessage: {
    fontSize: "18px",
    color: "#333",
    fontWeight: "bold",
  },
};

// Add keyframes for animations in your global CSS
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }
