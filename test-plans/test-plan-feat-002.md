# Test Plan: Feature 002 — User Login (SignIn Flow)

## Application Overview

Scope: BugBank User Login at https://bugbank.netlify.app/. Start every test in a fresh unauthenticated browser context. The login page is the default landing page at the supplied URL. Login panel fields observed: E-mail (input `name="email"`, placeholder "Informe seu e-mail"), Senha (input `name="password"`, placeholder "Informe sua senha", type password), a password visibility toggle button (eye icon), and two buttons: "Acessar" (submit login) and "Registrar" (flip to registration panel). A link "Conheça nossos requisitos" navigates to `/requirements`. A notice states data is stored in local memory — no persistent database. Acceptance criteria mapping: AC1 restricted access → scenario 5; AC2 required fields → scenario 2; AC3 format validation → scenario 3; AC4 successful login → scenario 1; AC5 error messages → scenarios 2, 3, 4. **Precondition dependency:** This feature depends on a registered user (feat-001 SignUp). Each test that needs valid credentials must first create a user via the registration flow as a setup step, since data is stored in local memory and cleared on page reload.

---

## Test Data

| Field     | Valid Value (default)                | Notes                                        |
| --------- | ------------------------------------ | -------------------------------------------- |
| E-mail    | `qa.feat002.<run-id>@example.com`    | Unique per test run, format: valid email      |
| Name      | `Test User`                          | Used only during registration setup           |
| Password  | `Test@1234`                          | Same value used for registration & login      |
| Confirmation | `Test@1234`                       | Registration setup only                       |

---

## Test Scenarios

### 1. Feature: User Login

**Seed:** `tests/seed.spec.ts`

---

#### 1.1. Scenario 1 — Login succeeds with valid credentials (AC4, AC5 — Happy Path)

**File:** `tests/feat-002/login-success.spec.js`

**Steps:**
  1. **Setup:** Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. Click "Registrar" to open the registration panel. Fill E-mail with `qa.feat002+<run-id>@example.com`, Nome with `Test User`, Senha with `Test@1234`, Confirmação senha with `Test@1234`. Click "Cadastrar". Wait for the success modal to appear. Close the modal to return to the login panel.
     - expect: Registration succeeds and the user returns to the login view. The registered email and password are now valid credentials.
  2. **Action:** On the login panel, fill E-mail with the same registered email, fill Senha with `Test@1234`, and click "Acessar".
     - expect: The application accepts the login. The user is redirected away from the login page to the dashboard/home page. The URL should change (e.g., to `/home` or `/transfer`). The dashboard should display account information (account number, balance, greeting).
  3. **Verify:** Confirm the dashboard page is visible and the user is authenticated.
     - expect: The page displays elements consistent with an authenticated session (e.g., account balance, transaction options). The login form is no longer visible. Capture the exact URL, greeting text, and visible dashboard elements for documentation.

---

#### 1.2. Scenario 2 — Login with all required fields left blank (AC2, AC5)

**File:** `tests/feat-002/login-required-fields.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. The login panel is displayed by default. Leave both E-mail and Senha fields empty.
     - expect: The login form is visible with E-mail and Senha fields empty.
  2. When the user clicks "Acessar" without entering any value.
     - expect: Login is not completed. The application displays inline validation messages ("É campo obrigatório") beneath each empty required field. The `p.input__warging` elements transition from `opacity: 0` to visible for both E-mail and Senha fields.
  3. Then verify each empty field's feedback and confirm the user remains on the login page.
     - expect: No redirect occurs. The user stays on the login page at the root URL. The error messages are visible and specific to each field. Record exact text and count of validation messages displayed.

---

#### 1.3. Scenario 3 — Login with invalid email format (AC3, AC5)

**File:** `tests/feat-002/login-invalid-email.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. The login panel is displayed. Fill E-mail with `qa.feat002example.com` (missing `@`), fill Senha with `Test@1234`.
     - expect: The invalid email is the only variable under test. The password field has a valid value.
  2. When the user clicks "Acessar".
     - expect: The form rejects the invalid email format. The application does not log in. An error message related to email format is displayed (e.g., "Formato inválido" or browser native validation). The `input[type="email"]` element's built-in HTML5 validation may also prevent submission.
  3. Then inspect the email error feedback and page state.
     - expect: A format-related error is associated with the E-mail field. No redirect or authenticated page is displayed. Record the exact error message text and whether it comes from the application or the browser's native email input validation.

