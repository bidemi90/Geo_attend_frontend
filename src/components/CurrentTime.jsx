// src/components/CurrentTime.jsx
import { useEffect, useState } from "react";

function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId); // cleanup
  }, []);

  return (
    <div className=" fw-semibold m-0 currenttimetext">
      {time.toLocaleTimeString()}
    </div>
  );
}

export default CurrentTime;
