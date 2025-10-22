import React, { useState, useEffect } from 'react';
import ConsumptionChart from '../../components/charts/ConsumptionChart';
import ComparativeChart from '../../components/charts/ComparativeChart';
import { Activity, TrendingDown, TrendingUp, Zap, DollarSign, Calendar } from 'lucide-react';

interface ConsumptionData {
  date: string;
  consumption: number;
  peak: number;
  offPeak: number;
}

interface ComparativeData {
  period: string;
  production: number;
  consumption: number;
  surplus: number;
  economy: number;
}

const Consumption: React.FC = () => {
  const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);

  // Dados mockados - em produção, viriam da API
  const consumptionData: ConsumptionData[] = [
    { date: '2024-01-01', consumption: 450, peak: 180, offPeak: 270 },
    { date: '2024-01-02', consumption: 520, peak: 210, offPeak: 310 },
    { date: '2024-01-03', consumption: 380, peak: 150, offPeak: 230 },
    { date: '2024-01-04', consumption: 490, peak: 195, offPeak: 295 },
    { date: '2024-01-05', consumption: 550, peak: 220, offPeak: 330 },
    { date: '2024-01-06', consumption: 420, peak: 170, offPeak: 250 },
    { date: '2024-01-07', consumption: 460, peak: 185, offPeak: 275 },
  ];

  const comparativeData: ComparativeData[] = [
    { period: '2024-01', production: 850, consumption: 650, surplus: 200, economy: 450 },
    { period: '2024-02', production: 920, consumption: 680, surplus: 240, economy: 520 },
    { period: '2024-03', production: 780, consumption: 720, surplus: 60, economy: 380 },
    { period: '2024-04', production: 900, consumption: 700, surplus: 200, economy: 480 },
    { period: '2024-05', production: 950, consumption: 690, surplus: 260, economy: 550 },
    { period: '2024-06', production: 880, consumption: 710, surplus: 170, economy: 460 },
  ];

  const currentMonthConsumption = 4850;
  const lastMonthConsumption = 4520;
  const averageDailyConsumption = 161.67;
  const currentMonthCost = 1245.80;
  const peakConsumption = 45.2;

  const consumptionChange = ((currentMonthConsumption - lastMonthConsumption) / lastMonthConsumption * 100).toFixed(1);
  const isIncreasing = parseFloat(consumptionChange) > 0;

  useEffect(() => {
    // Simular carregamento de dados
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [period]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consumo de Energia
          </h1>
          <p className="text-gray-600">
            Acompanhe seu consumo e compare com a produção solar
          </p>
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
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Diário
              </button>
              <button
                onClick={() => setPeriod('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  period === 'monthly'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setPeriod('yearly')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  period === 'yearly'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Anual
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Consumo Atual */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              {isIncreasing ? (
                <TrendingUp className="w-5 h-5 text-red-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-green-500" />
              )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Consumo do Mês
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {currentMonthConsumption.toLocaleString('pt-BR')} kWh
            </p>
            <p className={`text-sm font-medium ${isIncreasing ? 'text-red-600' : 'text-green-600'}`}>
              {isIncreasing ? '+' : ''}{consumptionChange}% vs mês anterior
            </p>
          </div>

          {/* Média Diária */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Média Diária
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {averageDailyConsumption.toFixed(2)} kWh
            </p>
            <p className="text-sm text-gray-500">
              Últimos 30 dias
            </p>
          </div>

          {/* Custo Mensal */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Custo Estimado
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              R$ {currentMonthCost.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Sem energia solar
            </p>
          </div>

          {/* Pico de Consumo */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              Pico de Consumo
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {peakConsumption}%
            </p>
            <p className="text-sm text-gray-500">
              Horário de ponta
            </p>
          </div>
        </div>

        {/* Gráfico de Consumo */}
        <div className="mb-8">
          <ConsumptionChart
            data={consumptionData}
            chartType="area"
            showPeakOffPeak={true}
            height={400}
          />
        </div>

        {/* Análise Comparativa */}
        <div className="mb-8">
          <ComparativeChart
            data={comparativeData}
            chartType="composed"
            showEconomy={true}
            comparisonType="monthly"
            height={400}
          />
        </div>

        {/* Insights e Recomendações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Insights */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Insights do Consumo
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Maior consumo detectado
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Seu consumo é 15% maior às quintas-feiras entre 18h-20h
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Boa autossuficiência
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Você está cobrindo 92% do seu consumo com energia solar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Tendência de aumento
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Consumo aumentou 7% comparado ao mesmo período do ano passado
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recomendações */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              Recomendações
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Otimize o horário de uso
                </h4>
                <p className="text-sm text-blue-800">
                  Considere usar aparelhos de alto consumo durante o dia, quando a produção solar está no pico
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  Economize até R$ 180/mês
                </h4>
                <p className="text-sm text-green-800">
                  Reduza o consumo em horário de ponta para maximizar a economia com seu sistema solar
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Considere expansão
                </h4>
                <p className="text-sm text-purple-800">
                  Com o aumento do consumo, adicionar mais painéis pode aumentar sua autossuficiência para 100%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consumption;