---

#### 1.4. Scenario 4 — Login with valid email but wrong password (AC5 — Negative)

**File:** `tests/feat-002/login-wrong-password.spec.js`

**Steps:**
  1. **Setup:** Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. Register a user with `qa.feat002+<run-id>@example.com` / `Test@1234` via the registration panel, then return to the login panel.
     - expect: Registration completes successfully. The login panel is visible again.
  2. **Action:** On the login panel, fill E-mail with the registered email, fill Senha with `WrongPass!999` (different from registered password), and click "Acessar".
     - expect: The application rejects the login attempt. An error message is displayed indicating invalid credentials (e.g., a modal or inline message). The exact error text was not verified during exploration; capture the actual error message.
  3. **Verify:** Confirm the user remains on the login page and no authenticated session is created.
     - expect: No redirect to dashboard. The login form remains visible. The error message is clear and does not reveal whether the email or the password was wrong (security best practice).

---

#### 1.5. Scenario 5 — Login with non-registered email (AC1, AC5 — Negative)

**File:** `tests/feat-002/login-unregistered-email.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. Do NOT register any user. The login panel is displayed.
     - expect: No users exist in the local memory storage for this context.
  2. When the user fills E-mail with `nonexistent.user@example.com`, Senha with `Test@1234`, and clicks "Acessar".
     - expect: The application rejects the login. An error message is displayed (e.g., "Usuário ou senha inválido(a)" or similar). No authenticated session is created.
  3. Then verify the user remains on the login page.
     - expect: The user is not redirected. The login form is still visible. The error message does not leak whether the account exists or the password was wrong. Record exact error text.

---

#### 1.6. Scenario 6 — Login with email field filled and password blank (AC2, AC5 — Partial fields)

**File:** `tests/feat-002/login-empty-password.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. Fill E-mail with `qa.feat002@example.com`. Leave Senha empty.
     - expect: Only the password field is empty; email has a valid format value.
  2. When the user clicks "Acessar".
     - expect: The form does not submit successfully. A validation error message is displayed for the Senha field ("É campo obrigatório"). No validation error for E-mail since it has a value.
  3. Then verify partial validation behavior.
     - expect: The password field's `p.input__warging` becomes visible. The email field's warning remains hidden (opacity 0). The user stays on the login page. Record exact error positions and messages.

---

#### 1.7. Scenario 7 — Login with password field filled and email blank (AC2, AC5 — Partial fields)

**File:** `tests/feat-002/login-empty-email.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. Leave E-mail empty. Fill Senha with `Test@1234`.
     - expect: Only the email field is empty; password has a value.
  2. When the user clicks "Acessar".
     - expect: The form does not submit successfully. A validation error message is displayed for the E-mail field ("É campo obrigatório"). No validation error for Senha since it has a value.
  3. Then verify partial validation behavior.
     - expect: The email field's `p.input__warging` becomes visible. The password field's warning remains hidden. The user stays on the login page.

---

#### 1.8. Scenario 8 — Password visibility toggle (UI element validation)

**File:** `tests/feat-002/login-password-toggle.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. The login panel is displayed. Fill Senha with `Test@1234`.
     - expect: The password input type is `password` (characters are masked). The eye icon button (`button.login__eye`) is visible.
  2. When the user clicks the eye icon button.
     - expect: The password input type changes to `text` (characters become visible). The eye icon image changes (e.g., alt text changes from "Icon Close Eye" to "Icon Open Eye" or similar).
  3. When the user clicks the eye icon button again.
     - expect: The password input type reverts to `password` (characters are masked again). The toggle is idempotent and works repeatedly.

---

