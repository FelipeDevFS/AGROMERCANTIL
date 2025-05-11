# AgroMercantil

Projeto desenvolvido como parte da avaliação técnica para a vaga de Desenvolvedor Front-End. Este projeto implementa um sistema de gestão de produtos agrícolas, com um frontend em React e um backend em Django, conforme os requisitos do desafio técnico.

## Estrutura do Projeto

- `agro-frontend/`: Contém a aplicação React para a interface do usuário.
- `agro-backend/`: Contém a API em Django para gerenciar os produtos.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **Python 3.8** ou superior
- **pip**
- **Git**

## Como Executar

### Back-End (Django)

1. Clone o repositório e entre na pasta:
   ```bash
   git clone <URL_DO_REPOSITORIO>
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
   > Se o arquivo `requirements.txt` não existir, gere-o com:
   > ```bash
   > pip freeze > requirements.txt
   > ```
4. Aplique as migrações para criar o banco de dados:
   ```bash
   python manage.py migrate
   ```
5. (Opcional) Popule o banco de dados com dados iniciais:
   ```bash
   python manage.py seed_data
   ```
6. Inicie o servidor Django:
   ```bash
   python manage.py runserver
   ```
   O back-end estará disponível em: `http://127.0.0.1:8000/`

### Front-End (React)

1. Navegue até a pasta do front-end:
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
   O front-end estará disponível em: `http://localhost:3000/`

4. (Opcional) Execute os testes unitários:
   ```bash
   npm test
   ```

## Progresso

### Questão 1: Construção da Interface em React - ✅ Concluída

- Implementei a interface com React, usando Bootstrap para estilização inicial.
- A interface inclui uma tabela de produtos, um botão para adicionar novos produtos e um modal de confirmação para exclusão.
- Inicialmente, usei dados mockados, que foram substituídos pela API real na Questão 2.

### Questão 2: Integração Front-End e Back-End - ✅ Concluída

- Criei uma API em Django com endpoints para listar, adicionar e excluir produtos.
- Adicionei validações para impedir produtos sem nome ou preço.
- Configurei o CORS para permitir a comunicação entre o frontend e o backend.
- A integração com o frontend foi feita usando `fetch`.
- Escrevi testes unitários para a API e adicionei um script para popular o banco de dados.

### Questão 3: Teste de Componentes em React - ✅ Concluída

- Escrevi testes unitários para o componente `ProductList` usando Jest e Testing Library.
- Os testes cobrem a renderização da tabela, exclusão e adição de produtos.
- Usei mocks para simular chamadas à API.

## Estrutura de Diretórios

```
agro-frontend/
├── public/
├── src/
└── package.json

agro-backend/
├── manage.py
├── requirements.txt
└── <outros arquivos Django>
```

## Contato

Em caso de dúvidas, entre em contato pelo email: seu.email@dominio.com
