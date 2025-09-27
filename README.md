# Sistema de Análise de Embalagens Farmacêuticas

## Visão Geral

Sistema corporativo modular para análise automatizada de embalagens farmacêuticas e gerenciamento de inventário, utilizando inteligência artificial especializada.

## Especialização das APIs

### YOLOv8 - Detecção de Caixas e Cartelas
- **Especialização**: Caixas farmacêuticas e cartelas de comprimidos
- **Funcionalidades**:
  - Detecção e classificação de caixas farmacêuticas
  - Identificação de cartelas de comprimidos
  - Análise de embalagens secundárias
  - Classificação por tipo e tamanho

### OpenCV - Análise de Frascos e Blisters
- **Especialização**: Frascos e blisters
- **Funcionalidades**:
  - Verificação de presença e integridade de tampas
  - Análise de integridade de frascos
  - Contagem e análise de alvéolos em blisters
  - OCR para leitura de rótulos e informações
  - Detecção de defeitos visuais

## Arquitetura do Sistema

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway    │    │   Microserviços │
│   React + TS    │◄──►│   Node.js        │◄──►│   Python        │
│                 │    │                  │    │                 │
│ • Dashboard     │    │ • Autenticação   │    │ • YOLOv8 API    │
│ • Análise       │    │ • Roteamento     │    │ • OpenCV API    │
│ • Inventário    │    │ • WebSockets     │    │ • Chatbot NLP   │
│ • Admin         │    │                  │    │                 │
│ • Chatbot       │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │   Base de Dados  │
                    │   MySQL          │
                    │                  │
                    │ • Usuários       │
                    │ • Inventário     │
                    │ • Análises       │
                    │ • Detecções      │
                    └──────────────────┘
```

## Fluxo de Dados

1. **Captura**: Upload de imagem ou vídeo em tempo real
2. **Roteamento**: Sistema identifica tipo de embalagem
   - Caixas/Cartelas → YOLOv8 API
   - Frascos/Blisters → OpenCV API
3. **Análise**: API especializada processa a imagem
4. **Resultados**: JSON estruturado com detecções e metadados
5. **Inventário**: Dados automaticamente enviados para o sistema de estoque
6. **Notificação**: WebSocket atualiza interface em tempo real

## Modelo de Dados

### Tabelas Principais

```sql
-- Usuários do sistema
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'operator', 'viewer') DEFAULT 'operator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Itens do inventário
CREATE TABLE inventory_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('caixa_farmaceutica', 'cartela_comprimidos', 'frasco', 'blister') NOT NULL,
    name VARCHAR(255) NOT NULL,
    batch_code VARCHAR(100),
    expiration_date DATE,
    status ENUM('aprovado', 'rejeitado', 'pendente') DEFAULT 'pendente',
    api_source ENUM('yolov8', 'opencv') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_batch (batch_code)
);

-- Imagens dos itens
CREATE TABLE item_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    image_type ENUM('original', 'annotated') DEFAULT 'original',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
);

-- Detecções das APIs
CREATE TABLE detections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    source_api ENUM('yolov8', 'opencv') NOT NULL,
    class_detected VARCHAR(100) NOT NULL,
    confidence DECIMAL(5,3) NOT NULL,
    bbox_json JSON,
    metadata_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE,
    INDEX idx_source (source_api),
    INDEX idx_confidence (confidence)
);

-- Jobs de análise
CREATE TABLE analysis_jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    source_api ENUM('yolov8', 'opencv') NOT NULL,
    job_status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    summary_result TEXT,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE,
    INDEX idx_status (job_status)
);
```

## APIs Python

### Estrutura de Resposta Padrão

```json
{
  "job_id": "uuid-v4",
  "source": "yolov8|opencv",
  "timestamp": "2025-01-15T14:32:00Z",
  "item_type": "caixa_farmaceutica|cartela_comprimidos|frasco|blister",
  "detections": [
    {
      "class": "nome_da_classe",
      "confidence": 0.97,
      "bbox": [x, y, width, height],
      "metadata": {
        "specific_field": "value"
      }
    }
  ],
  "ocr": {
    "text": "TEXTO_EXTRAIDO",
    "batch": "L2024001",
    "expiration": "2025-12-31"
  },
  "summary": "Análise concluída com sucesso. Item aprovado.",
  "annotated_image_url": "/images/annotated/uuid.jpg"
}
```

### YOLOv8 API - Endpoint Especializado

```python
# POST /api/yolov8/analyze
# Especializado em: caixas farmacêuticas e cartelas de comprimidos

