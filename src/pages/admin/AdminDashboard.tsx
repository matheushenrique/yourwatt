import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Zap, TrendingUp, Activity } from 'lucide-react';
import api from '../../services/api';
import { ProductionData, ClientConsumption } from '../../types/user.types';

export default function AdminDashboard() {
  const [productionData, setProductionData] = useState<ProductionData[]>([]);
  const [clients, setClients] = useState<ClientConsumption[]>([]);
  const [stats, setStats] = useState({
    totalProduction: 0,
    dailyProduction: 0,
    monthlyProduction: 0,
    commercializationPercentage: 0,
    totalClients: 0,
    activeClients: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productionRes, clientsRes, statsRes] = await Promise.all([
        api.get('/production/history'),
        api.get('/admin/clients'),
        api.get('/admin/stats')
      ]);
      
      setProductionData(productionRes.data);
      setClients(clientsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const chartData = productionData.slice(-30).map(item => ({
    date: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    producao: item.productionKwh,
    comercializado: item.commercializedKwh
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Monitore a produção da usina e gerencie clientes
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Zap className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Produção Diária</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.dailyProduction.toFixed(2)} kWh
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Produção Mensal</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.monthlyProduction.toFixed(2)} kWh
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Activity className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Comercialização</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.commercializationPercentage.toFixed(1)}%
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Users className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Clientes Ativos</h3>
            <p className="text-2xl font-bold text-gray-800">
              {stats.activeClients} / {stats.totalClients}
            </p>
          </div>
        </div>

        {/* Gráfico de Produção */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Produção da Usina - Últimos 30 dias
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="producao" 
                stroke="#3b82f6" 
                name="Produção Total (kWh)"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="comercializado" 
                stroke="#10b981" 
                name="Comercializado (kWh)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lista de Clientes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Consumo por Cliente
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumo Total (kWh)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Atualização
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {client.userName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {client.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-600">
                        {client.totalConsumption.toFixed(2)} kWh
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(client.lastUpdate).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}