import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Router ,HashRouter} from "react-router-dom";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Pagenotfound from "./pages/Pagenotfound";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import CreateAttendancepage from "./pages/CreateAttendancepage";
import CollectedAttendancepage from "./pages/CollectedAttendancepage";
import Attendancehistorypage from "./pages/Attendancehistorypage";
import ProfilePage from "./pages/ProfilePage";
import Markeattendancepage from "./pages/Markeattendancepage";
import Dashboardhome from "./pages/Dashboardhome";
import LocationTracker from "./pages/Testing";
import { Store } from "./components/Redux/Store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" app-holder">
        <Provider store={Store}>
        {/* <BrowserRouter> */}
        <HashRouter>
          <Routes>
            <Route path="*" element={<Pagenotfound />} />
            {/* <Route path="" element={<Landingpage />} /> */}
            <Route path="" element={<Signuppage />} />
            <Route path="login" element={<Loginpage />} />

            <Route path="dashboard" element={<Dashboard />}>
              <Route path="" element={<Dashboardhome />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="create-attendance" element={<CreateAttendancepage />} />
              <Route path="mark-attendance" element={<Markeattendancepage />} />
              <Route path="attendance-taken" element={<CollectedAttendancepage />} />
              <Route path="attendance-history" element={<Attendancehistorypage />} />
              <Route path="LocationTracker" element={< LocationTracker />} />
              <Route path="*" element={<Pagenotfound />} />
            </Route>
          </Routes>
        </HashRouter>
        {/* </BrowserRouter> */}
        </Provider>
      </div>
    </>
  );
}

export default App;
