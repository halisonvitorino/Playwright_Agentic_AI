# Test Plan: Feature 001 User Registration

## Application Overview

Scope: BugBank User Registration at https://bugbank.netlify.app/. Start every test in a fresh unauthenticated browser context with no pre-existing account data. The login page is at the supplied URL. Register panel fields observed: E-mail (placeholder "Informe seu e-mail"), Nome ("Informe seu Nome"), Senha ("Informe sua senha"), Confirmação senha ("Informe a confirmação da senha"), and submit "Cadastrar". Observed blank submission displays inline "É campo obrigatório" for email, password, and confirmation; Name has no inline message in that case. With valid email and matching non-empty password fields but blank Name, a modal shows "Nome não pode ser vazio.". No credentials or protected-route URL were supplied. The app says data is stored in local memory. Do not use real personal data. Acceptance criteria mapping: AC1 unauthenticated access -> navigation/access test; AC2 required fields -> scenarios 2 and 4; AC3 formats -> scenarios 3, 5, and 6; AC4 registration success -> scenario 1; AC5 specific errors -> scenarios 2-6. Unverified behavior is called out in relevant expected results rather than assumed as fact.

## Test Scenarios

### 1. Feature: New User Registration

**Seed:** `tests/seed.spec.ts`

#### 1.1. Scenario 1 - Registration succeeds with valid data (AC4, AC5)

**File:** `tests/feat-001/registration-success.spec.ts`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. Click "Registrar" to open registration. Use a unique address such as qa.feat001+<run-id>@example.com, a valid plain name such as Maria Silva, password Test@1234, and the same confirmation. Do not enable "Criar conta com saldo ?".
    - expect: The register form is available with E-mail, Nome, Senha, Confirmação senha, and Cadastrar controls. The test uses synthetic, run-unique data only.
  2. When all fields are filled with valid data, click "Cadastrar".
    - expect: The application accepts the registration, displays its success message, and redirects to the post-registration home page, as required by the story. Exact success copy, destination URL, password rules, and whether the chosen password meets them were not verified during exploration; capture the actual outcome and report a mismatch rather than assuming exact copy or route.
  3. Then verify the resulting page and success feedback; reload only if the workflow's expected landing page permits it.
    - expect: A successful registration is distinguishable from validation failure and the user reaches the expected home page. Persistence/reload behavior is not part of the current acceptance criteria and must not be inferred from the UI statement that data is stored in local memory.

#### 1.2. Scenario 2 - Required fields left blank (AC2, AC5)

**File:** `tests/feat-001/registration-required-fields.spec.ts`

**Steps:**
  1. Given a fresh unauthenticated browser context at https://bugbank.netlify.app/. Click "Registrar" and leave E-mail, Nome, Senha, and Confirmação senha empty.
    - expect: The registration form is visible and all four fields are empty.
  2. When the user clicks "Cadastrar" without entering any value.
    - expect: Registration is not completed. The observed UI shows inline "É campo obrigatório" under E-mail, Senha, and Confirmação senha. The observed blank-submit state had no inline Name error and no name modal; because AC2/story text expects every required field to be validated, record whether Name is rejected and report this discrepancy. Do not claim an unobserved Name message.
  3. Then verify each empty field's feedback and confirm the user remains on the registration flow.
    - expect: No success message or authenticated home page is shown. Record the exact text and placement for each field. Existing evidence confirms only the three inline messages above; additional behavior remains to be verified.

#### 1.3. Scenario 3 - Invalid email format (AC3, AC5)

**File:** `tests/feat-001/registration-invalid-email.spec.ts`

**Steps:**
  1. Given a fresh unauthenticated browser context and the registration form. Fill Nome with Maria Silva, Senha and Confirmação senha with the same non-empty test value, and E-mail with qa.feat001example.com (missing @).
    - expect: The invalid email test data is isolated from any real account; other fields are populated so email format is the variable under test.
  2. When the user clicks "Cadastrar".
    - expect: The form rejects the invalid email and does not complete registration, as required by AC3 and the story scenario. The precise email-format error text and whether the form permits this value were not verified; record the exact actual message without inventing expected copy.
  3. Then inspect the email feedback and page state.
    - expect: A format-related error is associated with E-mail and no success/redirect occurs. Confirm the exact error wording with the product owner if the UI provides no clear format error.