#### 1.9. Scenario 9 — Navigation: "Registrar" button flips to registration panel (Navigation flow)

**File:** `tests/feat-002/login-navigation-register.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. The login panel (`div.card__login`) is displayed.
     - expect: The login form is visible. The registration form (`div.card__register`) is on the back face (backface-visibility hidden, rotated 180deg via CSS transform).
  2. When the user clicks "Registrar".
     - expect: The card wrapper (`div.pages__Wrapper`) applies a CSS transform to flip (rotateY 180deg), revealing the registration panel. The registration form with E-mail, Nome, Senha, Confirmação senha, and "Cadastrar" is now visible.
  3. When the user clicks "Voltar ao login" (`a#btnBackButton`).
     - expect: The card flips back, showing the login panel. The URL may change to `https://bugbank.netlify.app/#`. The login form fields (E-mail, Senha) and "Acessar" button are visible again. Note: the feat-001 test plan reported a suspected navigation defect where the registration panel remained visible after clicking "Voltar ao login" — verify and record actual behavior.

---

#### 1.10. Scenario 10 — Navigation: "Conheça nossos requisitos" link (Navigation flow)

**File:** `tests/feat-002/login-navigation-requirements.spec.js`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. The login panel is displayed.
     - expect: The link "Conheça nossos requisitos" is visible inside `div.login__link`, with `href="/requirements"`.
  2. When the user clicks the "Conheça nossos requisitos" link.
     - expect: The browser navigates to `https://bugbank.netlify.app/requirements`. A requirements page is loaded with relevant content. Record the page title, URL, and visible content.
  3. When the user navigates back (browser back button or equivalent).
     - expect: The user returns to the login page at `https://bugbank.netlify.app/`. The login form is visible and functional.

---

## Summary

| Scenario | Title                                      | Acceptance Criteria | Type          |
| -------- | ------------------------------------------ | ------------------- | ------------- |
| 1.1      | Login succeeds with valid credentials      | AC4, AC5            | Happy path    |
| 1.2      | Required fields left blank                 | AC2, AC5            | Negative      |
| 1.3      | Invalid email format                       | AC3, AC5            | Negative      |
| 1.4      | Valid email, wrong password                | AC5                 | Negative      |
| 1.5      | Non-registered email                       | AC1, AC5            | Negative      |
| 1.6      | Email filled, password blank               | AC2, AC5            | Edge case     |
| 1.7      | Password filled, email blank               | AC2, AC5            | Edge case     |
| 1.8      | Password visibility toggle                 | —                   | UI validation |
| 1.9      | Navigation to registration panel           | —                   | Navigation    |
| 1.10     | Navigation to requirements page            | —                   | Navigation    |

## File Structure

```
tests/
└── feat-002/
    ├── login-success.spec.js
    ├── login-required-fields.spec.js
    ├── login-invalid-email.spec.js
    ├── login-wrong-password.spec.js
    ├── login-unregistered-email.spec.js
    ├── login-empty-password.spec.js
    ├── login-empty-email.spec.js
    ├── login-password-toggle.spec.js
    ├── login-navigation-register.spec.js
    └── login-navigation-requirements.spec.js
pages/
└── feat-002-page.js        (LoginPage page object)
utils/
├── config.js                (APP_URL — shared)
├── test-data.js             (add createLoginData)
├── actions.js               (add fillLoginForm, submitLogin)
└── assertions.js            (add expectLoginForm, expectLoginSuccess)
```

## Technical Notes

- Use **Playwright** with `@playwright/test` — follow existing project patterns (CommonJS `require`, page objects extending `BasePage`)
- Run on **Chromium** only (as per `playwright.config.js`)
- **Precondition setup:** Tests requiring a logged-in state must first register a user via the registration panel in `beforeEach` or a dedicated setup step, since data lives in local memory only
- All tests must be **independent** — each runs in a fresh browser context with no shared state
- Capture **failure screenshots** in `afterEach` following the existing feat-001 pattern
- All expected error messages should be **recorded as-is** from the actual UI (Portuguese locale) rather than assumed
