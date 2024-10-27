import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-8">
        <input
          type="text"
          className="form-control"
          placeholder="Search Event by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <button className="btn btn-primary w-100" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

