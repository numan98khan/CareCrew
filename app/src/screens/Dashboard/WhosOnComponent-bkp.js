import React, { useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  Text,
} from "recharts";
import themeStyles from "../../styles/theme.styles";
import { displayTime } from "../../services/micro";
// import themeStyles from "../../styles/theme.styles";

// Dummy data
const dataPieChart = [
  { name: "Morning", value: 400 },
  { name: "Evening", value: 300 },
  { name: "Night", value: 300 },
];
const dataBarChart = [
  { name: "Monday", shifts: 8 },
  { name: "Tuesday", shifts: 9 },
  { name: "Wednesday", shifts: 7 },
  { name: "Thursday", shifts: 6 },
  { name: "Friday", shifts: 8 },
  { name: "Saturday", shifts: 10 },
  { name: "Sunday", shifts: 5 },
];
const dataLineChart = [
  { name: "Week 1", hours: 40 },
  { name: "Week 2", hours: 42 },
  { name: "Week 3", hours: 38 },
  { name: "Week 4", hours: 47 },
];
// Adding dummy data for the new Area Chart
const dataAreaChart = [
  { name: "Jan", totalHours: 2400 },
  { name: "Feb", totalHours: 2210 },
  { name: "Mar", totalHours: 2290 },
  { name: "Apr", totalHours: 2000 },
  { name: "May", totalHours: 2181 },
  { name: "Jun", totalHours: 2500 },
  { name: "Jul", totalHours: 2100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Updated dummy data for new KPIs
const dataRadarChart = [
  { subject: "Flexibility", A: 120, fullMark: 150 },
  { subject: "Staffing", A: 98, fullMark: 150 },
  { subject: "Workload", A: 86, fullMark: 150 },
  { subject: "Satisfaction", A: 99, fullMark: 150 },
  { subject: "Efficiency", A: 85, fullMark: 150 },
];

// Adjusting the size of all charts to make them smaller
const chartSize = {
  width: 300,
  height: 250,
};

// Card styling
const cardStyle = {
  // background: "#fff",
  // borderRadius: "8px",
  // boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  // margin: "10px",
  // padding: "20px",
  // padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const Heading = (props) => {
  return (
    <h2 className="text-PRIMARY_COLOR font-bold text-left">{props.text}</h2>
  );
};

// The shifts data remains the same
// const shifts = [
//   { id: 1, person: "Alice", startTime: "09:00", endTime: "14:00" },
//   { id: 1, person: "Alice", startTime: "09:00", endTime: "20:00" },
//   { id: 2, person: "Bob", startTime: "10:00", endTime: "18:00" },
//   { id: 3, person: "Charlie", startTime: "12:00", endTime: "20:00" },
// ];

// Utility function to convert time (HH:MM) to a decimal hour (HH.MM)
const timeToDecimal = (time) => {
  const date = new Date(time);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours + minutes / 60;
};

const WhosOnComponent = ({ shifts }) => {
  console.log("🚀 ~ WhosOnComponent ~ shifts:", shifts);
  const [timelineWidth, setTimelineWidth] = useState(0);
  const timelineRef = useRef(null); // Ref for the timeline container

  // Update timeline width on mount and when window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth);
      }
    };

    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth); // Adjust on resize

    return () => window.removeEventListener("resize", updateWidth); // Clean up
  }, []);

  // 24 hours in the schedule
  const hours = Array.from(new Array(24), (_, index) => `${index}:00`);

  return (
    <div className="flex flex-row bg-white">
      <div className="flex flex-col w-[20%]"></div>
      <div className="flex flex-col w-[80%]">
        <div ref={timelineRef} className="flex overflow-x-auto">
          {hours?.map((hour, index) => (
            <div
              key={index}
              className="flex-1 text-center"
              style={{ fontSize: 10 }}
            >
              {hour}
            </div>
          ))}
        </div>
        <div>
          {shifts?.map((shift, index) => {
            const startTimeDecimal = timeToDecimal(shift?.shift?.shiftStartDT);

            const endTimeDecimal = timeToDecimal(shift?.shift?.shiftEndDT);
            const duration = endTimeDecimal - startTimeDecimal;

            const shiftWidth = (duration / 24) * timelineWidth;
            const shiftStart = (startTimeDecimal + 0.5) * (timelineWidth / 24);

            return (
              <div
                key={shift.id}
                className="text-white rounded-full text-[9px] m-1 py-2"
                style={{
                  left: `${shiftStart}px`,
                  width: `${shiftWidth}px`,
                  marginLeft: `${shiftStart}px`, // Adjusted to avoid overlap, increase spacing as needed

                  textAlign: "center",
                  backgroundColor: themeStyles?.GRAY,
                }}
              >
                {displayTime(shift?.shift?.shiftStartDT)} -{" "}
                {displayTime(shift?.shift?.shiftEndDT)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhosOnComponent;
