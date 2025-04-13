import React, { useState } from "react";

const LocationButton = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setErrorMsg(""); // clear error if any
      },
      (error) => {
        setErrorMsg("Error getting location: " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Get My Location</button>

      {location && (
        <p>
          📍 Your location:<br />
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      )}

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  );
};

export default LocationButton;
