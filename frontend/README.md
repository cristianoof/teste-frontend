# Frontend - Cadastro de Desenvolvedores

Frontend desenvolvido com Angular 19 para cadastrar e listar desenvolvedores.

## Tecnologias

- Node.js
- Angular 19
- Angular Material (Dialog)
- RxJS
- TypeScript
- Karma (para testes)
- Jasmine (para testes)

## Pré-requisitos

- Node.js (v18 ou superior)
- NPM
- Angular CLI (v19.2)

## Instalação e Execução

### Ambiente de Desenvolvimento Local

Após ter baixado os arquivos enviados no PR ou clonado o repositório https://github.com/cristianoof/teste-frontend, siga os passos abaixo:

1. Navegue até a pasta do projeto:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Execute em modo de desenvolvimento:

```bash
npm start
```

ou

```bash
ng serve
```

A aplicação estará disponível em http://localhost:4200

### Gerar Build da aplicação

1. Gere o build da aplicação:

```bash
ng build
```

### Executando os testes unitários

1. Para rodar os testes unitários com Karma:

```bash
ng test
```

## Estrutura do Projeto

A aplicação é construída com Angular 19 e TypeScript e os arquivos fonte estão localizados no diretório `src/`.

## Scripts Disponíveis

- `npm start` ou `ng serve` - Executa em modo de desenvolvimento com hot-reload
- `npm run build` ou `ng build` - Compila o código TypeScript para JavaScript
- `npm test` ou `ng test` - Executa os testes unitários
