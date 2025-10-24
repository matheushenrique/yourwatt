import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, TrendingDown, Zap, DollarSign } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import { BillingInfo } from '../../types/user.types';
import { ConsumptionData } from '../../types/consumption.types';

export default function Dashboard() {
  const { user } = useAuth();
  const [consumptionData, setConsumptionData] = useState<ConsumptionData[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [consumptionRes, billingRes] = await Promise.all([
        api.get('/consumption/history'),
        api.get('/billing/current')
      ]);
      
      setConsumptionData(consumptionRes.data);
      setBillingInfo(billingRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    try {
      const response = await api.get('/reports/consumption/pdf', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio-consumo-${new Date().toISOString()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await api.get('/reports/consumption/excel', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio-consumo-${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erro ao exportar Excel:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const chartData = consumptionData.map(item => ({
    month: `${item.month}/${item.year}`,
    consumo: item.consumptionKwh,
    comSolar: item.costWithSolar,
    semSolar: item.costWithoutSolar
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Acompanhe seu consumo e economia com energia solar
          </p>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Zap className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Consumo Atual</h3>
            <p className="text-2xl font-bold text-gray-800">
              {billingInfo?.currentConsumption.toFixed(2)} kWh
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Conta Atual</h3>
            <p className="text-2xl font-bold text-gray-800">
              R$ {billingInfo?.currentCost.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingDown className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Economia</h3>
            <p className="text-2xl font-bold text-gray-800">
              {billingInfo?.savingsPercentage.toFixed(1)}%
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Sem Solar</h3>
            <p className="text-2xl font-bold text-gray-800">
              R$ {billingInfo?.previousCost.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Botões de Exportação */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={exportToPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={20} />
            Exportar PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={20} />
            Exportar Excel
          </button>
        </div>

        {/* Gráfico de Consumo */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Histórico de Consumo (kWh)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="consumo" 
                stroke="#3b82f6" 
                name="Consumo (kWh)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Comparativo Com/Sem Solar */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Comparativo de Custos (R$)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="comSolar" fill="#10b981" name="Com Solar" />
              <Bar dataKey="semSolar" fill="#ef4444" name="Sem Solar" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}