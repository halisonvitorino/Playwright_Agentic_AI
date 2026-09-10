# Test Plan for User Story: SignUp Flow (feat-001)

## Application URL

https://bugbank.netlify.app/

## Test Scope

Registration form validation, success flow, error handling.

## Test Scenarios

### TC_001: Happy Path - Valid Registration

**Precondition:** User is on the registration page (Cadastrar)
**Test Data Example:**

- Nome: João Silva
- E-mail: joao.silva@example.com
- Senha: Senha123!
- Confirmar Senha: Senha123!

**Steps:**

1. Navigate to https://bugbank.netlify.app/
2. Click on the "Registrar" button to reach the registration page
3. Fill in all fields with the test data above
4. Click the "Cadastrar" button

**Expected Results:**

- System allows submission (no validation errors)
- User remains on the same page (demo site behavior) or is redirected to home page
- No error messages are displayed

### TC_002: Required Fields - Empty Submission

**Precondition:** User is on the registration page
**Test Data:** All fields left empty
**Steps:**

1. Navigate to https://bugbank.netlify.app/
2. Click on the "Registrar" button to reach the registration page
3. Leave all fields empty
4. Click the "Cadastrar" button

**Expected Results:**

- System does not allow submission (form not sent)
- Error messages displayed beside each mandatory field indicating they are required
  - Nome: "É campo obrigatório"
  - E-mail: "É campo obrigatório"
  - Senha: "É campo obrigatório"
  - Confirmação senha: "É campo obrigatório"

### TC_003: Invalid Email Format

**Precondition:** User is on the registration page
**Test Data:**

- Nome: João Silva
- E-mail: joao.silvaexample.com (missing @)
- Senha: Senha123!
- Confirmar Senha: Senha123!

**Steps:**

1. Navigate to https://bugbank.netlify.app/
2. Click on the "Registrar" button to reach the registration page
3. Fill in all fields with above data (email invalid)
4. Click the "Cadastrar" button

**Expected Results:**

- System displays error message for email field: "Formato inválido"
- Form is not submitted

### TC_004: Fields with Only Spaces

**Precondition:** User is on the registration page
**Test Data:**

- Nome: " " (only spaces)
- E-mail: joao.silva@example.com
- Senha: Senha123!
- Confirmar Senha: Senha123!

**Steps:**

1. Navigate to https://bugbank.netlify.app/
2. Click on the "Registrar" button to reach the registration page
3. Fill Nome with spaces only, other fields valid
4. Click the "Cadastrar" button

**Expected Results:**

- System treats the Nome field as empty (after trim)
- Displays error: "É campo obrigatório" for Nome field
- Form not submitted

### TC_005: Special Characters/Numbers in Name

**Precondition:** User is on the registration page
**Test Data:**

- Nome: João123!
- E-mail: joao.silva@example.com
- Senha: Senha123!
- Confirmar Senha: Senha123!

**Steps:**

1. Navigate to https://bugbank.netlify.app/
2. Click on the "Registrar" button to reach the registration page
3. Fill Nome with João123!, other fields valid
4. Click the "Cadastrar" button

**Expected Results:**

- System does not allow submission (validation working)
- No specific error message may be displayed, but form validation prevents submission

### TC_006: Maximum Length Exceeded

**Precondition:** User is on the registration page
**Test Data:**

- Nome: a string of 300 characters (exceeds limit)
- E-mail: joao.silva@example.com
- Senha: Senha123!
- Confirmar Senha: Senha123!

**Steps:**

1. Navigate to https://bugbank.netlify.app/
2. Click on the "Registrar" button to reach the registration page
3. Fill Nome with 300-character string, other fields valid
4. Click the "Cadastrar" button

**Expected Results:**

- System may truncate the input to maximum length or show validation error
- Form behavior depends on implementation (may allow submission if truncated)

### TC_007: Password Mismatch

**Precondition:** User is on the registration page
**Test Data:**

- Nome: João Silva
- E-mail: joao.silva@example.com
- Senha: Senha123!
- Confirmar Senha: Senha456!

**Steps:**

1. Navigate to registration page
2. Click on the "Registrar" button to reach the registration page
3. Fill fields with above data (passwords mismatch)
4. Click the "Cadastrar" button

**Expected Results:**

- System does not allow submission (validation working)
- Form validation prevents submission when passwords don't match

### TC_008: Successful Registration Behavior

**Precondition:** User is on the registration page with valid data
**Test Data:** Same as TC_001
**Steps:**

1. Navigate to https://bugbank.netlify.app/
2. Click on the "Registrar" button to reach the registration page
3. Fill valid data
4. Click the "Cadastrar" button

**Expected Results:**

- System allows submission (no validation errors)
- No error messages displayed
- For demo site: remains on same page; for real site: would redirect to home page

## Test Data Requirements

- Valid user data for positive test
- Invalid email formats (missing @, missing domain, etc.)
- Empty fields
- Whitespace-only fields
- Name with special characters/numbers
- Fields exceeding max length
- Password mismatch cases

## Environment

- Browser: Chrome (via Playwright)
- URL: https://bugbank.netlify.app/
- Test framework: Playwright with JavaScript

## Pass/Fail Criteria

- A test passes if all expected results match actual results.
- A test fails if any expected result is not met or if unexpected behavior occurs.

## Notes

- Use stable selectors (placeholders, input names) for automation.
- Implement explicit waits for dynamic elements.
- Capture screenshots on failure for debugging.
- Error messages are found in `<p class="input__warging">` elements following each input field.
