import React from 'react';

const Pagination = ({ currentPage, totalPages, goToPreviousPage, goToNextPage }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: 'white',
          backgroundColor: 'purple',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px',
          opacity: currentPage === 1 ? '0.5' : '1',
        }}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span style={{ fontSize: '18px', margin: '0 10px' }}>Page {currentPage}</span>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: 'white',
          backgroundColor: 'purple',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '10px',
          opacity: currentPage === totalPages ? '0.5' : '1',
        }}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
