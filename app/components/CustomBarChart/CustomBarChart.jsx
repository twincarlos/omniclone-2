import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function CustomBarChart() {
  const data = [
    { name: "Team A", Won: 10, Lost: 5 },
    { name: "Team B", Won: 7, Lost: 8 },
    { name: "Team C", Won: 14, Lost: 3 },
    { name: "Team D", Won: 4, Lost: 12 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Games Won vs Lost</h2>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Won" fill="#82ca9d" />
        <Bar dataKey="Lost" fill="#8884d8" />
      </BarChart>
    </div>
  );
};