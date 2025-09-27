import React from 'react';
import { 
  Camera, 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  BarChart3,
  Activity
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

const Dashboard: React.FC = () => {
  const { addNotification } = useNotifications();

  // Simular notificações automáticas
  React.useEffect(() => {
    const interval = setInterval(() => {
      const notifications = [
        {
          type: 'success' as const,
          title: 'Análise Concluída',
          message: 'Nova análise YOLOv8 de caixa farmacêutica aprovada com 97.8% de confiança.',
        },
        {
          type: 'warning' as const,
          title: 'Atenção Requerida',
          message: 'Frasco rejeitado na análise OpenCV - verificar integridade da tampa.',
        },
        {
          type: 'info' as const,
          title: 'Sistema Atualizado',
          message: 'Modelo YOLOv8 atualizado com nova versão 8.2.1.',
        },
      ];
      
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      addNotification(randomNotification);
    }, 30000); // A cada 30 segundos

    return () => clearInterval(interval);
  }, [addNotification]);
  const stats = [
    {
      title: 'Análises Hoje',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Camera,
      color: 'bg-blue-500'
    },
    {
      title: 'Itens no Inventário',
      value: '1,832',
      change: '+5%',
      changeType: 'positive',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Taxa de Aprovação',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-pink-500'
    },
    {
      title: 'Alertas Pendentes',
      value: '8',
      change: '-3',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'bg-orange-500'
    }
  ];

  const recentAnalyses = [
    {
      id: 1,
      type: 'Caixa Farmacêutica',
      batch: 'L2024001',
      status: 'Aprovado',
      confidence: 97.8,
      time: '14:32',
      api: 'YOLOv8'
    },
    {
      id: 2,
      type: 'Frasco',
      batch: 'L2024002',
      status: 'Rejeitado',
      confidence: 45.2,
      time: '14:28',
      api: 'OpenCV'
    },
    {
      id: 3,
      type: 'Cartela de Comprimidos',
      batch: 'L2024003',
      status: 'Aprovado',
      confidence: 89.1,
      time: '14:25',
      api: 'YOLOv8'
    },
    {
      id: 4,
      type: 'Blister',
      batch: 'L2024004',
      status: 'Pendente',
      confidence: 76.3,
      time: '14:20',
      api: 'OpenCV'
    }
  ];

  return (
    <div className="space-y-6 transition-colors">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${
                      stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Atividade de Análises</h3>
            <BarChart3 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">Gráfico de atividade</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Visualização das análises por hora</p>
            </div>
          </div>
        </div>

        {/* Recent Analyses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Análises Recentes</h3>
            <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{analysis.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{analysis.batch}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">{analysis.api}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    analysis.status === 'Aprovado' 
                      ? 'bg-green-100 text-green-800'
                      : analysis.status === 'Rejeitado'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {analysis.status}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{analysis.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Status do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">API YOLOv8</h4>
            <p className="text-sm text-green-600 dark:text-green-400">Operacional</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">API OpenCV</h4>
            <p className="text-sm text-green-600 dark:text-green-400">Operacional</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Base de Dados</h4>
            <p className="text-sm text-green-600 dark:text-green-400">Conectado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;