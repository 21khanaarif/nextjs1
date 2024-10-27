import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events }) => {
  return (
    <div id="event-list" className="row">
      {events.length === 0 ? (
        <p className="text-center">No events found</p>
      ) : (
        events.map((event) => <EventCard key={event.id} event={event} />)
      )}
    </div>
  );
};

export default EventList;
