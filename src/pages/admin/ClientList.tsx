import { useState } from 'react';
import { Users, Search, Filter, Download, TrendingUp, TrendingDown, Eye, Mail, Phone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ClientsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('consumption');

  // Dados mockados
  const clients = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(85) 98765-4321',
      status: 'active',
      consumption: 450.5,
      lastMonth: 435.2,
      savings: 646.70,
      plan: 'Residencial Plus',
      joinDate: '2024-01-15',
      lastBill: 245.80
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(85) 98234-5678',
      status: 'active',
      consumption: 520.8,
      lastMonth: 498.3,
      savings: 782.40,
      plan: 'Comercial',
      joinDate: '2024-02-20',
      lastBill: 289.50
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      phone: '(85) 99876-5432',
      status: 'active',
      consumption: 385.2,
      lastMonth: 392.7,
      savings: 548.90,
      plan: 'Residencial',
      joinDate: '2023-11-10',
      lastBill: 215.30
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      phone: '(85) 98111-2233',
      status: 'active',
      consumption: 612.4,
      lastMonth: 587.9,
      savings: 892.80,
      plan: 'Comercial Plus',
      joinDate: '2024-03-05',
      lastBill: 342.10
    },
    {
      id: '5',
      name: 'Pedro Almeida',
      email: 'pedro.almeida@email.com',
      phone: '(85) 99234-5678',
      status: 'active',
      consumption: 298.6,
      lastMonth: 305.1,
      savings: 425.60,
      plan: 'Residencial',
      joinDate: '2024-01-28',
      lastBill: 167.20
    },
    {
      id: '6',
      name: 'Julia Ferreira',
      email: 'julia.ferreira@email.com',
      phone: '(85) 98555-7788',
      status: 'inactive',
      consumption: 0,
      lastMonth: 421.3,
      savings: 0,
      plan: 'Residencial Plus',
      joinDate: '2023-09-12',
      lastBill: 0
    },
    {
      id: '7',
      name: 'Roberto Lima',
      email: 'roberto.lima@email.com',
      phone: '(85) 99777-8899',
      status: 'active',
      consumption: 678.9,
      lastMonth: 645.2,
      savings: 989.50,
      plan: 'Industrial',
      joinDate: '2023-07-18',
      lastBill: 378.90
    },
    {
      id: '8',
      name: 'Fernanda Souza',
      email: 'fernanda.souza@email.com',
      phone: '(85) 98333-4455',
      status: 'active',
      consumption: 412.7,
      lastMonth: 428.9,
      savings: 588.20,
      plan: 'Residencial Plus',
      joinDate: '2024-04-22',
      lastBill: 230.50
    },
  ];

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    totalConsumption: clients.reduce((sum, c) => sum + c.consumption, 0),
    totalSavings: clients.reduce((sum, c) => sum + c.savings, 0),
  };

  const topConsumers = [...clients]
    .sort((a, b) => b.consumption - a.consumption)
    .slice(0, 5)
    .map(c => ({
      name: c.name.split(' ')[0],
      consumption: c.consumption
    }));

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    if (sortBy === 'consumption') return b.consumption - a.consumption;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'savings') return b.savings - a.savings;
    return 0;
  });

  const exportCSV = () => {
    alert('Exportando lista de clientes em CSV...');
  };

  const viewClientDetails = (clientId: string) => {
    alert(`Visualizando detalhes do cliente ${clientId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Lista de Clientes
          </h1>
          <p className="text-gray-600">
            Gerencie e monitore o consumo de todos os clientes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total de Clientes</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalClients}</p>
            <p className="text-sm text-green-600 mt-2">↑ {stats.activeClients} ativos</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Consumo Total</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalConsumption.toFixed(1)}</p>
            <p className="text-sm text-gray-500 mt-2">kWh este mês</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingDown className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Economia Total</h3>
            <p className="text-3xl font-bold text-gray-800">R$ {(stats.totalSavings / 1000).toFixed(1)}k</p>
            <p className="text-sm text-purple-600 mt-2">Este mês</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Users className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Taxa de Ativação</h3>
            <p className="text-3xl font-bold text-gray-800">
              {((stats.activeClients / stats.totalClients) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-green-600 mt-2">Excelente</p>
          </div>
        </div>

        {/* Top Consumers Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Top 5 Consumidores
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topConsumers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" label={{ value: 'kWh', position: 'insideBottom', offset: -5 }} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => `${value} kWh`} />
              <Bar dataKey="consumption" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="consumption">Maior Consumo</option>
              <option value="name">Nome A-Z</option>
              <option value="savings">Maior Economia</option>
            </select>

            {/* Export Button */}
            <button
              onClick={exportCSV}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download size={18} />
              Exportar
            </button>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumo (kWh)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tendência
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Economia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedClients.map((client) => {
                  const trend = client.consumption > client.lastMonth ? 'up' : 'down';
                  const trendPercent = Math.abs(((client.consumption - client.lastMonth) / client.lastMonth) * 100);

                  return (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-500">Cliente desde {new Date(client.joinDate).toLocaleDateString('pt-BR')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <Mail size={14} className="text-gray-400" />
                          {client.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone size={14} className="text-gray-400" />
                          {client.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                          {client.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{client.consumption.toFixed(1)} kWh</div>
                        <div className="text-xs text-gray-500">Mês anterior: {client.lastMonth.toFixed(1)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center gap-1 text-sm font-semibold ${
                          trend === 'up' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {trendPercent.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          R$ {client.savings.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          client.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {client.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => viewClientDetails(client.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          <Eye size={16} />
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {sortedClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum cliente encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}