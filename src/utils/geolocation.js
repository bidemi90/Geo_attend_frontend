import { toast, ToastContainer } from "react-toastify";
// import { getLocationOnce } from "./geolocation"; // your existing function

export const getLocationOnce = (onSuccess, onError) => {
  if (!navigator.geolocation) {
    const msg = "Geolocation is not supported by your browser.";
    console.error(msg);
    if (onError) onError(new Error(msg));
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      onSuccess(position.coords);
    },
    (error) => {
      console.error("Error getting location:", error);
      if (onError) onError(error);
    },
    {
      maximumAge: 0,
      enableHighAccuracy: true,
      timeout: 30000,
    }
  );
};
export const getLocationOnceWithName = async (onSuccess, onError) => {
  if (!navigator.geolocation) {
    const msg = "Geolocation is not supported by your browser.";
    console.error(msg);
    if (onError) onError(new Error(msg));
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=696b7a733dd14041a11038af40e3aa83`
        );
        const data = await response.json();

        const locationName =
          data.results[0]?.formatted || "Unknown location";

        onSuccess({
          lat: latitude,
          lng: longitude,
          name: locationName,
        });
      } catch (geoError) {
        console.error("Error fetching location name:", geoError);
        onSuccess({
          lat: latitude,
          lng: longitude,
          name: "Location name unavailable",
        });
      }
    },
    (error) => {
      console.error("Error getting location:", error);
      if (onError) onError(error);
    },
    {
      maximumAge: 0,
      enableHighAccuracy: true,
      timeout: 30000,
    }
  );
};

// Calculates distance in meters
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371000; // Radius of Earth in meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// targetLat, targetLng = lecture location
// allowedDistance = how far (in meters) user can be from target point
export const verifyUserLocation = (
  targetLat,
  targetLng,
  allowedDistance,
  onResult,
  setUserLocation // Pass the function to update the location in the parent component
) => {
  getLocationOnce(
    (coords) => {
      const userLat = coords.latitude;
      const userLng = coords.longitude;

      console.log("Target:", targetLat, targetLng);
      console.log("User:", coords.latitude, coords.longitude);

      // Update the user location state here
      setUserLocation({ latitude: userLat, longitude: userLng });

      const distance = calculateDistance(
        userLat,
        userLng,
        targetLat,
        targetLng
      );

      if (distance <= allowedDistance) {
        toast.success(`You're within ${Math.round(distance)} meters. ✅`);
        onResult(true); // Callback: access granted
      } else {
        toast.error(`You're too far! (${Math.round(distance)} meters away) ❌`);
        toast.error(`You are not allowed to mark attendance ❌`);
        onResult(false); // Callback: access denied
      }
    },
    (error) => {
      toast.error("Failed to fetch location: " + error.message);
      onResult(false);
    }
  );
};

let watchId = null;

export const startWatchingLocation = (targetLat, targetLng) => {
  if (!navigator.geolocation) {
    toast.error("Geolocation not supported.");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      const distance = calculateDistance(
        latitude,
        longitude,
        targetLat,
        targetLng
      );

      console.log("Current location:", latitude, longitude);
      console.log("Distance from target:", Math.round(distance), "meters");

      toast.info(`You're ${Math.round(distance)} meters away`);
    },
    (error) => {
      toast.error("Watch error: " + error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    }
  );
};

export const stopWatchingLocation = () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    toast.info("Stopped watching location");
  }
};

export const getAccurateLocation = (onSuccess, onError) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0,
  };

  let positions = [];

  const tryGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        positions.push(position.coords);
        if (positions.length === 2) {
          // Average the two readings
          const avgLat = (positions[0].latitude + positions[1].latitude) / 2;
          const avgLng = (positions[0].longitude + positions[1].longitude) / 2;
          onSuccess({ latitude: avgLat, longitude: avgLng });
        } else {
          setTimeout(tryGetLocation, 3000); // wait 3 sec for 2nd reading
        }
      },
      (error) => {
        console.error("Location error", error);
        if (onError) onError(error);
      },
      options
    );
  };

  tryGetLocation();
};
