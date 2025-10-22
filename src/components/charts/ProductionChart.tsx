import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ProductionData {
  date: string;
  production: number;
  capacity: number;
  efficiency: number;
}

interface ProductionChartProps {
  data: ProductionData[];
  chartType?: 'line' | 'area';
  showCapacity?: boolean;
  showEfficiency?: boolean;
  height?: number;
}

const ProductionChart: React.FC<ProductionChartProps> = ({
  data,
  chartType = 'area',
  showCapacity = true,
  showEfficiency = false,
  height = 400,
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const formatKWh = (value: number) => {
    return `${value.toFixed(2)} kWh`;
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">
            {formatDate(label)}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              className="text-sm"
              style={{ color: entry.color }}
            >
              <span className="font-medium">{entry.name}:</span>{' '}
              {entry.dataKey === 'efficiency'
                ? formatPercent(entry.value)
                : formatKWh(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const Chart = chartType === 'area' ? AreaChart : LineChart;
  const DataComponent = chartType === 'area' ? Area : Line;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Produção de Energia Solar
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Geração de energia em kWh ao longo do tempo
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${value} kWh`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '14px' }}
            iconType="line"
          />

          <DataComponent
            type="monotone"
            dataKey="production"
            name="Produção Real"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={chartType === 'area' ? 0.6 : 1}
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />

          {showCapacity && (
            <DataComponent
              type="monotone"
              dataKey="capacity"
              name="Capacidade Instalada"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={chartType === 'area' ? 0.3 : 1}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          )}

          {showEfficiency && (
            <DataComponent
              type="monotone"
              dataKey="efficiency"
              name="Eficiência (%)"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={chartType === 'area' ? 0.3 : 1}
              strokeWidth={2}
              dot={{ fill: '#f59e0b', r: 4 }}
            />
          )}
        </Chart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-xs text-green-600 font-medium">Produção Total</p>
          <p className="text-lg font-bold text-green-700">
            {data.reduce((sum, d) => sum + d.production, 0).toFixed(2)} kWh
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-blue-600 font-medium">Média Diária</p>
          <p className="text-lg font-bold text-blue-700">
            {(data.reduce((sum, d) => sum + d.production, 0) / data.length).toFixed(2)} kWh
          </p>
        </div>
        <div className="bg-amber-50 rounded-lg p-3">
          <p className="text-xs text-amber-600 font-medium">Eficiência Média</p>
          <p className="text-lg font-bold text-amber-700">
            {(data.reduce((sum, d) => sum + d.efficiency, 0) / data.length).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductionChart;