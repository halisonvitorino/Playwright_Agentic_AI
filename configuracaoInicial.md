# Configuração Inicial para Playwright

## Pr�-requisitos

- **Node.js** (versão = 18) instalado.  
  Voce ja tem o Node.js v24.18.0, portanto esse requisito esta satisfeito.

## 1. Instalar o runner de testes do Playwright

Execute no diretório do seu projeto:

```bash
npm install -D @playwright/test
```

**Se encontrar erros de permissao (EPERM) ao escrever no `.npmrc` ou no cache:**  
Defina variaveis de ambiente para usar um cache e um arquivo de configura��o locais dentro do projeto antes de rodar o comando:

```cmd
set NPM_CACHE=%cd%\npm_cache
set NPM_CONFIG_USERCONFIG=%cd%\npmrc
npm install -D @playwright/test
```

_(No PowerShell, use `$env:NPM_CACHE = "$(pwd)\npm_cache"` e `$env:NPM_CONFIG_USERCONFIG = "$(pwd)\npmrc"` antes do `npm install`.)_

## 2. Instalar os navegadores necess�rios

Depois de instalar o pacote, baixe os navegadores que o Playwright vai usar:

```bash
npx playwright install
```

Isso baixar Chromium, Firefox e WebKit (pode levar alguns minutos, dependendo da conex�o).

## 3. (Opcional) Criar arquivo de configuracao

O Playwright funciona sem configura��o, mas voc� pode querer ajustar op��es. Crie um arquivo `playwright.config.ts` ou `playwright.config.js` na raiz do projeto. Exemplo simples:

```js
// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
};
```

## 4. Criar seu primeiro teste

Dentro da pasta `tests` (ou outra que voc� configure), crie um arquivo de teste, por exemplo `tests/example.test.js`:

```js
const { test, expect } = require("@playwright/test");

test("t�tulo da p�gina", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
});
```

## 5. Executar os testes

Para rodar todos os testes:

```bash
npx playwright test
```

Para executar em modo headed (visualizando o navegador):

```bash
npx playwright test --headed
```

Para ver o relat�rio HTML ap�s a execu��o:

```bash
npx playwright show-report
```

## 6. Gerar testes com o gravador (opcional)

Voc� pode usar o gerador de testes para gravar intera��es e criar testes automaticamente:

```bash
npx playwright codegen https://playwright.dev/
```

## Resumo r�pido dos comandos

```bash
# 1. Instalar depend�ncia (ajuste de permiss�o se necess�rio)
set NPM_CACHE=%cd%\npm_cache
set NPM_CONFIG_USERCONFIG=%cd%\npmrc
npm install -D @playwright/test

# 2. Instalar navegadores
npx playwright install

# 3. Criar teste (exemplo acima)

# 4. Executar testes
npx playwright test
```

Com esses passos, seu ambiente estar� pronto para desenvolver e executar testes end-to-end usando Playwright. Boa sorte nos testes! ??

---

## Scripts disponíveis no package.json:

"scripts": {
"test": "playwright test",
"test:headed": "playwright test --headed",
"test:ui": "playwright test --ui",
"test:report": "playwright show-report",
"codegen": "playwright codegen"
}

## Como usar cada script:

1. Executar todos os testes (modo headless):
   npm test
   ou
   npm run test

2. Executar em modo headed (visualizando o navegador):
   npm run test:headed

3. Abrir a interface do Playwright UI Mode (para explorar testes interativamente):
   npm run test:ui

4. Visualizar o relatório HTML após a execução:
   npm run test:report

5. Gerar testes usando o gravador de código:
   npm run codegen https://exemplo.com

## Observações importantes:

- Todos os comandos usam npx implicitamente através do npm run
- Os scripts são multiplataforma (funcionam no Windows, macOS e Linux)
- Você pode passar argumentos adicionais para qualquer script, por exemplo:

  npm test -- --grep "@login" # Executa apenas testes com a marca @login
  npm run test:headed -- --project=chromium # Executa apenas no Chromium

Com esses scripts configurados, você tem um conjunto completo de comandos para desenvolver, executar e visualizar seus
testes Playwright de forma eficiente. 🚀

---

## Install Playwright MCP Server:

https://github.com/microsoft/playwright-mcp

---

## Prompts:

https://github.com/tayyabakmal1/qa-prompt-library/tree/main

## First run prompt

Perform end to end QA workflow and MCP i have defined in current prompt file E2EPromptFile.md . Perform the QA work flow step by step defined in this prompt file.

## Test run prompt

Perform end to end QA tests i have defined in current prompt file prompt-execucao-testes.md . Perform the QA work flow step by step defined in this prompt file.

## Faker

npm install @faker-js/faker --save-dev
