"use client";

import { useState } from 'react';

export default function RegisterForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // State to show success tick

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowSuccess(true); // Show the success tick animation
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to the login page
        }, 1500); // Wait for the animation to finish before redirecting
      } else {
        alert(`Registration Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        {showSuccess ? (
          <div style={styles.successContainer}>
            <div style={styles.greenTick}>✔</div>
            <p style={styles.successMessage}>Registration Successful!</p>
          </div>
        ) : (
          <>
            <button onClick={onClose} style={styles.closeButton}>X</button>
            <h1 style={styles.title}>Register</h1>
            <form onSubmit={handleRegister} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>First Name:</label>
                <input
                  style={styles.input}
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Last Name:</label>
                <input
                  style={styles.input}
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email:</label>
                <input
                  style={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password:</label>
                <input
                  style={styles.input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" style={styles.button}>Register Here</button>
            </form>
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
    backgroundColor: '#f9f9f9',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '450px',
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
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0070f3',
    marginBottom: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginTop: '5px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '14px 18px',
    marginTop: '20px',
    backgroundColor: '#0070f3',
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
    fontSize: '60px',
    color: 'green',
    animation: 'fadeIn 0.5s ease-out',
  },
  successMessage: {
    fontSize: '18px',
    color: '#333',
    marginTop: '10px',
    animation: 'fadeIn 0.5s ease-out',
  },
};










