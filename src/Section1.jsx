// BlueGradientSection.js
import React from "react";
import img from "./assets/hero-min.png";

const BlueGradientSection = () => {
  const sectionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "50px 5000px 50px 25px",
    background: "linear-gradient(to right, #3498db, #2980b9)", // Blue gradient
    color: "white",
    position: "fixed",
    top: "110px",
    left: "0",
    minWidth: "75vw",
    height: "80vh",
  };

  const textStyle = {
    flex: 1,
    marginRight: "50px", // Adjust as needed
  };

  const imageStyle = {
    flex: 1,
    maxWidth: "30%", // Make sure the image doesn't exceed the container
    borderRadius: "8px", // Optional: Add border radius for a rounded look
  };

  return (
    <div style={sectionStyle}>
      <div style={textStyle}>
        <h2
          style={{
            width: "55%",
            textAlign: "left",
            fontSize: "2.5rem",
            position : "relative",
            left: "250px",
          }}
        >
          myIDFi makes getting a new mortgage simple and easy
        </h2>
        <p style={{
            width: "55%",
            textAlign: "left",
            position : "relative",
            left: "250px"
        }}>
          myIDFi is a Blockchain and Artificial Intelligence based, open
          mortgage marketplace to introduce consumers to the lender of their
          choice. If you are looking for a mortgage you came to the right place.
          myIDFi enables consumers to compare the costs of live lender mortgage
          offers, safe and securely, without sharing personal private
          information with multiple parties. No annoying phone calls, just great
          rates and secure delivery and fulfillment of your personalized
          mortgage request.
        </p>
      </div>
      <img
        src={img} // Replace with the actual image path
        alt="Your Alt Text"
        style={imageStyle}
      />
    </div>
  );
};

export default BlueGradientSection;
