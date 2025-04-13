import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    error: null,
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      coordinates: { lat: '', lng: '' },
      error: error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      };
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
  }, []);

  return (
    <div>
      <p>Please enable location services and grant permissions for accurate results.</p>
      {location.loaded && location.coordinates.lat && (
        <p>
          Current Location: <br />
          Latitude: {location.coordinates.lat} <br />
          Longitude: {location.coordinates.lng}
        </p>
      )}
      {location.loaded && location.error && (
        <p>Error: {location.error.message}</p>
      )}
    </div>
  );
};

export default LocationTracker;