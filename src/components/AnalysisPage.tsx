import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Play,
  Square,
  Settings,
  Download,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  Zap
} from 'lucide-react';

const AnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'yolo' | 'opencv'>('yolo');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Implementar captura de vídeo
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Parar captura
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Processar arquivo
      console.log('Arquivo selecionado:', file.name);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);

    // Simular análise
    setTimeout(() => {
      setResults({
        detections: [
          {
            class: 'frasco',
            confidence: 0.97,
            bbox: [100, 100, 200, 300],
            metadata: { cap: 'presente', label: 'integra' }
          },
          {
            class: 'tampa',
            confidence: 0.89,
            bbox: [120, 80, 160, 120],
            metadata: { status: 'presente' }
          }
        ],
        ocr: {
          text: 'MEDICAMENTO XYZ',
          batch: 'L2024001',
          expiration: '2025-12-31'
        },
        summary: 'Análise concluída com sucesso. Item aprovado.'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Análise de Embalagens</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Sistema de detecção e análise automatizada usando IA
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('yolo')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'yolo'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              YOLOv8 - Detecção de Objetos
            </div>
          </button>
          <button
            onClick={() => setActiveTab('opencv')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'opencv'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              OpenCV - Análise Avançada
            </div>
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video/Image Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Prévia de {activeTab === 'yolo' ? 'Detecção YOLOv8' : 'Análise OpenCV'}
              </h3>
              {/* Correção 1 foi aqui */}
              <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {activeTab === 'yolo' ? 'Caixas e Cartelas' : 'Frascos e Blisters'}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,video/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </button>
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${
                    isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 mr-1" />
                      Parar
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      Gravar
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              {isRecording ? (
                <div className="text-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Gravando {activeTab === 'yolo' ? 'caixas e cartelas' : 'frascos e blisters'}...
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Área de prévia - {activeTab === 'yolo' ? 'YOLOv8' : 'OpenCV'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {activeTab === 'yolo'
                      ? 'Posicione caixas farmacêuticas ou cartelas de comprimidos'
                      : 'Posicione frascos ou blisters para análise'
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Status: {isRecording ? 'Gravando' : 'Parado'} |
                Modo: {activeTab === 'yolo' ? 'YOLOv8 (Caixas/Cartelas)' : 'OpenCV (Frascos/Blisters)'}
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4 mr-2" />
                )}
                {isAnalyzing
                  ? `Analisando com ${activeTab === 'yolo' ? 'YOLOv8' : 'OpenCV'}...`
                  : `Iniciar Análise ${activeTab === 'yolo' ? 'YOLOv8' : 'OpenCV'}`
                }
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Sensor Data */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Dados dos Sensores</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Temperatura:</span>
                <span className="text-green-600">23.5°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Umidade:</span>
                <span className="text-blue-600">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pressão:</span>
                <span className="text-purple-600">1013 hPa</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Vibração:</span>
                <span className="text-orange-600">0.02g</span>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Resultados - {activeTab === 'yolo' ? 'YOLOv8' : 'OpenCV'}
              </h3>
              {results && (
                <button className="flex items-center px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Download className="w-4 h-4 mr-1" />
                  Exportar
                </button>
              )}
            </div>

            {isAnalyzing ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 text-pink-500 animate-spin mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  Processando {activeTab === 'yolo' ? 'caixas e cartelas com YOLOv8' : 'frascos e blisters com OpenCV'}...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {activeTab === 'yolo'
                    ? 'Detectando objetos e classificando tipos de embalagem'
                    : 'Analisando integridade, tampas e realizando OCR'
                  }
                </p>
              </div>
            ) : results ? (
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">Análise Concluída</p>
                    <p className="text-sm text-green-600 dark:text-green-400">{results.summary}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {activeTab === 'yolo' ? 'Detecções YOLOv8:' : 'Análises OpenCV:'}
                  </h4>
                  <div className="space-y-2">
                    {results.detections.map((detection: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium capitalize text-gray-900 dark:text-gray-100">{detection.class}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {(detection.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {activeTab === 'yolo'
                            ? `Posição: [${detection.bbox.join(', ')}]`
                            : `Área analisada: [${detection.bbox.join(', ')}]`
                          }
                        </div>
                        {detection.metadata && (
                          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            {activeTab === 'yolo'
                              ? `Tipo: ${detection.metadata.type || 'N/A'}`
                              : `Status: ${detection.metadata.status || 'N/A'} | Tampa: ${detection.metadata.cap || 'N/A'}`
                            }
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {results.ocr && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">OCR:</h4>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm space-y-1">
                        <div className="text-gray-900 dark:text-gray-100"><strong>Texto:</strong> {results.ocr.text}</div>
                        <div className="text-gray-900 dark:text-gray-100"><strong>Lote:</strong> {results.ocr.batch}</div>
                        <div className="text-gray-900 dark:text-gray-100"><strong>Validade:</strong> {results.ocr.expiration}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">
                  Nenhuma análise {activeTab === 'yolo' ? 'YOLOv8' : 'OpenCV'} executada
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {activeTab === 'yolo'
                    ? 'Posicione caixas farmacêuticas ou cartelas de comprimidos'
                    : 'Posicione frascos ou blisters para análise'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab-specific Configuration */}
      {activeTab === 'yolo' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Configurações YOLOv8 - Caixas e Cartelas
          </h3>
          {/* Correção 2 foi aqui */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Especialização:</strong> Esta API é otimizada para detectar e classificar caixas farmacêuticas e cartelas de comprimidos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Threshold de Confiança
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="0.5"
                className="w-full"
              />
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">0.5 (50%)</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Classes Detectáveis
              </label>
              <div className="space-y-1 text-sm">
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Caixa Farmacêutica
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Cartela de Comprimidos
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="mr-2" />
                  Embalagem Secundária
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Modo de Inferência
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option>Tempo Real</option>
                <option>Batch</option>
                <option>Single Frame</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Configurações OpenCV - Frascos e Blisters
          </h3>
          {/* Correção 3 foi aqui */}
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Especialização:</strong> Esta API é otimizada para analisar frascos (tampas, integridade) e blisters (alvéolos, perfurações).
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Análises Ativas
              </label>
              <div className="space-y-1 text-sm">
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Detecção de Tampa
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Integridade do Frasco
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Análise de Blister
                </label>
                <label className="flex items-center text-gray-700 dark:text-gray-300">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  OCR de Rótulos
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sensibilidade de Detecção
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                defaultValue="0.7"
                className="w-full"
              />
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">0.7 (70%)</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tipo de Análise
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option>Frascos + OCR</option>
                <option>Blisters + Contagem</option>
                <option>Análise Completa</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;