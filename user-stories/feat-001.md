# User Story: SignUp Flow

## 📌 História de Usuário (User Story)

**Título:** Cadastro de Usuário
**Como** um usuário sem cadastro no sistema,  
**Eu quero** poder me Cadastrar (com nome, e-mail, senha etc.) através da opção Registrar,  
**Para** obter acesso perante o sistema.

---

## Application URL

https://bugbank.netlify.app/

---

### 🧾 Critérios de Aceite (Acceptance Criteria)

1. **Acesso Restrito:** Usuários não autenticados são redirecionados para a tela de login.
2. **Campos Obrigatórios:** Todos os campos do formulário são obrigatórios e devem ser validados no front-end.
3. **Validação de Formato:** Os campos devem respeitar os formatos esperados (ex: e-mail válido, nome, etc.).
4. **Sucesso:** Ao preencher todos os campos corretamente e submeter, o sistema deve exibir mensagem de sucesso.
5. **Erros:** Caso algum campo obrigatório esteja vazio ou inválido, o sistema deve exibir mensagens de erro específicas.

---

# FEATURE: CADASTRO DE NOVO USUÁRIO

Feature: Cadastro de Novo Usuário
Como um usuário sem acesso ao sistema
Eu quero poder me Cadastrar através da opção Registrar via home page
Para obter acesso ao sistema

Background:
Dado que o usuário está na página Cadastrar
E clica no botão Registrar

# CENÁRIO 1 - CAMINHO FELIZ

Cenário: Cadastro com dados válidos
Dado que o usuário está na página Cadastrar
Quando preenche todos os campos obrigatórios com dados válidos:
E clica no botão Cadastrar
Então o sistema deve exibir a mensagem de sucesso
E é redirecionado para home page

# CENÁRIO 2 - CAMPOS OBRIGATÓRIOS VAZIOS

Cenário: Submeter formulário com campos obrigatórios em branco
Dado que o usuário está na página Cadastrar
Quando deixa campos obrigatórios em branco
E clica no botão Cadastrar
Então o sistema não deve permitir a submissão
E deve exibir mensagens de erro ao lado de cada campo vazio

# CENÁRIO 3 - E-MAIL INVÁLIDO

Cenário: Tentar atualizar com e-mail no formato incorreto
Dado que o usuário está na página Cadastrar
Quando preenche todos os campos obrigatórios com dados válidos
E preenche o campo E-mail sem @
E clica no botão Cadastrar
Então o sistema deve exibir a mensagem de erro
E o formulário não deve ser enviado

# CENÁRIO 4 - CAMPOS COM APENAS ESPAÇOS EM BRANCO

Cenário: Preencher campos com espaços em branco
Dado que o usuário está na página Cadastrar
Quando preenche o campo Nome com (apenas espaços)
E preenche os demais campos obrigatórios com dados válidos
E clica no botão Cadastrar
Então o sistema deve considerar o campo como vazio
E deve exibir a mensagem de erro O campo Nome é obrigatório
E o formulário não deve ser enviado

# CENÁRIO 5 - CARACTERES ESPECIAIS NO NOME

Cenário: Nome contendo caracteres especiais ou números
Dado que o usuário está na página Cadastrar
Quando preenche o campo Nome com João123!
E preenche os demais campos obrigatórios com dados válidos
E clica no botão Cadastrar
Então o sistema deve exibir a mensagem de erro
E o formulário não deve ser enviado

# CENÁRIO 6 - TAMANHO MÁXIMO EXCEDIDO

Cenário: Exceder limite de caracteres em campo
Dado que o usuário está na página Cadastrar
Quando preenche o campo Nome com um texto de 300 caracteres
E preenche os demais campos obrigatórios com dados válidos
E clica no botão Cadastrar
Então o sistema deve exibir a mensagem de erro
E o formulário não deve ser enviado

# CRITÉRIOS DE ACEITE

Regra: Todos os campos são obrigatórios

---

## Technical Notes

- Use Playwright for test automation
- Test across Chrome
- Ensure responsiveness in checkout flow
- Validate all form validation messages
- Test navigation flow and back button behavior

## Definition of Done

- [ ] All acceptance criteria have test cases
- [ ] Manual exploratory testing completed
- [ ] Automated test scripts created and passing
- [ ] Test results documented
- [ ] Bugs logged for any failures
- [ ] Code committed to repository
