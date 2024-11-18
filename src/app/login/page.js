// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         if (data.user.is_verified) {
//           // Store user and JWT in localStorage for session persistence
//           localStorage.setItem('user', JSON.stringify(data.user));
//           localStorage.setItem('jwt', data.jwt);

//           alert('Login Successful');
//           router.push('/'); // Redirect to the home page after successful login
//         } else {
//           router.push(`/verify-otp?email=${email}`); // Redirect to OTP verification page
//         }
//       } else {
//         alert('Login failed: ' + (data.error ? data.error.message : 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//       alert('An error occurred during login');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Login</h2>
//       <input
//         type="email"
//         placeholder="Email ID"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={styles.input}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={styles.input}
//       />
//       <button onClick={handleLogin} style={styles.button}>Login Here</button>
//     </div>
//   );
// }

// // Styles object
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f9f9f9',
//     padding: '20px',
//   },
//   title: {
//     fontSize: '28px',
//     marginBottom: '20px',
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     maxWidth: '300px',
//     padding: '10px',
//     marginBottom: '15px',
//     fontSize: '14px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     boxSizing: 'border-box',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#0070f3',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     maxWidth: '300px',
//     width: '100%',
//     marginBottom: '10px',
//   },
// };










"use client";
import { useState } from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const [user, setUser] = useState(null); // Define state for user

  const handleClose = () => {
    // Logic to close the login form modal (e.g., update state or manipulate the DOM)
    console.log('Login form closed');
  };

  return <LoginForm setUser={setUser} onClose={handleClose} />; // Pass onClose as a prop to LoginForm
}
