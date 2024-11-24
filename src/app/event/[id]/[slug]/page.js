"use client"; // Ensure this page is client-side rendered

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EventDetails = ({ params }) => {
  const { id, slug } = params; // Get both the event ID and slug from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/events/${id}?populate=*`
        ); // Fetch the event by ID
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data.data); // Set the event data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  // If no event data or incorrect slug, return a not found message
  if (!event || !event.attributes) {
    return <div>Event not found.</div>;
  }

  const { Event_Name, Date_and_Time, Venue, Display_Picture, Description } =
    event.attributes;

  // Check if the slug matches the event name
  if (
    slug !==
    Event_Name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
  ) {
    // If the slug doesn't match, redirect to a 404 page
    router.push("/404");
    return null;
  }

  const imageUrl = Display_Picture?.data?.attributes?.formats?.large?.url
    ? `http://localhost:1337${Display_Picture.data.attributes.formats.large.url}`
    : `http://localhost:1337${Display_Picture.data.attributes.url}`;

  const styles = {
    container: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff", // Text color for better contrast over the background
      padding: "20px",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -1, // Ensures it's behind other elements
      filter: "brightness(50%)", // Darkens the background image for better text readability
    },
    image: {
      width: "100%",
      maxWidth: "600px",
      height: "auto",
      objectFit: "cover",
      borderRadius: "10px",
      zIndex: 2, // Ensures the event image is above the background
    },
    detailsContainer: {
      width: "100%",
      maxWidth: "600px",
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for readability
      borderRadius: "10px",
      padding: "20px",
      zIndex: 2,
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#fff",
    },
    description: {
      fontSize: "18px",
      marginBottom: "10px",
      color: "#ddd",
    },
    info: {
      fontSize: "16px",
      marginBottom: "8px",
      color: "#ccc",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      {imageUrl && (
        <div
          style={{
            ...styles.backgroundImage,
            backgroundImage: `url(${imageUrl})`,
          }}
        />
      )}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={Event_Name}
          style={styles.image}
        />
      )}
      <div style={styles.detailsContainer}>
        <h1 style={styles.title}>{Event_Name}</h1>
        <p style={styles.description}>{Description}</p>
        <p style={styles.info}>
          <strong>Date:</strong>{" "}
          {new Date(Date_and_Time).toLocaleDateString("en-GB")}
        </p>
        <p style={styles.info}>
          <strong>Time:</strong>{" "}
          {new Date(Date_and_Time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
        <p style={styles.info}>
          <strong>Location:</strong> {Venue}
        </p>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Show Interest
        </button>
      </div>
    </div>
  );
};

export default EventDetails;






















