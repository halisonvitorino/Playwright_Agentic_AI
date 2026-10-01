# Test Plan: SignIn Flow (Login)

## 📋 Overview

Test plan for the user login functionality based on user story feat-002.md.
Tests cover the login flow including validation, authentication, and navigation.

## 🎯 Test Objectives

- Validate login form fields and validation rules
- Test successful login with valid credentials
- Verify error handling for invalid/missing data
- Ensure proper navigation after login/logout
- Confirm security considerations are met

## 📝 Test Scenarios

### CENÁRIO 1 - LOGIN COM SUCESSO

**Test Case ID:** TC_LOGIN_001  
**Title:** Login com dados válidos  
**Description:** Verificar que um usuário cadastrado pode fazer login com sucesso usando credenciais válidas  
**Precondition:** Usuário já cadastrado no sistema (dados de teste pré-definidos)  
**Test Data:**

- Email: usuario@teste.com
- Senha: Senha123!

**Steps:**

1. Dado que o usuário está na página inicial (https://bugbank.netlify.app/)
2. Quando preenche o campo "E-mail" com "usuario@teste.com"
3. E preenche o campo "Senha" com "Senha123!"
4. E clica no botão "Acessar"
5. Então é redirecionado para a dashboard page
6. E o URL da página contém indicadores de dashboard (ex: não contém "/login")

**Expected Result:** Usuário é autenticado com sucesso e redirecionado para o dashboard

### CENÁRIO 2 - CAMPOS OBRIGATÓRIOS VAZIOS

**Test Case ID:** TC_LOGIN_002  
**Title:** Login com campos obrigatórios em branco  
**Description:** Verificar que o sistema impede o login quando campos obrigatórios estão vazios  
**Precondition:** Usuário na página de login  
**Test Data:** Campos vazios

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando deixa o campo "E-mail" em branco
3. E deixa o campo "Senha" em branco
4. E tenta submeter o formulário clicando em "Acessar"
5. Então o sistema não deve permitir a submissão
6. E deve exibir a mensagem de erro "É campo obrigatório" ao lado do campo E-mail
7. E deve exibir a mensagem de erro "É campo obrigatório" ao lado do campo Senha
8. E o usuário deve permanecer na página de login

**Expected Result:** Submissão bloqueada, mensagens de exibição de erro específicas para cada campo vazio

### CENÁRIO 3 - E-MAIL INVÁLIDO

**Test Case ID:** TC_LOGIN_003  
**Title:** Login com e-mail no formato incorreto  
**Description:** Verificar que o sistema rejeita emails com formato inválido  
**Precondition:** Usuário na página de login  
**Test Data:**

- Email: emailinválido (sem @)
- Senha: Senha123!

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando preenche o campo "E-mail" com "emailinválido"
3. E preenche o campo "Senha" com "Senha123!"
4. E tenta submeter o formulário clicando em "Acessar"
5. Então o sistema deve exibir a mensagem de erro de formato de email inválido
6. E o sistema não deve permitir a submissão
7. E o usuário deve permanecer na página de login

**Expected Result:** Submissão bloqueada, mensagem de erro de formato de email exibida

### CENÁRIO 4 - SENHA INCORRETA

**Test Case ID:** TC_LOGIN_004  
**Title:** Login com senha incorreta  
**Description:** Verificar que o sistema rejeita senhas incorretas para um email válido  
**Precondition:** Usuário na página de login, email válido cadastrado  
**Test Data:**

- Email: usuario@teste.com
- Senha: SenhaErrada456!

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando preenche o campo "E-mail" com "usuario@teste.com"
3. E preenche o campo "Senha" com "SenhaErrada456!"
4. E tenta submeter o formulário clicando em "Acessar"
5. Então o sistema deve exibir mensagem de erro de autenticação falhada
6. E o sistema não deve permitir a submissão
7. E o usuário deve permanecer na página de login

**Expected Result:** Submissão bloqueada, mensagem de erro de credenciais inválidas exibida

### CENÁRIO 5 - CAMPO E-MAIL VAZIO

**Test Case ID:** TC_LOGIN_005  
**Title:** Login com campo email vazio e senha preenchida  
**Description:** Verificar validação quando apenas o email está vazio  
**Precondition:** Usuário na página de login  
**Test Data:**

- Email: (vazio)
- Senha: Senha123!

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando deixa o campo "E-mail" em branco
3. E preenche o campo "Senha" com "Senha123!"
4. E tenta submeter o formulário clicando em "Acessar"
5. Então o sistema deve exibir a mensagem de erro "É campo obrigatório" ao lado do campo E-mail
6. E o sistema não deve permitir a submissão
7. E o usuário deve permanecer na página de login

**Expected Result:** Submissão bloqueada, mensagem de erro apenas para o campo email vazio

### CENÁRIO 6 - CAMPO SENHA VAZIO

**Test Case ID:** TC_LOGIN_006  
**Title:** Login com campo senha vazio e email preenchido  
**Description:** Verificar validação quando apenas a senha está vazia  
**Precondition:** Usuário na página de login  
**Test Data:**

- Email: usuario@teste.com
- Senha: (vazio)

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando preenche o campo "E-mail" com "usuario@teste.com"
3. E deixa o campo "Senha" em branco
4. E tenta submeter o formulário clicando em "Acessar"
5. Então o sistema deve exibir a mensagem de erro "É campo obrigatório" ao lado do campo Senha
6. E o sistema não deve permitir a submissao
7. E o usuário deve permanecer na página de login

**Expected Result:** Submissão bloqueada, mensagem de erro apenas para o campo senha vazio

### CENÁRIO 7 - E-MAIL COM FORMATO PARCIALMENTE VÁLIDO

**Test Case ID:** TC_LOGIN_007  
**Title:** Login com e-mail faltando domínio ou TLD  
**Description:** Verificar validação de formatos de email parcialmente válidos  
**Precondition:** Usuário na página de login  
**Test Data:**

- Email variants: "usuario@", "@dominio.com", "usuario.dominio"
- Senha: Senha123!

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando preenche o campo "E-mail" com um dos formatos inválidos acima
3. E preenche o campo "Senha" com "Senha123!"
4. E tenta submeter o formulário clicando em "Acessar"
5. Então o sistema deve exibir mensagem de erro de formato de email
6. E o sistema não deve permitir a submissão
7. E o usuário deve permanecer na página de login

**Expected Result:** Submissão bloqueada para cada formato de email inválido testado

### CENÁRIO 8 - NAVEGAÇÃO PARA REGISTRO

**Test Case ID:** TC_LOGIN_008  
**Title:** Navegação da tela de login para tela de registro  
**Description:** Verificar que o usuário pode navegar para a tela de registro  
**Precondition:** Usuário na página de login  
**Test Data:** Nenhum

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando clica no botão "Registrar"
3. Então o usuário é redirecionado para a tela de registro
4. E o formulário de registro é exibido com campos para Nome, E-mail, Senha e Confirmação de Senha
5. E o botão "Voltar ao login" está visível e funcionando

**Expected Result:** Usuário consegue navegar para tela de registro e retornar ao login

### CENÁRIO 9 - VISIBILIDADE DA SENHA

**Test Case ID:** TC_LOGIN_009  
**Title:** Toggle de visibilidade da senha  
**Description:** Verificar que o ícone de olho alterna a visibilidade da senha  
**Precondition:** Usuário na página de login  
**Test Data:**

- Email: usuario@teste.com
- Senha: Senha123!

**Steps:**

1. Dado que o usuário está na página inicial
2. Quando preenche o campo "Senha" com "Senha123!"
3. E o campo de senha está no estado oculto (padrão)
4. Quando clica no ícone do olho ao lado do campo senha
5. Então a senha torna-se visível (mostrando os caracteres em texto plano)
6. Quando clica novamente no ícone do olho
7. Então a senha retorna ao estado oculto (mostrando apenas bullets ou pontos)

**Expected Result:** O ícone do olho funciona como toggle para mostrar/ocultar a senha

### CENÁRIO 10 - REDIRECIONAMENTO AUTOMÁTICO PARA LOGIN

**Test Case ID:** TC_LOGIN_010  
**Title:** Acesso a página restrita sem autenticação redireciona para login  
**Description:** Verificar que usuários não autenticados tentando acessar páginas protegidas são redirecionados para login  
**Precondition:** Nenhuma sessão ativa  
**Test Data:** Nenhum

**Steps:**

1. Dado que o usuário não está autenticado
2. Quando tenta acessar diretamente uma página que requer autenticação (ex: tentando acessar /dashboard diretamente)
3. Então o sistema deve redirecionar automaticamente para a página de login
4. E o URL da pagina deve ser a página de login (https://bugbank.netlify.app/)
5. E o formulário de login deve estar visível e pronto para uso

**Expected Result:** Usuário não autenticado é redirecionado para login ao tentar acessar recursos protegidos

## 📊 Test Data Summary

### Valid Credentials (for positive tests)

- Email: usuario@teste.com
- Senha: Senha123!

### Invalid Email Formats (for negative tests)

- "" (vazio)
- "usuario@" (faltando domínio)
- "@dominio.com" (faltando usuario)
- "usuario.dominio" (faltando @)
- "usuario@dominio" (faltando TLD)
- "usuario@@dominio.com" (@ duplicado)

### Invalid Password Scenarios (for negative tests)

- "" (vazio)
- "senha123" (sem letra maiúscula, se aplicável)
- "SENHA123" (sem letra minúscula, se aplicável)
- "Senha" (muito curta, se aplicável)
- "Senha123!" (válida, para contraste)

## 🔧 Test Environment

- **Application URL:** https://bugbank.netlify.app/
- **Browser:** Chrome (headless and headed modes)
- **Test Framework:** Playwright
- **Language:** JavaScript/TypeScript

## 📌 Assumptions

1. O sistema utiliza validação HTML5 nativa para campos de tipo email
2. Mensagens de erro são exibidas em elementos com classe "input\_\_warging"
3. O sistema não possui backend real - todas as validações são frontend/local
4. Não há persistência de sessão entre testes (cada teste começa em estado limpo)
5. O dashboard é acessivel apenas após login bem-sucedido

## 🚪 Entry and Exit Criteria

**Entry Criteria:**

- Aplicação está disponivel em https://bugbank.netlify.app/
- Credenciais de teste válidas estão disponiveis ou podem ser criadas
- Ambiente de teste configurado com Playwright

**Exit Criteria:**

- Todos os casos de teste executados
- Resultados documentados
- Falhas identificadas e reportadas
- Cobertura de teste atendendo aos criterios de aceite

---

_Test Plan criado baseado na user story feat-002.md e exploração inicial da aplicação_
