import React, { useState } from "react";

const LocationMapPreview = () => {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError("Failed to fetch location: " + err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <button
        onClick={fetchLocation}
        disabled={loading}
        className=" btn btn-success text-capitalize fw-semibold "
      >
        {loading ? "Fetching..." : "view live location"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {coords && (
        <div style={{ marginTop: "1rem", height: "100%" }}>
          <iframe
            title="Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
            allowFullScreen
          ></iframe>
          <p>
            <strong>Latitude:</strong> {coords.lat} <br />
            <strong>Longitude:</strong> {coords.lng}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationMapPreview;
