import React from 'react';

const EventToolbar = ({ onAddClick }) => {
  return (
    <div className="events-toolbar">
      <div className="status-filters">
        <button className="status active">Active (48)</button>
        <button className="status">Draft (22)</button>
        <button className="status">Past (32)</button>
      </div>

<div className="search-controls">
  <div className="dropdown-wrapper">
    <select className="dropdown">
      <option>All Category</option>
      <option>Music</option>
      <option>Fashion</option>
    </select>
  </div>

  <div className="dropdown-wrapper">
    <select className="dropdown">
      <option>This Month</option>
      <option>Next Month</option>
    </select>
  </div>

<button className="add-event-button" onClick={onAddClick}>
  <i className="fa-solid fa-plus"></i> Add Event
</button>
</div>

    </div>
  );
};

export default EventToolbar;
