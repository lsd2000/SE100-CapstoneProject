import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from "react";

const Stockchart = React.memo((props) => {

  if (!props) return null;
  const isDataAvailable = props.data && props.data.length > 0 && props.data[0].close !== undefined;

  return (
    <>
      {isDataAvailable ? (
      <ResponsiveContainer width="100%" height="100%">
      <LineChart data={(props.data).slice(0,24)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
      ) : (
        <p>Loading data or data unavailable...</p>
      )}
    </>
  );
});

export default Stockchart;
