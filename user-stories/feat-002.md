# User Story: SignIn Flow

## 📌 História de Usuário (User Story)

**Título:** Login de Usuário
**Como** um usuário com cadastro no sistema,  
**Eu quero** poder acessar com sucesso o sistema,  
**Para** ver o dashboard do sistema.

---

## Application URL

https://bugbank.netlify.app/

---

### 🧾 Critérios de Aceite (Acceptance Criteria)

1. **Acesso Restrito:** Usuários não autenticados são redirecionados para a tela de login.
2. **Campos Obrigatórios:** Todos os campos do formulário são obrigatórios e devem ser validados no front-end.
3. **Validação de Formato:** Os campos devem respeitar os formatos esperados (ex: e-mail válido, senha, etc.).
4. **Sucesso:** Ao preencher todos os campos corretamente e submeter, o sistema deve exibir o dashboard com sucesso.
5. **Erros:** Caso algum campo obrigatório esteja vazio ou inválido, o sistema deve exibir mensagens de erro específicas.

---

# FEATURE: LOGIN DE USUÁRIO

Feature: Login de Usuário
Como um usuário com acesso ao sistema
Eu quero poder me autenticar
Para acessar o sistema

Background:
Dado que o usuário ja registrado

# CENÁRIO 1 - LOGIN COM SUCESSO

Cenário: Login com dados válidos
Dado que o usuário já cadastrado está na página inicial
Quando preenche todos os campos obrigatórios com dados válidos
E tenta submeter o formulario
Então é redirecionado para dashboard page

# CENÁRIO 2 - CAMPOS OBRIGATÓRIOS VAZIOS

Cenário: Login com campos obrigatórios em branco
Dado que o usuário está na página inicial
Quando deixa campos obrigatórios em branco
E tenta submeter o formulario
Então o sistema não deve permitir a submissão
E deve exibir mensagens de erro ao lado de cada campo vazio

# CENÁRIO 3 - E-MAIL INVÁLIDO

Cenário: Login com e-mail no formato incorreto
Dado que o usuário está na página inicial
Quando preenche o campo E-mail sem @
E tenta submeter o formulario
Então o sistema deve exibir a mensagem de erro
E o sistema não deve permitir a submissão

# CRITÉRIOS DE ACEITE

Regra: Todos os campos são obrigatórios

---

## Technical Notes

- Use Playwright for test automation
- Test across Chrome
- Ensure responsiveness in checkout flow
- Validate all form validation messages

## Definition of Done

- [ ] All acceptance criteria have test cases
- [ ] Manual exploratory testing completed
- [ ] Automated test scripts created and passing
- [ ] Test results documented
- [ ] Bugs logged for any failures
- [ ] Code committed to repository
