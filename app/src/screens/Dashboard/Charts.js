import React from "react";
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

const Charts = () => {
  return (
    <div
      className="space-y-2"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        // padding: "20px",
        // padding: "20px",
      }}
    >
      <div className="flex flex-row space-x-2 w-full mx-2">
        {/* Line Chart Card */}
        <div className="border shadow bg-white rounded-[6px] p-3 w-2/3 space-y-4">
          {/* <h2>Hours Worked Over the Month</h2> */}
          <Heading text={"Hours Worked Over the Month"} />
          <LineChart
            width={chartSize.width * 2.2}
            height={chartSize.height}
            data={dataLineChart}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* Line chart setup remains the same */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="hours"
              stroke={themeStyles?.PRIMARY_COLOR}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        {/* Radar Chart Card */}
        <div
          className="border shadow bg-white rounded-[6px] p-3 w-1/3  space-y-4"
          style={cardStyle}
        >
          {/* <h2>Operational Metrics</h2> */}
          <Heading text={"Operational Metrics"} />
          <RadarChart
            // cx={150}
            // cy={125}
            // outerRadius={60}
            width={chartSize.width}
            height={chartSize.height}
            data={dataRadarChart}
          >
            {/* Radar chart setup remains the same */}
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Mike"
              dataKey="A"
              stroke={themeStyles?.SECONDARY_COLOR}
              fill={themeStyles?.SECONDARY_COLOR}
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </div>
      </div>

      <div className="flex flex-row space-x-2 w-full mx-2">
        {/* Radar Chart Card */}
        <div
          className="border shadow bg-white rounded-[6px] p-3 w-1/3  space-y-4"
          style={cardStyle}
        >
          {/* <h2>Daily Shift Overview</h2> */}
          <Heading text={"Daily Shift Overview"} />
          <PieChart width={chartSize.width} height={chartSize.height}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataPieChart}
              cx={150}
              cy={125}
              outerRadius={60}
              fill="#8884d8"
              label
            >
              {dataPieChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        {/* Radar Chart Card */}
        <div
          className="border shadow bg-white rounded-[6px] p-3 w-1/3 space-y-4 "
          style={cardStyle}
        >
          {/* <h2>Weekly Shift Distribution</h2> */}
          <Heading text={"Weekly Shift Distribution"} />
          <BarChart
            width={chartSize.width}
            height={chartSize.height}
            // width={"100"}
            // height={"100"}
            data={dataBarChart}
            // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            className="items-center pr-10"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="shifts" fill={themeStyles?.SECONDARY_COLOR} />
          </BarChart>
        </div>

        <div
          className="border shadow bg-white rounded-[6px] p-3 w-1/3 space-y-4 "
          style={cardStyle}
        >
          {/* <h2>Total Hours Worked by Month</h2> */}
          <Heading text={"Total Hours Worked by Month"} />
          <AreaChart
            width={chartSize.width}
            height={chartSize.height}
            data={dataAreaChart}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotalHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalHours"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorTotalHours)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

// export const ShiftFullfilmentVisualization = ({ data }) => {
//   return (
//     <div className="bg-white rounded-lg py-2">
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="SHIFTDATE"
//             tickFormatter={(tickItem) =>
//               new Date(tickItem).toLocaleDateString()
//             }
//           />
//           <YAxis />
//           <Tooltip
//             labelFormatter={(label) => new Date(label).toLocaleDateString()}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="TOTALPOSITIONS"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />

//           <Line
//             type="monotone"
//             dataKey="TOTALFULFILLMENTS"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

export const ShiftFullfilmentVisualization = ({ data }) => {
  console.log("🚀 ~ ShiftFullfilmentVisualization ~ data:", data);

  const data_filtered = data?.slice(24, 36);

  // const data_filtered = data;

  return (
    <div className="bg-white rounded-lg py-2">
      <div className="w-full p-2 flex items-center">
        <label className="text-xs font-bold text-left">
          Overall Shift Fulfillment
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data_filtered}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="SHIFTDATE"
            tickFormatter={(tickItem) =>
              new Date(tickItem).toLocaleDateString()
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Legend />

          <Area
            // type="monotone"
            dataKey="TOTALPOSITIONS"
            stroke="#FF0000"
            fill="#FF0000"
            // fillOpacity={0.3}

            fillOpacity={0.1}
          />
          <Line type="monotone" dataKey="TOTALPOSITIONS" stroke="#FF0000" />

          <Area
            // type="monotone"
            dataKey="TOTALFULFILLMENTS"
            stroke="#008000"
            fill="#00FF00"
            fillOpacity={0.3}
          />
          <Line type="monotone" dataKey="TOTALFULFILLMENTS" stroke="#008000" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GaugeChart = ({ coverageEfficiency }) => {
  // Calculate the rest of the gauge that is not covered
  const emptyPart = 100 - coverageEfficiency;

  // Data array for the pie chart
  const data = [
    { name: "Coverage", value: coverageEfficiency },
    { name: "Empty", value: emptyPart },
  ];

  // Colors for the covered and empty parts of the gauge
  const COLORS = ["#0088FE", "#00C49F"]; // Blue for coverage, green for empty

  // Customized sector (to create a hollow center)
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg py-2">
      <ResponsiveContainer
        // width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius="80%"
            outerRadius="100%"
            dataKey="value"
            stroke="none"
            activeIndex={0}
            activeShape={renderActiveShape} // Use the customized sector for the first (active) segment
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PercentageCard = ({ title, percent }) => {
  const data = [
    { name: "Completed", value: percent },
    { name: "Remaining", value: 100 - percent },
  ];

  const COLORS = [themeStyles?.SECONDARY_COLOR, "#eee"]; // Completed color and remaining color

  // Custom label component to render the percentage in the center
  const renderCustomLabel = ({ cx, cy }) => {
    const percentString = `${percent}`;
    const digitCount = percentString.length;
    let dxForPercent = 0; // Adjust based on digit count
    let dxForNumber = 0; // Adjust based on digit count

    // Adjust the position dynamically based on the number of digits
    if (digitCount === 1) {
      dxForPercent = +5; // Closer for single-digit percentages
      dxForNumber = -5; // Closer for single-digit percentages
    } else if (digitCount === 2) {
      dxForPercent = +10; // A bit further for two digits
      dxForNumber = -6; // Closer for single-digit percentages
    } else {
      dxForPercent = +14; // Even further for three digits
      dxForNumber = -6; // Closer for single-digit percentages
    }

    return (
      <>
        <text
          x={cx + dxForNumber}
          y={cy} // Slightly move up the percentage value to make room for '%'
          textAnchor="middle"
          dominantBaseline="central"
          className="progress-label"
          fontSize={18}
        >
          {percentString}
        </text>
        <text
          x={cx + dxForPercent}
          y={cy + 2} // Move '%' slightly below the number
          textAnchor="middle"
          dominantBaseline="central"
          className="progress-label"
          fontSize={10}
        >
          %
        </text>
      </>
    );
  };

  return (
    <div className="percentage-card flex flex-row justify-between pl-4 shadow-lg rounded-2xl w-full py-0 bg-white">
      <div className="text-left flex flex-col justify-center ">
        <label className="text font-bold self-start">{title}</label>
      </div>

      <ResponsiveContainer width="30%" height={"100%"}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius="70%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
            label={renderCustomLabel} // Use custom label for rendering text
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// export default Charts;
