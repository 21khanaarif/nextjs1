"use client";
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import Pagination from './components/Pagination';
import Link from 'next/link';  // Import Next.js link for navigation

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const eventsPerPage = 6;

  const fetchEvents = async (page = 1, query = '') => {
    try {
      const apiUrl = query
        ? `http://localhost:1337/api/events?populate=*&filters[Event_Name][$contains]=${query}`
        : `http://localhost:1337/api/events?populate=*&pagination[page]=${page}&pagination[pageSize]=${eventsPerPage}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setEvents(data.data);
      if (!query) {
        setTotalPages(data.meta.pagination.pageCount);
      } else {
        setTotalPages(1); // Disable pagination for search results
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  return (
    <div className="container">
      <h1 style={{
        color: 'rgb(51, 51, 51)',
        fontSize: '40px',
        fontFamily: 'Roboto'
      }}>Events near you</h1>
      <br />
      
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={() => fetchEvents(1, searchQuery)}
      />
      
      {/* Event List */}
      <EventList events={events} />
      
      {/* Pagination */}
      {!searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          goToNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        />
      )}

      {/* Login and Register buttons with styles */}
      <div style={{ marginTop: '20px' }}>
        <Link href="/login">
          <button
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              fontSize: '16px',
              color: 'white',
              backgroundColor: '#0070f3',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </Link>
        <Link href="/register">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              color: 'white',
              backgroundColor: '#28a745',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
