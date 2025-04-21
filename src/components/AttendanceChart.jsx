// src/components/AttendanceChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useEffect, useRef } from "react";
import { fetchUserAttendance } from "../components/Redux/userAttendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

export default function AttendanceChart() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const { isFetchinguser, userdata } = useSelector((state) => state.userdata);
  const { userAttendance, isLoading, error } = useSelector(
    (state) => state.userAttendance
  );

  useEffect(() => {
    if (userdata?.user?._id) {
      dispatch(fetchUserAttendance(userdata.user._id));
    }
  }, [dispatch, userdata]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container && userAttendance?.length > 0) {
      container.scrollLeft = container.scrollWidth;
    }
  }, [userAttendance]);

  const chartData =
    userAttendance?.map((att) => ({
      name: att.classSection,
      Present: att.attendees.length,
    })) || [];

  // Determine dynamic width
  const barWidth = 60;
  const totalBars = chartData.length;
  const minChartWidth = 600; // Minimum width to fill the screen
  const dynamicChartWidth = Math.max(minChartWidth, totalBars * barWidth);

  return (
    <div>
      <h4 className="text-success fw-bold mb-3">Attendance Chart</h4>

      {isLoading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <p className="text-danger">Failed to load attendance data.</p>
      ) : chartData.length === 0 ? (
        <p>No attendance records available.</p>
      ) : (
        <div
          ref={scrollRef}
          style={{
            width: "100%",
            overflowX: "auto",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ width: dynamicChartWidth, height: "450px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Present" fill="#068a06">
                  <LabelList dataKey="Present" position="top" fill="#000" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
