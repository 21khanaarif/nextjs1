"use client";

import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login logic
  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Login Successful');
        // Optionally redirect or handle further logic
      } else {
        alert('Login failed: ' + (data.error ? data.error.message : 'Unknown error'));
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred during login');
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
    </div>
  );
}

// Simple styles object
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
  },
};











