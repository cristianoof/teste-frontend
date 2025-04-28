# Backend API - Cadastro de Desenvolvedores

API Node.js para cadastrar e listar desenvolvedores.

## Tecnologias

- Node.js
- Express
- TypeScript
- MongoDB
- Docker

## Pré-requisitos

- Node.js (v18 ou superior)
- NPM ou Yarn
- Docker e Docker Compose (para ambiente containerizado)
- MongoDB (local ou containerizado)

## Instalação e Execução

### Ambiente de Desenvolvimento Local

Após ter baixado os arquivos enviados no PR ou clonado o repositório https://github.com/cristianoof/teste-frontend, siga os passos abaixo:

**Observação: Para facilitar recomenda-se rodar a stack backend com docker-compose, as instruções estão abaixo**

1. Navegue até a pasta do projeto:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em http://localhost:3000

### Ambiente de Produção (Build)

1. Gere o build da aplicação:

```bash
npm run build
```

2. Inicie a aplicação:

```bash
npm start
```

### Utilizando Docker

1. Inicie a aplicação e o MongoDB com Docker Compose:

```bash
docker-compose up -d --build
```

Isso irá:

- Iniciar um container MongoDB disponível na porta 27017
- Construir e iniciar o container da API disponível na porta 3000
- Configurar uma rede Docker para comunicação entre os containers

2. Para parar os containers:

```bash
docker-compose down
```

## Variáveis de Ambiente

Ao utilizar o Docker Compose, as seguintes variáveis de ambiente já estão configuradas:

- PORT=3000
- MONGO_URI=mongodb://mongodb:27017/theosDB

## Estrutura do Projeto

A aplicação é construída com TypeScript e os arquivos fonte estão localizados no diretório `src/`.

## Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento com hot-reload
- `npm run build` - Compila o código TypeScript para JavaScript
- `npm start` - Executa a versão compilada da aplicação
