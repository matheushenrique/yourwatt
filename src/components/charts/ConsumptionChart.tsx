import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ConsumptionChartProps {
  data: Array<{
    month: string;
    consumption: number;
  }>;
  height?: number;
}

export default function ConsumptionChart({ data, height = 300 }: ConsumptionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="month" 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
          label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px'
          }}
          formatter={(value: number) => [`${value.toFixed(2)} kWh`, 'Consumo']}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
        />
        <Line
          type="monotone"
          dataKey="consumption"
          stroke="#3b82f6"
          strokeWidth={2}
          name="Consumo (kWh)"
          dot={{ fill: '#3b82f6', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}