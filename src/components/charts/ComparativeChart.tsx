import React from 'react';
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

interface ComparativeData {
  period: string;
  production: number;
  consumption: number;
  surplus: number;
  economy: number;
}

interface ComparativeChartProps {
  data: ComparativeData[];
  chartType?: 'bar' | 'composed';
  showEconomy?: boolean;
  height?: number;
  comparisonType?: 'monthly' | 'daily' | 'yearly';
}

const ComparativeChart: React.FC<ComparativeChartProps> = ({
  data,
  chartType = 'composed',
  showEconomy = true,
  height = 400,
  comparisonType = 'monthly',
}) => {
  const formatPeriod = (period: string) => {
    if (comparisonType === 'monthly') {
      const [year, month] = period.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
    }
    return period;
  };

  const formatKWh = (value: number) => {
    return `${value.toFixed(2)} kWh`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
          <p className="font-semibold text-gray-800 mb-3">
            {formatPeriod(label)}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <span
                className="text-sm font-medium mr-3"
                style={{ color: entry.color }}
              >
                {entry.name}:
              </span>
              <span className="text-sm font-bold" style={{ color: entry.color }}>
                {entry.dataKey === 'economy'
                  ? formatCurrency(entry.value)
                  : formatKWh(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalProduction = data.reduce((sum, d) => sum + d.production, 0);
  const totalConsumption = data.reduce((sum, d) => sum + d.consumption, 0);
  const totalSurplus = data.reduce((sum, d) => sum + d.surplus, 0);
  const totalEconomy = data.reduce((sum, d) => sum + d.economy, 0);
  const averageEfficiency = ((totalProduction / totalConsumption) * 100).toFixed(1);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Análise Comparativa: Produção vs Consumo
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Comparação entre energia gerada e consumida
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        {chartType === 'composed' ? (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="period"
              tickFormatter={formatPeriod}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value} kWh`}
            />
            {showEconomy && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `R$ ${value}`}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />

            <Bar
              yAxisId="left"
              dataKey="production"
              name="Produção"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="consumption"
              name="Consumo"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              yAxisId="left"
              dataKey="surplus"
              name="Excedente"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

            {showEconomy && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="economy"
                name="Economia (R$)"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 5 }}
                activeDot={{ r: 7 }}
              />
            )}
          </ComposedChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="period"
              tickFormatter={formatPeriod}
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value} kWh`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />

            <Bar
              dataKey="production"
              name="Produção"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="consumption"
              name="Consumo"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="surplus"
              name="Excedente"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <p className="text-xs text-green-700 font-medium">Produção Total</p>
          </div>
          <p className="text-xl font-bold text-green-800">
            {totalProduction.toFixed(2)} kWh
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <p className="text-xs text-red-700 font-medium">Consumo Total</p>
          </div>
          <p className="text-xl font-bold text-red-800">
            {totalConsumption.toFixed(2)} kWh
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <p className="text-xs text-blue-700 font-medium">Excedente</p>
          </div>
          <p className="text-xl font-bold text-blue-800">
            {totalSurplus.toFixed(2)} kWh
          </p>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
            <p className="text-xs text-amber-700 font-medium">Economia Total</p>
          </div>
          <p className="text-xl font-bold text-amber-800">
            {formatCurrency(totalEconomy)}
          </p>
        </div>
      </div>

      <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">
              Taxa de Autossuficiência Energética
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Quanto da sua energia é coberta pela produção solar
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-700">
              {averageEfficiency}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeChart;