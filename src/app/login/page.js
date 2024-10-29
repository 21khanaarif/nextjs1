"use client";

import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showVerifyPrompt, setShowVerifyPrompt] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);

  // Handle login logic
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.is_verified) {
          alert('Login Successful');
          // Optionally redirect or handle further logic here
        } else {
          setUserId(data.user.id);  // Store the user ID for OTP verification
          setShowVerifyPrompt(true);  // Show OTP verification prompt
        }
      } else {
        alert('Login failed: ' + (data.error ? data.error.message : 'Unknown error'));
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred during login');
    }
  };

  // Handle sending OTP
  const handleSendOtp = async () => {
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert('OTP sent to your email');
      } else {
        const data = await res.json();
        alert('Failed to send OTP: ' + data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred while sending OTP');
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Verification successful. You can now log in.');
        setShowVerifyPrompt(false);
      } else {
        alert('OTP verification failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('An error occurred during OTP verification');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <input
        type="email"
        placeholder="Email ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Login Here</button>

      {showVerifyPrompt && (
        <div style={styles.verifyContainer}>
          <p>Your account is not verified. Click "Send OTP" to verify.</p>
          <button onClick={handleSendOtp} style={styles.button}>Send OTP</button>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleVerifyOtp} style={styles.button}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

// Styles object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    maxWidth: '300px',
    width: '100%',
    marginBottom: '10px',
  },
  verifyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
};
