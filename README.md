# AgroMercantil

Projeto desenvolvido como parte da **avaliação técnica para a vaga de Desenvolvedor Front-End**, implementando um sistema completo de gestão de produtos agrícolas, com:

- **Frontend** em React
- **Backend** em Django REST Framework
- **Gerenciamento de estado** com Redux Toolkit
- **Autenticação JWT**
- **Testes unitários** no frontend e backend
- **Dockerização e Deploy** com Docker Compose

## Repositório

O código-fonte está disponível em:

- [https://github.com/FelipeDevFS/AGROMERCANTIL](https://github.com/FelipeDevFS/AGROMERCANTIL)

## Estrutura do Projeto

```
agro-frontend/      # Interface do usuário em React
├── public/
├── src/
│   ├── api.js           # Configuração do Axios
│   ├── App.js           # Componente principal
│   ├── Login.js         # Autenticação
│   ├── components/      # Componentes UI (modais, botões, etc.)
│   ├── features/        # Lógica de negócio e estado
│   │   └── products/
│   │       ├── ProductList.js  # Componente para gestão de produtos
│   │       └── productsSlice.js # Reducer e ações Redux
│   |
│   └── ProductList.test.js # Testes do ProductList
└── package.json

agro-backend/       # API em Django
├── manage.py
├── requirements.txt
├── backend/
│   ├── settings.py  # Configurações
│   └── urls.py      # Rotas principais
├── products/
│   ├── models.py    # Modelo Product
│   ├── views.py     # Lógica da API
│   ├── urls.py      # Rotas da API
│   └── tests.py     # Testes
└── <outros arquivos>
```

## Tecnologias Utilizadas

- **React**, **React Router DOM**, **Redux Toolkit**, **Bootstrap**
- **Axios** com Interceptor para token JWT
- **Django**, **Django REST Framework**, **Simple JWT**
- **Jest** e **React Testing Library** para testes
- **Docker e Docker Compose** para ambiente de produção
- **ELK Stack** para logs e monitoramento

## Como Executar

### Back-End (Django)

```bash
git clone https://github.com/FelipeDevFS/AGROMERCANTIL.git
cd agro-backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

(Opcional)
```bash
python manage.py seed_data      # Popular banco com dados
python manage.py test           # Executar testes unitários
```

### Front-End (React)

```bash
cd agro-frontend
npm install
npm start
```

(Opcional)
```bash
npm test      # Executar testes unitários
```

## Funcionalidades Implementadas

### 1. Interface em React
- Tabela responsiva com produtos
- Criação e exclusão via modais

### 2. Integração Front e Back-End
- API com endpoints para CRUD
- Validações no backend
- CORS configurado

### 3. Testes Unitários
- Backend: testes no CRUD
- Frontend: fluxo de login e produtos

### 4. Autenticação JWT
- Login com token
- Proteção de rotas
- Axios Interceptor

### 5. Design Responsivo
- Layout adaptado a dispositivos

### 6. Estado Global
- Redux Toolkit para produtos e autenticação

### 7. Cache e Performance
- Cache com `django.core.cache`
- Lazy loading + React Window

### 8. Logs e Monitoramento
- Logs estruturados
- Integração com ELK Stack

### 9. Docker e Deploy
- Dockerfiles separados (frontend/backend)
- Docker Compose para orquestração

### 10. Desafio Extra
- Deploy completo documentado

## Decisões Técnicas

- **Axios com Interceptor**: centraliza autenticação e erros
- **React Router DOM**: controle de rotas privadas
- **Redux Toolkit**: gestão simples e eficiente de estado
- **Testing Library & Jest**: cobertura de funcionalidades essenciais

## Testes

- **Backend**: `products/tests.py`
- **Frontend**: `src/ProductList.test.js`

## Contato

- Email: felipeolcarvalho1@gmail.com
- GitHub: [FelipeDevFS](https://github.com/FelipeDevFS/AGROMERCANTIL)
