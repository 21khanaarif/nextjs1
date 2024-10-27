import React from 'react';

const EventCard = ({ event }) => {
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' }; // e.g., 22-Sept-2024
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for day-month-year format
  };

  // Function to format the time
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Converts to 12-hour format with AM/PM
    });
  };

  return (
    <div className="col-md-4" key={event.id}>
      <div className="card">
        {event.attributes.Display_Picture && (
          <img
            src={`http://localhost:1337${event.attributes.Display_Picture.data.attributes.url}`}
            className="card-img-top"
            alt={event.attributes.Event_Name}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{event.attributes.Event_Name}</h5>
          <p className="card-text">
            <strong>Event_Id:</strong> {event.attributes.Event_Id}
            <br />
            <strong>Date:</strong> {formatDate(event.attributes.Date_and_Time)}
            <br />
            <strong>Time:</strong> {formatTime(event.attributes.Date_and_Time)}
            <br />
            <strong>Location:</strong> {event.attributes.Venue}
            <br />
            {event.attributes.Description && (
              <>
                <strong>Description:</strong> {event.attributes.Description}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
