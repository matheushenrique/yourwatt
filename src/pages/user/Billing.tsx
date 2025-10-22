import { useState } from 'react';
import { DollarSign, TrendingDown, Calendar, Download, FileText, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Billing() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Dados mockados
  const currentBill = {
    month: 'Outubro 2025',
    consumption: 450.5,
    costWithSolar: 245.80,
    costWithoutSolar: 892.50,
    savings: 646.70,
    savingsPercentage: 72.5,
    dueDate: '2025-11-10',
    status: 'pending'
  };

  const billingHistory = [
    { month: 'Out/25', withSolar: 245.80, withoutSolar: 892.50, consumption: 450.5 },
    { month: 'Set/25', withSolar: 238.20, withoutSolar: 865.30, consumption: 435.2 },
    { month: 'Ago/25', withSolar: 251.90, withoutSolar: 915.20, consumption: 460.8 },
    { month: 'Jul/25', withSolar: 265.40, withoutSolar: 965.80, consumption: 485.9 },
    { month: 'Jun/25', withSolar: 242.10, withoutSolar: 880.50, consumption: 443.0 },
    { month: 'Mai/25', withSolar: 235.60, withoutSolar: 856.90, consumption: 430.5 },
  ];

  const monthlyDetails = [
    { description: 'Energia Consumida', value: '450.5 kWh', cost: 'R$ 315.35' },
    { description: 'Energia Injetada (Solar)', value: '320.8 kWh', cost: '- R$ 224.56' },
    { description: 'Tarifa Base', value: '-', cost: 'R$ 89.50' },
    { description: 'Impostos (ICMS)', value: '18%', cost: 'R$ 65.51' },
  ];

  const yearlyComparison = [
    { year: '2023', withSolar: 0, withoutSolar: 10245.50 },
    { year: '2024', withSolar: 2856.20, withoutSolar: 10680.30 },
    { year: '2025', withSolar: 2945.40, withoutSolar: 11020.50 },
  ];

  const exportPDF = () => {
    alert('Exportando fatura em PDF...');
  };

  const exportExcel = () => {
    alert('Exportando histórico em Excel...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Faturamento
          </h1>
          <p className="text-gray-600">
            Acompanhe suas contas e economias com energia solar
          </p>
        </div>

        {/* Current Bill Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">Conta Atual</p>
              <h2 className="text-4xl font-bold">{currentBill.month}</h2>
            </div>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
              <FileText size={32} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-1">Valor a Pagar</p>
              <p className="text-3xl font-bold">R$ {currentBill.costWithSolar.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-1">Economia</p>
              <p className="text-3xl font-bold text-green-300">R$ {currentBill.savings.toFixed(2)}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-1">Consumo</p>
              <p className="text-3xl font-bold">{currentBill.consumption} kWh</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>Vencimento: {new Date(currentBill.dueDate).toLocaleDateString('pt-BR')}</span>
            </div>
            <button
              onClick={exportPDF}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Baixar Fatura
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingDown className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Economia Total (2025)</h3>
            <p className="text-2xl font-bold text-gray-800">R$ 8,075.10</p>
            <p className="text-sm text-green-600 mt-2">↓ 73.2% vs sem solar</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Média Mensal</h3>
            <p className="text-2xl font-bold text-gray-800">R$ 245.45</p>
            <p className="text-sm text-gray-500 mt-2">Últimos 6 meses</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Zap className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Energia Injetada</h3>
            <p className="text-2xl font-bold text-gray-800">320.8 kWh</p>
            <p className="text-sm text-purple-600 mt-2">Este mês</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FileText className="text-yellow-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Faturas Pagas</h3>
            <p className="text-2xl font-bold text-gray-800">10/10</p>
            <p className="text-sm text-green-600 mt-2">100% em dia</p>
          </div>
        </div>

        {/* Monthly Details */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Detalhamento da Conta
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyDetails.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-900">
                      {item.cost}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-50 font-bold">
                  <td className="px-6 py-4 text-sm text-gray-900" colSpan={2}>
                    Total a Pagar
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-blue-600 text-lg">
                    R$ {currentBill.costWithSolar.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Historical Comparison */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Histórico - Últimos 6 Meses
              </h2>
              <button
                onClick={exportExcel}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Download size={16} />
                Excel
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={billingHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                <Legend />
                <Bar dataKey="withSolar" fill="#10b981" name="Com Solar" radius={[4, 4, 0, 0]} />
                <Bar dataKey="withoutSolar" fill="#ef4444" name="Sem Solar" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Yearly Comparison */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Comparação Anual
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="withSolar" stroke="#10b981" strokeWidth={3} name="Com Solar" />
                <Line type="monotone" dataKey="withoutSolar" stroke="#ef4444" strokeWidth={3} name="Sem Solar" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}