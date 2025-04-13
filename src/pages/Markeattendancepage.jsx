import React from "react";
import MarkAttendanceCard from "../components/MarkAttendanceCard";
import { getAccurateLocation } from "../utils/geolocation";

const Markeattendancepage = () => {
  const handleAccurateLocation = () => {
    getAccurateLocation(
      (coords) => {
        console.log("Accurate coords:", coords);
        // maybe save to localStorage or state
      },
      (error) => {
        console.error("Failed to get accurate location", error);
      },
      {
        maxAttempts: 5,
        desiredAccuracy: 20,
      }
    );
  };

  return (
    <>
      <MarkAttendanceCard />
      <button onClick={handleAccurateLocation}>
        test
      </button>
    </>
  );
};

export default Markeattendancepage;
