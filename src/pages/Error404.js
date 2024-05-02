import React from "react";
import "./Error404.css"; // Import the CSS file

const Error404 = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default Error404;
