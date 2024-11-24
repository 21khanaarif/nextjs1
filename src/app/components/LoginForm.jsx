// src/app/login/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ onClose, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out effect
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success tick
  const [showError, setShowError] = useState(false); // State for showing error cross
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const router = useRouter();

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
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('jwt', data.jwt);

          setUser(data.user); // Update user in Parent component immediately
          setShowSuccess(true); // Show the green tick
          setTimeout(() => {
            setIsFadingOut(true); // Start fade-out animation
          }, 1000); // Display green tick for 1 second

          setTimeout(() => {
            onClose(); // Close the LoginForm popup after animation
            router.push('/');
          }, 1500); // Match duration of the fade-out effect
        } else {
          router.push(`/verify-otp?email=${email}`);
        }
      } else {
        setErrorMessage(data.error ? data.error.message : 'Unknown error');
        setShowError(true); // Show red cross
        setTimeout(() => {
          setShowError(false); // Hide red cross after animation
        }, 2000); // Display for 2 seconds
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('An error occurred during login');
      setShowError(true); // Show red cross
      setTimeout(() => {
        setShowError(false); // Hide red cross after animation
      }, 2000); // Display for 2 seconds
    }
  };

  return (
    <>
      <div style={styles.overlay}></div>
      <div
        style={{
          ...styles.container,
          opacity: isFadingOut ? 0 : 1,
          transform: isFadingOut ? 'translate(-50%, -45%)' : 'translate(-50%, -50%)',
          transition: 'opacity 0.5s, transform 0.5s',
        }}
      >
        {showSuccess ? (
          <div style={styles.successContainer}>
            <div style={styles.greenTick}>✔</div>
            <p style={styles.successMessage}>Login Successful!</p>
          </div>
        ) : showError ? (
          <div style={styles.errorContainer}>
            <div style={styles.redCross}>✖</div>
            <p style={styles.errorMessage}>{errorMessage}</p>
          </div>
        ) : (
          <>
            <button onClick={onClose} style={styles.closeButton}>X</button>
            <h2 style={styles.title}>Welcome Back!</h2>
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
          </>
        )}
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  container: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    cursor: 'pointer',
    padding: '5px 10px',
    transition: 'background-color 0.3s',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#32a895',
    marginBottom: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px 15px',
    marginTop: '20px',
    backgroundColor: '#32a895',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  greenTick: {
    fontSize: '50px',
    color: 'green',
    marginBottom: '10px',
  },
  successMessage: {
    fontSize: '18px',
    color: '#333',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  redCross: {
    fontSize: '50px',
    color: 'red',
    marginBottom: '10px',
  },
  errorMessage: {
    fontSize: '18px',
    color: '#333',
  },
};
