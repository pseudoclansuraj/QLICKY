import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScanData } from '../../types';

interface ScanChartProps {
  data: ScanData[];
}

const ScanChart = ({ data }: ScanChartProps) => {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('7d');
  
  // Filter data based on selected time range
  const filteredData = (() => {
    const today = new Date();
    const days = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - days);
    
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  })();

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1 text-sm font-medium rounded-l-md ${
              timeRange === '7d'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            7D
          </button>
          <button
            onClick={() => setTimeRange('14d')}
            className={`px-3 py-1 text-sm font-medium ${
              timeRange === '14d'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-y border-gray-300`}
          >
            14D
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1 text-sm font-medium rounded-r-md ${
              timeRange === '30d'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            30D
          </button>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3A86FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3A86FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickMargin={10}
              width={30}
            />
            <Tooltip
              formatter={(value) => [`${value} scans`, 'Scans']}
              labelFormatter={formatDate}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                border: 'none',
                padding: '0.5rem',
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3A86FF"
              fillOpacity={1}
              fill="url(#colorScans)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScanChart;