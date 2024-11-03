"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyOtp({ searchParams }) {
  const [otp, setOtp] = useState('');
  const email = searchParams.email; // Retrieve email from query params
  const router = useRouter();

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
        router.push('/login'); // Redirect to login page after successful verification
      } else {
        alert('OTP verification failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      alert('An error occurred during OTP verification');
    }
  };

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

  return (
    <div style={styles.container}>
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
    padding: '20px',
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
};
