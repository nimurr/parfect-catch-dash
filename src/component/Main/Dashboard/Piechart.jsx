import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const data = [
  { name: 'Recent-Used', value: 36 },
  { name: 'Income', value: 100 },
  { name: 'Total new User', value: 25 },
];
const COLORS = ['#2C909D', '#E6E6F2', ' #74BEC8'];


const Piechart = () => {

  return (
    <div className='w-full col-span-full md:col-span-2 bg-white rounded-lg  border  '>

      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-lg font-semibold">Recent-Used</div>
        <div className="text-xl font-bold">36k</div>

        <div className="text-lg font-semibold mt-4">Income</div>
        <div className="text-xl font-bold">100k</div>

        <div className="text-lg font-semibold mt-4">Total new User</div>
        <div className="text-xl font-bold">25%</div>

        <div className='flex   mt-4'>
          <div className=''>
            <ResponsiveContainer width="101%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-sm text-center mt-4">
              P&L <br />
              <span className="font-semibold">Total profit growth of 25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piechart;
