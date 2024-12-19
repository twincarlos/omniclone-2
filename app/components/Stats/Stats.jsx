import "./Stats.css";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function Stats({ data }) {
  return (
    <div>
      <div
        style={{
          width: "100%",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        <div className="pie-row">
          {data.map((obj, index) => (
            <div key={index} className="pie-wrap">
              <div style={{ width: 200, height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={obj.data}
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {obj.colors.map((color, index) => <Cell key={index} fill={color} />)}
                      <Label value={obj.name} position="center" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
