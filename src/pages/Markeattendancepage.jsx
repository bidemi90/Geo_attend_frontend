import React from "react";
import MarkAttendanceCard from "../components/MarkAttendanceCard";
import { getAccurateLocation } from "../utils/geolocation";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Markeattendancepage = () => {
 
  const [searchParams] = useSearchParams();
const codeFromURL = searchParams.get("code");




  return (
    <>
<MarkAttendanceCard  codeFromURL={codeFromURL} />
   
    </>
  );
};

export default Markeattendancepage;
