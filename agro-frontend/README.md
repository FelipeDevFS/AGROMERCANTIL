
# AgroMercantil

Projeto desenvolvido como parte da avaliação técnica para a vaga de Desenvolvedor Front‑End, implementando um sistema de gestão de produtos agrícolas com frontend em React e backend em Django.

## Repositório

O código-fonte completo está disponível em:

- https://github.com/FelipeDevFS/AGROMERCANTIL

## Estrutura do Projeto

```
agro-frontend/      # Aplicação React para interface do usuário
├── public/
├── src/
│   ├── api.js           # Configuração do Axios com interceptor
│   ├── App.js           # Componente principal com roteamento
│   ├── ProductList.js   # Componente para listar e gerenciar produtos
│   ├── Login.js         # Componente para autenticação
│   └── components/      # Componentes de UI (modais, botões etc.)
└── package.json

agro-backend/       # API em Django para gerenciar produtos
├── manage.py
├── requirements.txt
├── backend/
│   ├── settings.py      # Configurações do Django (incluindo CORS e JWT)
│   └── urls.py          # Rotas principais da API
├── products/
│   ├── models.py        # Modelo Product
│   ├── views.py         # Views da API (List, Create, Delete)
│   ├── urls.py          # Rotas da app products
│   └── tests.py         # Testes unitários da API
└── <outros arquivos Django>
```

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **Python 3.8** ou superior
- **pip**
- **Git**

## Como Executar

### Back‑End (Django)

1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/FelipeDevFS/AGROMERCANTIL.git
   cd agro-backend
   ```
2. Ative o ambiente virtual:
   - No Windows:
     ```bash
     venv\Scripts\activate
     ```
   - No Linux/macOS:
     ```bash
     source venv/bin/activate
     ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
4. Aplique as migrações:
   ```bash
   python manage.py migrate
   ```
5. (Opcional) Popule o banco de dados com dados iniciais:
   ```bash
   python manage.py seed_data
   ```
6. Crie um superusuário para testes:
   ```bash
   python manage.py createsuperuser
   ```
7. Inicie o servidor Django:
   ```bash
   python manage.py runserver
   ```

8. (Opcional) Execute os testes unitários do backend:
   ```bash
   python manage.py test
   ```

### Front‑End (React)

1. Navegue até a pasta do front‑end:
   ```bash
   cd agro-frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

4. (Opcional) Execute os testes unitários do frontend:
   ```bash
   npm test
   ```

## Progresso e Competências

### Questão 1: Interface em React — ✅ Concluída
- Construção da interface usando React e Bootstrap.
- Tabela de produtos, criação e exclusão via modal de confirmação.

### Questão 2: Integração Front‑End e Back‑End — ✅ Concluída
- API em Django com endpoints para listar, adicionar e excluir produtos.
- Validações no backend para campos obrigatórios.
- Configuração de CORS para comunicação entre frontend e backend.

### Questão 3: Testes de Componentes em React — ✅ Concluída
- Testes unitários com Jest e React Testing Library.
- Cobertura de renderização, adição e exclusão de produtos.

### Questão 4: Autenticação e Autorização — ✅ Concluída
- JWT com `djangorestframework-simplejwt`.
- Interceptor Axios no frontend para token.
- Rotas protegidas no React com `react-router-dom`.

### Questão 5: Estilização Responsiva — ✅ Concluída
- Design adaptado para desktop e mobile.

### Questão 6: Gerenciamento de Estado Global — ✅ Concluída
- Redux Toolkit para centralizar estado dos produtos e autenticação.

### Questão 7: Implementação de Cache — ✅ Concluída
- Uso de cache com `django.core.cache` para otimizar performance.

### Questão 8: Otimização de Performance — ✅ Concluída
- Lazy loading de componentes.
- Uso de `React-Window` e otimização de renderizações.

### Questão 9: Monitoramento e Logs — ✅ Concluída
- Logs estruturados no backend.
- Implementação do ELK Stack para rastreio de erros.

### Questão 10: Deploy em Produção — ✅ Concluída
- Dockerização com dois Dockerfiles (frontend e backend).
- Orquestração com Docker Compose.

### Desafio Extra — ✅ Concluído
- Deploy completo com Docker Compose.
- Documentação de infraestrutura no repositório.

## Decisões Técnicas

- **Axios com Interceptor**: centraliza requisições HTTP, gerencia `Authorization` e trata erros globalmente.
- **React Router**: controla rotas públicas e privadas.
- **Redux Toolkit**: gerenciamento centralizado de estado.
- **Testing Library & Jest**: foco em testes de integração de componentes e lógica de autenticação.

## Testes

- **Backend**: testes unitários em `products/tests.py` cobrindo CRUD de produtos.
- **Frontend**: testes em `agro-frontend/src/__tests__/` cobrindo fluxo de login e gestão de produtos.

## Contato

Em caso de dúvidas ou sugestões, entre em contato:

- Email: `felipeolcarvalho1@gmail.com`
- GitHub: https://github.com/FelipeDevFS/AGROMERCANTIL
