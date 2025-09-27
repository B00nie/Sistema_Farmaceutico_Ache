import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Database, 
  Bot, 
  Shield, 
  BarChart3,
  Save,
  RefreshCw,
  Key,
  Monitor,
  Upload,
  Moon,
  Sun,
  Palette
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'system' | 'users' | 'models' | 'chatbot' | 'security' | 'appearance'>('system');
  const { isDarkMode, setTheme } = useTheme();
  const { addNotification } = useNotifications();

  const tabs = [
    { id: 'system', name: 'Sistema', icon: Monitor },
    { id: 'users', name: 'Usuários', icon: Users },
    { id: 'models', name: 'Modelos IA', icon: Database },
    { id: 'chatbot', name: 'Chatbot', icon: Bot },
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'appearance', name: 'Aparência', icon: Palette },
  ];

  const handleSaveSettings = () => {
    addNotification({
      type: 'success',
      title: 'Configurações Salvas',
      message: 'Todas as configurações foram salvas com sucesso.',
    });
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setTheme(theme);
    addNotification({
      type: 'info',
      title: 'Tema Alterado',
      message: `Tema ${theme === 'dark' ? 'escuro' : 'claro'} aplicado com sucesso.`,
    });
  };
  return (
    <div className="space-y-6 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Administração</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configurações e gerenciamento do sistema
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </button>
          <button 
            onClick={handleSaveSettings}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-pink-100 text-pink-700 border-r-2 border-pink-600'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Status dos Serviços
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">API YOLOv8</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Operacional - 99.9% uptime</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">API OpenCV</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Operacional - 99.8% uptime</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Base de Dados MySQL</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Conectado - 256MB uso</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações Gerais
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome do Sistema
                    </label>
                    <input
                      type="text"
                      defaultValue="Sistema de Análise Farmacêutica"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Timeout de Análise (segundos)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Máximo de Uploads Simultâneos
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações de Aparência
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Tema da Interface
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          !isDarkMode
                            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                            <Sun className="w-6 h-6 text-yellow-500" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Modo Claro</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Interface clara e limpa</p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          isDarkMode
                            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
                            <Moon className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">Modo Escuro</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Reduz o cansaço visual</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Paleta de Cores
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-pink-600 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Primária: #D92567</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-secondary-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Secundária: #F2357B</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-accent-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Destaque: #F2B3CA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Configurações Adicionais
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="mr-3 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Animações suaves</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="mr-3 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Transições de tema automáticas</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-3 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Seguir configuração do sistema</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações de Notificação
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duração das Notificações (segundos)
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      min="1"
                      max="30"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Tipos de Notificação
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="mr-3 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Análises concluídas</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="mr-3 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Erros do sistema</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="mr-3 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Atualizações de inventário</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-3 rounded border-gray-300 text-pink-600 focus:ring-pink-500" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Notificações por email</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => addNotification({
                        type: 'info',
                        title: 'Notificação de Teste',
                        message: 'Esta é uma notificação de teste para verificar o funcionamento do sistema.',
                      })}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Testar Notificação
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Gerenciamento de Usuários
                </h3>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Users className="w-4 h-4 mr-2" />
                  Novo Usuário
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Função
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Admin Sistema</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">admin@empresa.com</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                          Administrador
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                          Ativo
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">Editar</button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Desativar</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">Operador 1</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">operador1@empresa.com</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                          Operador
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                          Ativo
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">Editar</button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Desativar</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Modelos YOLOv8 - Caixas e Cartelas
                </h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">yolov8n-caixas-cartelas.pt</h4>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Ativo
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Modelo especializado em detectar caixas farmacêuticas e cartelas de comprimidos
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                        <Upload className="w-4 h-4 mr-1" />
                        Atualizar
                      </button>
                      <span className="text-xs text-gray-500">Acurácia: 94.2% (caixas/cartelas) | Última atualização: 15/01/2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Configurações OpenCV - Frascos e Blisters
                </h3>
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Especialização:</strong> Parâmetros otimizados para análise de frascos (tampas, integridade) e blisters (alvéolos, perfurações).
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sensibilidade Detecção Tampa
                    </label>
                    <input
                      type="number"
                      defaultValue="0.7"
                      step="0.1"
                      min="0.1"
                      max="1.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Threshold Integridade Frasco
                    </label>
                    <input
                      type="number"
                      defaultValue="0.8"
                      step="0.1"
                      min="0.1"
                      max="1.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modo de Análise
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500">
                      <option>Frascos + OCR</option>
                      <option>Blisters + Contagem</option>
                      <option>Análise Completa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precisão OCR Rótulos
                    </label>
                    <input
                      type="number"
                      defaultValue="0.9"
                      step="0.1"
                      min="0.1"
                      max="1.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chatbot' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Configurações do Chatbot
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Assistente
                    </label>
                    <input
                      type="text"
                      defaultValue="Assistente Farmacêutico"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem de Boas-vindas
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Olá! Sou o assistente do sistema de análise farmacêutica. Como posso ajudá-lo hoje?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      <span className="text-sm text-gray-700">Chatbot ativo</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Base de Conhecimento
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">FAQ Análises</span>
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">12 perguntas e respostas sobre análises</p>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Procedimentos Operacionais</span>
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">8 procedimentos padrão documentados</p>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Troubleshooting</span>
                      <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">15 problemas comuns e soluções</p>
                  </div>
                </div>
                
                <button className="mt-4 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Nova Entrada
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Configurações de Segurança
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempo de Sessão (minutos)
                    </label>
                    <input
                      type="number"
                      defaultValue="60"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tentativas de Login
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      <span className="text-sm text-gray-700">Forçar HTTPS</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      <span className="text-sm text-gray-700">Log de auditoria ativo</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Chaves de API
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Key className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">YOLOv8 API Key</p>
                        <p className="text-sm text-gray-600">••••••••••••••••••••</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Regenerar</button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Key className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">OpenCV API Key</p>
                        <p className="text-sm text-gray-600">••••••••••••••••••••</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Regenerar</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default AdminPage;