import React, { useState, useEffect } from 'react';
import ProductionChart from '../../components/charts/ProductionChart';
import { 
  Sun, 
  Zap, 
  TrendingUp, 
  Battery, 
  CloudSun, 
  AlertCircle,
  CheckCircle,
  Calendar,
  Download
} from 'lucide-react';

interface ProductionData {
  date: string;
  production: number;
  capacity: number;
  efficiency: number;
}

interface PanelStatus {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'inactive';
  currentPower: number;
  efficiency: number;
}

const Production: React.FC = () => {
  const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);

  // Dados mockados - em produção, viriam da API
  const productionData: ProductionData[] = [
    { date: '2024-01-01', production: 850, capacity: 1000, efficiency: 85 },
    { date: '2024-01-02', production: 920, capacity: 1000, efficiency: 92 },
    { date: '2024-01-03', production: 780, capacity: 1000, efficiency: 78 },
    { date: '2024-01-04', production: 900, capacity: 1000, efficiency: 90 },
    { date: '2024-01-05', production: 950, capacity: 1000, efficiency: 95 },
    { date: '2024-01-06', production: 880, capacity: 1000, efficiency: 88 },
    { date: '2024-01-07', production: 910, capacity: 1000, efficiency: 91 },
  ];

  const panelsStatus: PanelStatus[] = [
    { id: '1', name: 'Painel Solar A1', status: 'active', currentPower: 380, efficiency: 95 },
    { id: '2', name: 'Painel Solar A2', status: 'active', currentPower: 375, efficiency: 94 },
    { id: '3', name: 'Painel Solar B1', status: 'active', currentPower: 390, efficiency: 97 },
    { id: '4', name: 'Painel Solar B2', status: 'warning', currentPower: 320, efficiency: 80 },
  ];

  const totalProduction = 6190;
  const currentPower = 1465;
  const systemEfficiency = 91.5;
  const co2Saved = 3.87;
  const treesEquivalent = 174;
  const activePanels = panelsStatus.filter(p => p.status === 'active').length;
  const warningPanels = panelsStatus.filter(p => p.status === 'warning').length;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [period]);

  const handleExportData = () => {
    // Implementar lógica de exportação
    console.log('Exportando dados de produção...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Produção de Energia Solar
            </h1>
            <p className="text-gray-600">
              Monitore a geração e performance dos seus painéis solares
            </p>
          </div>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            Exportar Dados
          </button>
        </div>

        {/* Filtro de Período */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div className="flex gap-2">
              <button
                onClick={() => setPeriod('daily')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  period === 'daily'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Diário
              </button>
              <button
                onClick={() => setPeriod('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  period === 'monthly'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setPeriod('yearly')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  period === 'yearly'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Anual
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Produção Total */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Sun className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-white text-opacity-90 text-sm font-medium mb-1">
              Produção do Mês
            </h3>
            <p className="text-3xl font-bold mb-1">
              {totalProduction.toLocaleString('pt-BR')} kWh
            </p>
            <p className="text-sm text-white text-opacity-80">
              +12.5% vs mês anterior
            </p>
          </div>

          {/* Potência Atual */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Potência Atual
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {currentPower.toLocaleString('pt-BR')} W
            </p>
            <p className="text-sm text-gray-500">
              Geração em tempo real
            </p>
          </div>

          {/* Eficiência do Sistema */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Battery className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Eficiência do Sistema
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {systemEfficiency}%
            </p>
            <p className="text-sm text-green-600 font-medium">
              Desempenho excelente
            </p>
          </div>

          {/* Status dos Painéis */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <CloudSun className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Status dos Painéis
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {activePanels}/{panelsStatus.length}
            </p>
            <p className="text-sm text-gray-500">
              {warningPanels > 0 ? `${warningPanels} com alerta` : 'Todos operacionais'}
            </p>
          </div>
        </div>

        {/* Gráfico de Produção */}
        <div className="mb-8">
          <ProductionChart
            data={productionData}
            chartType="area"
            showCapacity={true}
            showEfficiency={true}
            height={400}
          />
        </div>

        {/* Grid: Impacto Ambiental e Status dos Painéis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Impacto Ambiental */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sun className="w-5 h-5 text-green-600" />
              Impacto Ambiental
            </h3>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    CO₂ Evitado
                  </span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-green-700 mb-1">
                  {co2Saved.toFixed(2)} ton
                </p>
                <p className="text-xs text-gray-600">
                  Equivalente a {treesEquivalent} árvores plantadas
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-700 font-medium mb-1">
                    Energia Limpa
                  </p>
                  <p className="text-xl font-bold text-blue-800">
                    100%
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-xs text-amber-700 font-medium mb-1">
                    Economia Total
                  </p>
                  <p className="text-xl font-bold text-amber-800">
                    R$ 1.847
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-4">
                <p className="text-sm font-medium mb-2">
                  Sua contribuição é equivalente a:
                </p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Retirar 2 carros das ruas por 1 mês
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Economizar 4.200 litros de água
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    Preservar 85m² de floresta
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status Individual dos Painéis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Battery className="w-5 h-5 text-blue-600" />
              Status dos Painéis
            </h3>
            <div className="space-y-4">
              {panelsStatus.map((panel) => (
                <div
                  key={panel.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    panel.status === 'active'
                      ? 'bg-green-50 border-green-200'
                      : panel.status === 'warning'
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {panel.status === 'active' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      )}
                      <span className="font-semibold text-gray-900">
                        {panel.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        panel.status === 'active'
                          ? 'bg-green-200 text-green-800'
                          : 'bg-amber-200 text-amber-800'
                      }`}
                    >
                      {panel.status === 'active' ? 'Ativo' : 'Atenção'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Potência Atual</p>
                      <p className="text-lg font-bold text-gray-900">
                        {panel.currentPower} W
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Eficiência</p>
                      <p className="text-lg font-bold text-gray-900">
                        {panel.efficiency}%
                      </p>
                    </div>
                  </div>

                  {/* Barra de eficiência */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          panel.efficiency >= 90
                            ? 'bg-green-500'
                            : panel.efficiency >= 75
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${panel.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {warningPanels > 0 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Atenção:</strong> {warningPanels} painel(is) com eficiência abaixo do esperado. 
                  Considere agendar uma manutenção preventiva.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Análise e Previsão */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Análise e Previsão
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">Previsão para Hoje</p>
              <p className="text-3xl font-bold text-blue-700 mb-1">945 kWh</p>
              <p className="text-xs text-gray-500">Baseado em condições climáticas</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-2">Meta do Mês</p>
              <p className="text-3xl font-bold text-green-700 mb-1">87%</p>
              <p className="text-xs text-gray-500">Faltam 810 kWh para atingir</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-2">Melhor Dia</p>
              <p className="text-3xl font-bold text-purple-700 mb-1">950 kWh</p>
              <p className="text-xs text-gray-500">05/01/2024 - Céu limpo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Production;