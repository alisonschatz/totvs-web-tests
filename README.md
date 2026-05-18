# totvs-web-tests

Suite de testes automatizados para a plataforma [automationexercise.com](https://automationexercise.com), composta por três cenários:
 
- **Registro E2E** — automatiza o fluxo completo de criação de conta com dados dinâmicos, validando a mensagem de sucesso "ACCOUNT CREATED!"
- **Carrinho de compras** — adiciona 4 unidades de um produto e valida se a quantidade e o valor total estão corretos no resumo da compra
- **API de produtos** — valida o endpoint `GET /api/productsList`, confirmando status 200 e que a lista retornada contém produtos com estrutura válida

## Tecnologias

- **JavaScript** (Node.js 18+)
- **Playwright** — automação de browser e requisições HTTP
- **@faker-js/faker** — geração de dados dinâmicos por execução

## Estrutura

```
totvs-web-tests/
├── pages/
│   ├── base.page.js          # Helpers compartilhados (POM base)
│   ├── home.page.js
│   ├── signup-login.page.js
│   ├── register.page.js
│   ├── products.page.js
│   └── cart.page.js
├── support/
│   ├── reporter.js           # Reporter customizado para terminal
│   └── user.factory.js       # Fábrica de dados de teste
├── tests/
│   ├── registration.spec.js  # Fluxo E2E de registro
│   ├── cart.spec.js          # Carrinho e validação de inventário
│   └── api-products.spec.js  # GET /api/productsList
└── playwright.config.js
```

## Instalação

```bash
npm install
npx playwright install chromium
```

## Como usar

```bash
# Todos os testes
npm test

# Por escopo
npm run test:registration
npm run test:cart
npm run test:api

# Com interface visual
npm run test:headed       # abre o browser durante a execução
npm run test:ui           # UI Mode do Playwright (recomendado para debug)

# Relatório HTML
npm run report
```
---

This is a challenge by Coodesh