import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';
import { 
  Settings, 
  Users, 
  Shield, 
  Bot, 
  Brain, 
  Eye,
  Sun,
  Moon,
  Bell,
  BellOff,
  Save,
  Key,
  RefreshCw,
  TestTube,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { addNotification, notifications, clearNotifications, settings, updateSettings } = useNotification();
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', label: 'Aparência', icon: Eye },
    { id: 'ai-models', label: 'Modelos IA', icon: Brain },
    { id: 'chatbot', label: 'Chatbot', icon: Bot },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'notifications', label: 'Notificações', icon: Bell }
  ];

  const handleSaveSettings = () => {
    addNotification('Configurações salvas com sucesso!', 'success');
  };

  const testNotification = (type: 'success' | 'warning' | 'error' | 'info') => {
    const messages = {
      success: 'Teste de notificação de sucesso!',
      warning: 'Teste de notificação de aviso!',
      error: 'Teste de notificação de erro!',
      info: 'Teste de notificação informativa!'
    };
    addNotification(messages[type], type);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Administração</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie configurações do sistema, modelos IA e preferências.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleTheme}
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
            {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Aba Aparência */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações de Aparência
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tema da Interface
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => theme !== 'light' && toggleTheme()}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'light'
                              ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Modo Claro</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Interface clara e limpa</div>
                        </button>
                        <button
                          onClick={() => theme !== 'dark' && toggleTheme()}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'dark'
                              ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <Moon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Modo Escuro</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Reduz fadiga visual</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Modelos IA */}
          {activeTab === 'ai-models' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações dos Modelos IA
                </h3>
                
                {/* YOLOv8 Configuration */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 transition-colors">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-pink-500" />
                    YOLOv8 - Caixas e Cartelas
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Limite de Confiança
                      </label>
                      <input
                        type="number"
                        defaultValue="0.7"
                        step="0.1"
                        min="0.1"
                        max="1.0"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                      />
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">0.7 (70%)</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Classes Detectadas
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
                        <option>Caixas Farmacêuticas</option>
                        <option>Cartelas de Comprimidos</option>
                        <option>Todas as Classes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* OpenCV Configuration */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-blue-500" />
                    OpenCV - Frascos e Blisters
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sensibilidade OCR
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        defaultValue="7"
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Nível 7/10</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Detecção de Defeitos
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
                        <option>Alta Precisão</option>
                        <option>Balanceado</option>
                        <option>Alta Velocidade</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Chatbot */}
          {activeTab === 'chatbot' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações do Chatbot
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mensagem de Boas-vindas
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Olá! Sou o assistente virtual do sistema de análise farmacêutica. Como posso ajudá-lo hoje?"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tempo de Resposta (ms)
                      </label>
                      <input
                        type="number"
                        defaultValue="1500"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Idioma Principal
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
                        <option>Português (Brasil)</option>
                        <option>Inglês</option>
                        <option>Espanhol</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Base de Conhecimento</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 transition-colors">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Procedimentos de Análise</span>
                        <button className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-sm transition-colors">
                          Editar
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 transition-colors">
                        <span className="text-sm text-gray-700 dark:text-gray-300">FAQs do Sistema</span>
                        <button className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-sm transition-colors">
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Segurança */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações de Segurança
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tempo de Sessão (minutos)
                      </label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tentativas de Login
                      </label>
                      <input
                        type="number"
                        defaultValue="3"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Autenticação de dois fatores obrigatória
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Log de auditoria detalhado
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Chaves de API</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 transition-colors">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">YOLOv8 API Key</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">••••••••••••••••</div>
                        </div>
                        <button className="flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-sm transition-colors">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Regenerar
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 transition-colors">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">OpenCV API Key</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">••••••••••••••••</div>
                        </div>
                        <button className="flex items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-sm transition-colors">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Regenerar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Aba Usuários */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Gerenciamento de Usuários
                </h3>
                <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                  <Users className="w-4 h-4 mr-2" />
                  Novo Usuário
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-colors">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Função
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">admin@pharma.com</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Administrador</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        Admin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          Ativo
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-pink-600 dark:text-pink-400 hover:text-pink-900 dark:hover:text-pink-300 transition-colors">
                          Editar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Aba Notificações */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Configurações de Notificações
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duração das Notificações (segundos)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={settings.duration / 1000}
                        onChange={(e) => updateSettings({ duration: parseInt(e.target.value) * 1000 })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Posição na Tela
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
                        <option>Superior Direito</option>
                        <option>Superior Esquerdo</option>
                        <option>Inferior Direito</option>
                        <option>Inferior Esquerdo</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Tipos de Notificação Ativas</h4>
                    <div className="space-y-2">
                      {Object.entries(settings.types).map(([type, enabled]) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => updateSettings({ 
                              types: { ...settings.types, [type]: e.target.checked }
                            })}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 dark:border-gray-600 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {type === 'success' && 'Sucesso'}
                            {type === 'warning' && 'Aviso'}
                            {type === 'error' && 'Erro'}
                            {type === 'info' && 'Informação'}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Testar Notificações</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => testNotification('success')}
                        className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Sucesso
                      </button>
                      <button
                        onClick={() => testNotification('warning')}
                        className="flex items-center px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Aviso
                      </button>
                      <button
                        onClick={() => testNotification('error')}
                        className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Erro
                      </button>
                      <button
                        onClick={() => testNotification('info')}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botão Salvar */}
          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSaveSettings}
              className="flex items-center px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;