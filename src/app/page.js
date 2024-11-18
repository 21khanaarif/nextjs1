// "use client";
// import React, { useState, useEffect } from 'react';
// import SearchBar from './components/SearchBar';
// import EventList from './components/EventList';
// import Pagination from './components/Pagination';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [user, setUser] = useState(null); // State to track user info
//   const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
//   const router = useRouter();

//   const eventsPerPage = 6;

//   const fetchEvents = async (page = 1, query = '') => {
//     try {
//       const apiUrl = query
//         ? `http://localhost:1337/api/events?populate=*&filters[Event_Name][$contains]=${query}`
//         : `http://localhost:1337/api/events?populate=*&pagination[page]=${page}&pagination[pageSize]=${eventsPerPage}`;

//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       setEvents(data.data);
//       if (!query) {
//         setTotalPages(data.meta.pagination.pageCount);
//       } else {
//         setTotalPages(1);
//       }
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents(currentPage);

//     // Retrieve user info from localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [currentPage]);

//   const handleLogout = () => {
//     localStorage.removeItem('jwt');
//     localStorage.removeItem('user');
//     setUser(null); // Reset user state
//     setDropdownOpen(false); // Close dropdown
//     router.push('/');
//   };

//   return (
//     <div className="container" style={containerStyles}>
//       <div style={userControlsStyles}>
//         {user ? (
//           <div style={{ position: 'relative' }}>
//             <button
//               onClick={() => setDropdownOpen((prev) => !prev)}
//               style={userButtonStyles}
//             >
//               {user.firstname}
//             </button>

//             {/* Dropdown menu */}
//             {dropdownOpen && (
//               <div style={dropdownStyles}>
//                 <button
//                   onClick={handleLogout}
//                   style={logoutButtonStyles}
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link href="/login">
//               <button style={buttonStyles}>Login</button>
//             </Link>
//             <Link href="/register">
//               <button style={{ ...buttonStyles, backgroundColor: '#28a745' }}>Register</button>
//             </Link>
//           </>
//         )}
//       </div>

//       <h1 style={headingStyles}>Events near you</h1>
//       <br />

//       <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={() => fetchEvents(1, searchQuery)} />
      
//       <EventList events={events} />
      
//       {!searchQuery && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           goToPreviousPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           goToNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//         />
//       )}
//     </div>
//   );
// }

// const containerStyles = {
//   padding: '20px',
//   backgroundColor: '#f0f0f0',
//   minHeight: '100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// };

// const userControlsStyles = {
//   position: 'absolute',
//   top: '20px',
//   right: '20px',
//   display: 'flex',
//   gap: '15px',
//   zIndex: 10,
// };

// const userButtonStyles = {
//   padding: '12px 25px',
//   fontSize: '18px',
//   color: '#fff',
//   backgroundColor: '#0070f3',
//   border: 'none',
//   borderRadius: '20px',
//   cursor: 'pointer',
//   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
//   transition: 'all 0.3s ease',
// };

// const dropdownStyles = {
//   position: 'absolute',
//   top: '100%',
//   right: 0,
//   backgroundColor: 'white',
//   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
//   borderRadius: '10px',
//   overflow: 'hidden',
//   zIndex: 1,
// };

// const logoutButtonStyles = {
//   padding: '12px 25px',
//   width: '100%',
//   textAlign: 'left',
//   backgroundColor: '#f9f9f9',
//   border: 'none',
//   cursor: 'pointer',
//   fontSize: '16px',
//   transition: 'background-color 0.2s ease',
// };

// const buttonStyles = {
//   padding: '12px 25px',
//   fontSize: '18px',
//   color: 'white',
//   backgroundColor: '#0070f3',
//   border: 'none',
//   borderRadius: '20px',
//   cursor: 'pointer',
//   boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//   transition: 'background-color 0.3s ease, transform 0.2s',
// };

// const headingStyles = {
//   color: '#333',
//   fontSize: '40px',
//   fontFamily: 'Roboto, sans-serif',
//   marginBottom: '20px',
//   textAlign: 'center',
//   // textTransform: 'uppercase',
// };


















// src\app\page.js

"use client";
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import Pagination from './components/Pagination';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const router = useRouter();

  const eventsPerPage = 6;

  const fetchEvents = async (page = 1, query = '') => {
    try {
      const apiUrl = query
        ? `http://localhost:1337/api/events?populate=*&filters[Event_Name][$contains]=${query}`
        : `http://localhost:1337/api/events?populate=*&pagination[page]=${page}&pagination[pageSize]=${eventsPerPage}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setEvents(data.data);
      setTotalPages(query ? 1 : data.meta.pagination.pageCount);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <div className="container" style={containerStyles}>
      <div style={userControlsStyles}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} style={userButtonStyles}>
              {user.firstname}
            </button>
            {dropdownOpen && (
              <div style={dropdownStyles}>
                <button onClick={handleLogout} style={logoutButtonStyles}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => setIsLoginOpen(true)} style={buttonStyles}>Login</button>
            <button onClick={() => setIsRegisterOpen(true)} style={{ ...buttonStyles, backgroundColor: '#28a745' }}>Register</button>
          </>
        )}
      </div>

      {/* Pass setUser as a prop to update user state immediately after login */}
      {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
      {isRegisterOpen && <RegisterForm onClose={() => setIsRegisterOpen(false)} />}

      <h1 style={headingStyles}>Events near you</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={() => fetchEvents(1, searchQuery)} />
      <EventList events={events} />
      {!searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          goToNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        />
      )}
    </div>
  );
}

// Styles...

const containerStyles = {
  padding: '20px',
  backgroundColor: '#f0f0f0',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const userControlsStyles = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  display: 'flex',
  gap: '15px',
  zIndex: 10,
};

const userButtonStyles = {
  padding: '12px 25px',
  fontSize: '18px',
  color: '#fff',
  backgroundColor: '#0070f3',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
};

const dropdownStyles = {
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: 'white',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  overflow: 'hidden',
  zIndex: 1,
};

const logoutButtonStyles = {
  padding: '12px 25px',
  width: '100%',
  textAlign: 'left',
  backgroundColor: '#f9f9f9',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.2s ease',
};

const buttonStyles = {
  padding: '12px 25px',
  fontSize: '18px',
  color: 'white',
  backgroundColor: '#0070f3',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, transform 0.2s',
};

const headingStyles = {
  color: '#333',
  fontSize: '40px',
  fontFamily: 'Roboto, sans-serif',
  marginBottom: '20px',
  textAlign: 'center',
};















