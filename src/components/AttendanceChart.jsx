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

const data = [
  { name: "csc 305", Present: 55 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 55 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 55 },
  { name: "csc 305", Present: 34 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 55 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 55 },
  { name: "csc 305", Present: 34 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 55 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 55 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 305", Present: 34 },
  { name: "csc 305", Present: 23 },
  { name: "csc 309", Present: 105 },
  { name: "csc 434", Present: 200 },
];

export default function AttendanceChart() {
  const scrollRef = useRef(null);

  // Scroll to the end on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollLeft = container.scrollWidth;
    }
  }, []);

  return (
    <div>
      <h4 className="text-success fw-bold mb-3">Attendance chart</h4>
      <div
        ref={scrollRef}
        style={{
          width: "100%",
          overflowX: "auto",
          paddingBottom: "1rem", // add space below chart
        }}
      >
        <div style={{ width: data.length * 60, height: "450px" }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="Present" fill="#068a06">
                <LabelList dataKey="name" position="insideTop" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