{
  "detections": [
    {
      "class": "caixa_farmaceutica",
      "confidence": 0.94,
      "bbox": [100, 100, 200, 300],
      "metadata": {
        "size": "medium",
        "condition": "intact",
        "label_visible": true
      }
    },
    {
      "class": "cartela_comprimidos",
      "confidence": 0.89,
      "bbox": [150, 200, 180, 120],
      "metadata": {
        "pills_count": 10,
        "blister_type": "aluminum",
        "integrity": "good"
      }
    }
  ]
}
```

### OpenCV API - Endpoint Especializado

```python
# POST /api/opencv/analyze
# Especializado em: frascos e blisters

{
  "detections": [
    {
      "class": "frasco",
      "confidence": 0.92,
      "bbox": [80, 50, 150, 400],
      "metadata": {
        "cap_present": true,
        "cap_integrity": "good",
        "label_alignment": "correct",
        "volume_ml": 100
      }
    },
    {
      "class": "blister",
      "confidence": 0.87,
      "bbox": [200, 100, 300, 200],
      "metadata": {
        "cavities_total": 20,
        "cavities_filled": 18,
        "perforations": "intact",
        "material": "pvc_aluminum"
      }
    }
  ],
  "ocr": {
    "text": "MEDICAMENTO XYZ 500mg",
    "batch": "L2024001",
    "expiration": "2025-12-31",
    "manufacturer": "FARMACIA ABC"
  }
}
```

## Endpoints REST

### Inventário
- `POST /api/inventory/add` - Adicionar item ao inventário
- `GET /api/inventory/list` - Listar itens com filtros
- `GET /api/inventory/{id}` - Detalhes do item
- `PUT /api/inventory/{id}` - Atualizar status do item
- `POST /api/inventory/search` - Busca por OCR, lote, validade

### Análise
- `POST /api/yolov8/analyze` - Análise de caixas e cartelas
- `POST /api/opencv/analyze` - Análise de frascos e blisters
- `GET /api/analysis/status/{job_id}` - Status do job
- `GET /api/analysis/results/{job_id}` - Resultados da análise

## Tecnologias

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Lucide React** para ícones
- **WebSockets** para atualizações em tempo real

### Backend
- **Node.js** (API Gateway, autenticação, WebSockets)
- **Python** (Microserviços YOLOv8 e OpenCV)
- **FastAPI** para APIs Python
- **MySQL** como banco de dados principal
- **Redis** para cache e sessões

### IA e Processamento
- **YOLOv8** (Ultralytics) para detecção de objetos
- **OpenCV** para processamento de imagem
- **Tesseract OCR** para extração de texto
- **NumPy/PIL** para manipulação de imagens

## Paleta de Cores

- **Primary**: #D92567 (Rosa principal)
- **Secondary**: #F2357B (Rosa secundário)
- **Accent**: #F2B3CA (Rosa claro)
- **Highlight**: #F2836B (Laranja suave)
- **Background**: #F2F2F2 (Cinza claro)

## Funcionalidades do Chatbot

O chatbot integrado oferece suporte especializado:

- **Orientação de Uso**: Explica quando usar YOLOv8 vs OpenCV
- **Troubleshooting**: Resolve problemas comuns de análise
- **Interpretação de Resultados**: Explica resultados das análises
- **Navegação**: Guia pelos recursos do sistema
- **FAQ Dinâmico**: Base de conhecimento atualizável

## Segurança

- **Autenticação OAuth 2.0**
- **Criptografia de senhas** (bcrypt)
- **Tokens JWT** para sessões
- **Rate limiting** nas APIs
- **Validação de entrada** em todos os endpoints
- **Logs de auditoria** para todas as operações

## Deploy e Manutenção

### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  
  api-gateway:
    build: ./backend
    ports:
      - "8000:8000"
  
  yolov8-api:
    build: ./python-services/yolov8
    ports:
      - "8001:8001"
  
  opencv-api:
    build: ./python-services/opencv
    ports:
      - "8002:8002"
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: pharma_analysis
    ports:
      - "3306:3306"
```

### Monitoramento
- **Health checks** para todos os serviços
- **Métricas de performance** das APIs
- **Logs centralizados** com ELK Stack
- **Alertas** para falhas e baixa performance

## Próximos Passos

1. **Implementação das APIs Python** com código completo
2. **Testes automatizados** para todas as funcionalidades
3. **Documentação da API** com Swagger/OpenAPI
4. **Scripts de deploy** automatizado
5. **Treinamento de modelos** específicos para farmacêutica brasileira