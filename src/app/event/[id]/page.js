// src/app/event/[id]/page.js
"use client";
import React, { useEffect, useState } from 'react';

const EventDetails = ({ params }) => {
  const { id } = params; // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/events/${id}?populate=*`); // Fetch with populated data
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data.data); // Set the event data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event || !event.attributes) return <div>Event not found.</div>;

  const imageUrl = event.attributes.Display_Picture?.data?.attributes?.formats?.large?.url
    ? `http://localhost:1337${event.attributes.Display_Picture.data.attributes.formats.large.url}`
    : `http://localhost:1337${event.attributes.Display_Picture.data.attributes.url}`;

  return (
    <div style={styles.container}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={event.attributes.Event_Name}
          style={styles.image}
        />
      )}
      <div style={styles.detailsContainer}>
        <h1 style={styles.title}>{event.attributes.Event_Name}</h1>
        <p style={styles.description}>{event.attributes.Description}</p>
        <p style={styles.info}><strong>Date:</strong> {new Date(event.attributes.Date_and_Time).toLocaleDateString('en-GB')}</p>
        <p style={styles.info}><strong>Time:</strong> {new Date(event.attributes.Date_and_Time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        <p style={styles.info}><strong>Location:</strong> {event.attributes.Venue}</p>
        <button style={styles.button}>Show Interest</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    padding: '20px',
  },
  image: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  detailsContainer: {
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  info: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#555',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default EventDetails;
