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
   ├── views.py         # Views da API (List, Create, Delete)
   ├── urls.py          # Rotas da app products
   └── tests.py         # Testes unitários da API
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
     venv\Scriptsctivate
     ```
   - No Linux/macOS:
     ```bash
     source venv/bin/activate
     ```
3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
   > Se `requirements.txt` não existir, gere-o:
   > ```bash
   > pip freeze > requirements.txt
   > ```
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
   O back‑end estará disponível em: `http://127.0.0.1:8000/`

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
   O front‑end estará disponível em: `http://localhost:3000/`
4. (Opcional) Execute os testes unitários do frontend:
   ```bash
   npm test
   ```

## Progresso e Competências

### Questão 1: Interface em React — ✅ Concluída
- Construção da interface usando React e Bootstrap.
- Tabela de produtos, criação e exclusão via modal de confirmação.
- Dados mockados inicialmente, substituídos pela API.

### Questão 2: Integração Front‑End e Back‑End — ✅ Concluída
- API em Django com endpoints para listar, adicionar e excluir produtos.
- Validações no backend para campos obrigatórios.
- Configuração de CORS para comunicação entre frontend e backend.
- Integração via `fetch` e testes unitários da API.

### Questão 3: Testes de Componentes em React — ✅ Concluída
- Testes unitários com Jest e React Testing Library.
- Cobertura de renderização, adição e exclusão de produtos.
- Uso de mocks para simular chamadas à API.

### Questão 4: Autenticação e Autorização — ✅ Concluída
- Implementação de JWT no Django com `djangorestframework-simplejwt`.
- Proteção das rotas de API com `permissions.IsAuthenticated`.
- Endpoint `/api/login/` para emissão de tokens JWT.
- Interceptor Axios no frontend para gerenciar header `Authorization`.
- Rotas seguras com `react-router-dom` para `/login` e `/products`.

> **Desafios e Soluções**
> - *Erro de migração* (`no such table: auth_user`): resolvido executando `python manage.py migrate` até completar todas as migrações.
> - *Problema de 401 no frontend*: implementado interceptor no Axios para anexar token JWT nas requisições.
> - *Alerts nativos para erros*: planejado substituí-los por modais personalizados para melhorar UX.

### Próximas Tarefas — ☐ Em Andamento
- **Questão 5: Estilização Responsiva** — Adaptar telas para diferentes tamanhos.
- **Questão 6: Gerenciamento de Estado Global** — Avaliar Context API ou Redux.
- **Questão 7: Implementação de Cache** — Cache de resultados no backend (Redis/Django cache).
- **Questão 8: Otimização de Performance** — Lazy loading e memoization no frontend.
- **Questão 9: Monitoramento e Logs** — Configurar Sentry e logs estruturados no backend.
- **Questão 10: Deploy em Produção** — Dockerização e CI/CD.
- **Desafio Extra**: Deploy com Docker Compose e documentação de infraestrutura.

## Decisões Técnicas
- **Axios com Interceptor**: centraliza requisições HTTP, gerencia `Authorization` e trata erros globalmente.
- **React Router**: controla rotas públicas e privadas (login vs. área de produtos).
- **Testing Library & Jest**: foco em testes de integração de componentes e lógica de autenticação.

## Testes

- **Backend**: testes unitários em `products/tests.py` cobrindo CRUD de produtos.
- **Frontend**: testes em `agro-frontend/src/__tests__/` cobrindo fluxo de login e gestão de produtos.

## Contato

Em caso de dúvidas ou sugestões, entre em contato:

- Email: `felipeolcarvalho1@gmail.com`
- GitHub: https://github.com/FelipeDevFS/AGROMERCANTIL