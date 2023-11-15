import React from 'react';

const Documentdetail = ({ document }) => {
  return (
    <div>
      <h2>Document Details</h2>
      <p>Title: {document.title}</p>
      <p>Description: {document.description}</p>
    </div>
  );
};

export default Documentdetail;