#### 1.4. Scenario 4 - Name contains only whitespace (AC2, AC5)

**File:** `tests/feat-001/registration-whitespace-name.spec.ts`

**Steps:**
  1. Given a fresh unauthenticated browser context and the registration form. Fill E-mail with qa.feat001+<run-id>@example.com, Name with three spaces, and both password fields with the same non-empty test password.
    - expect: The whitespace name is the only invalid field; all other required fields have values.
  2. When the user clicks "Cadastrar".
    - expect: Whitespace-only Name is treated as empty, registration is rejected, and an error is shown. The story specifies the message "The Name field is required", but exploration observed the Portuguese modal "Nome não pode ser vazio." for an actually blank Name with other fields populated. Whitespace-only behavior and the required copy are unverified; capture the actual result and reconcile the English/Portuguese requirement mismatch.
  3. Then confirm no successful registration or redirect occurred.
    - expect: The user remains in the registration flow and can correct Name.

#### 1.5. Scenario 5 - Name contains special characters or numbers (AC3, AC5)

**File:** `tests/feat-001/registration-special-name.spec.ts`

**Steps:**
  1. Given a fresh unauthenticated browser context and the registration form. Fill Name with João123!, E-mail with qa.feat001+<run-id>@example.com, and both password fields with the same non-empty test password.
    - expect: The exact story test value João123! is used; other values are valid and isolated.
  2. When the user clicks "Cadastrar".
    - expect: The story expects rejection and an error for a name containing special characters or numbers. The accepted-name character policy and exact error message were not verified; capture the actual behavior rather than assuming all punctuation or numerals are forbidden.
  3. Then confirm registration does not succeed if the name is invalid under the agreed policy.
    - expect: No success feedback or redirect occurs for a rejected value. If accepted, record it as a discrepancy against Scenario 5 and clarify the intended name policy.

#### 1.6. Scenario 6 - Name exceeds maximum length (AC3, AC5)

**File:** `tests/feat-001/registration-name-max-length.spec.ts`

**Steps:**
  1. Given a fresh unauthenticated browser context and the registration form. Fill Name with exactly 300 characters (for example, 300 repetitions of A), E-mail with qa.feat001+<run-id>@example.com, and both password fields with the same non-empty test password.
    - expect: The Name field contains exactly 300 characters before submission. Live inspection found no native maxlength attribute; application-level limit behavior remains unverified.
  2. When the user clicks "Cadastrar".
    - expect: The story expects the 300-character value to be rejected with an error and no submission. The actual maximum, error copy, and whether the UI truncates input were not verified; capture field length and exact result.
  3. Then confirm the registration is not completed for an over-limit name.
    - expect: No success feedback or redirect occurs if 300 characters exceed the product's intended limit. If accepted, record the discrepancy and ask for the authoritative maximum length.

#### 1.7. Navigation and unauthenticated access (AC1; navigation flow)

**File:** `tests/feat-001/navigation-unauthenticated.spec.ts`

**Steps:**
  1. Given a fresh browser context with no authentication state. Navigate directly to https://bugbank.netlify.app/.
    - expect: The login screen is visible at the supplied URL; this was observed. No credentials were supplied, and no authenticated session or protected-route URL is available. The criterion's redirect from a protected resource cannot be conclusively verified until the protected route is identified.
  2. When the user clicks "Registrar" and then the "Voltar ao login" link.
    - expect: The register panel opens. On exploration, "Voltar ao login" changed the URL to https://bugbank.netlify.app/# but the registration panel remained visible after waiting one second. Treat the return-to-login transition as a suspected navigation defect; verify the expected panel state and report actual behavior.
  3. Then reload the supplied root URL in the same unauthenticated context and inspect the available login controls.
    - expect: The login view remains accessible without credentials. Do not claim a redirect from an authenticated/protected route based only on loading the root login URL. Record the URL and visible panel after reload.
