import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    date: 'Tháng 8',
    amount: 39,
    total: 2400,
    price: 2400,
  },
  {
    date: 'Tháng 9',
    amount: 31,
    total: 1398,
    price: 2210,
  },
  {
    date: 'Tháng 10',
    amount: 32,
    total: 9800,
    price: 2290,
  },
  {
    date: 'Tháng 11',
    amount: 37,
    total: 3908,
    price: 2000,
  },
  {
    date: 'Tháng 12',
    amount: 31,
    total: 4800,
    price: 2181,
  },
  {
    date: 'Tháng 1',
    amount: 33,
    total: 3800,
    price: 2500,
  },
  {
    date: 'Tháng 2',
    amount: 34,
    total: 4300,
    price: 2100,
  },
];

const CustomLabel = (props) => {
  const { x, y, stroke, value } = props;
  return <text x={x} y={y} dy={-4} fill={stroke} fontSize={13} textAnchor="middle">{value}</text>;
}


export default function RenderLineChart() {
  return (
    <div className='w-[58%] p-5 m-5 bg-slate-100 shadow-lg shadow-indigo-500/40'>
      <ResponsiveContainer className='' width="100%" height="100%">
        <AreaChart data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip dataKey="total" />
          <Area yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" activeDot={{ r: 8 }} label={CustomLabel} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
