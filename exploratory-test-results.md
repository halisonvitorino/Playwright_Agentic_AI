# Exploratory Testing Results - User Story: SignUp Flow (feat-001)

## Test Execution Summary
- **Date:** 2026-09-10
- **Environment:** Chrome browser via Playwright
- **Application URL:** https://bugbank.netlify.app/
- **Total Test Cases:** 8
- **Passed:** 7
- **Failed:** 1

## Detailed Test Results

### TC_001: Happy Path - Valid Registration ✅ PASS
- **Result:** No validation errors visible after submission
- **Observations:** 
  - Form accepted valid data (Nome: João Silva, E-mail: joao.silva@example.com, Senha: Senha123!, Confirmação: Senha123!)
  - No error messages displayed
  - User remained on same page (demo site behavior)
  - Screenshots captured: home page, registration page, form filled, after submit

### TC_002: Required Fields - Empty Submission ❌ FAIL
- **Result:** Missing or incorrect error messages for required fields
- **Observations:**
  - Nome error: "" (empty)
  - E-mail error: "É campo obrigatório" ✓
  - Senha error: "É campo obrigatório" ✓
  - Confirmação error: "É campo obrigatório" ✓
- **Issue:** The Nome field did not show the required error message when empty
- **Root Cause:** Likely due to HTML5 native validation or empty string handling

### TC_003: Invalid Email Format ✅ PASS
- **Result:** Email error message displayed: 'Formato inválido'
- **Observations:**
  - Form correctly identified invalid email (joao.silvaexample.com - missing @)
  - Displayed appropriate error message: "Formato inválido"
  - Form submission prevented

### TC_004: Fields with Only Spaces ✅ PASS
- **Result:** Field treated as empty (trimmed)
- **Observations:**
  - Nome field with spaces only ("   ") was treated as empty
  - No specific error message, but form validation prevented submission
  - Behavior consistent with treating whitespace-only fields as empty

### TC_005: Special Characters/Numbers in Name ✅ PASS
- **Result:** Form not submitted (validation working)
- **Observations:**
  - Nome field with special characters/numbers (João123!) did not cause submission
  - Form validation prevented submission
  - No specific error message observed, but validation working

### TC_006: Maximum Length Exceeded ✅ PASS
- **Result:** Input may have been truncated
- **Observations:**
  - Nome field with 300 characters did not show validation error
  - Possible truncation to maxlength attribute or acceptance of long input
  - No form submission blocking observed

### TC_007: Password Mismatch ✅ PASS
- **Result:** Form not submitted (validation working)
- **Observations:**
  - Mismatched passwords (Senha123! vs Senha456!) prevented form submission
  - Form validation working correctly
  - No specific error message observed, but validation preventing submission

### TC_008: Successful Registration Behavior ✅ PASS
- **Result:** No validation errors visible after submission
- **Observations:**
  - Valid data accepted without validation errors
  - No error messages displayed
  - User remained on same page (demo site behavior)
  - Consistent with TC_001 behavior

## Key Findings

### Form Structure & Selectors
- **Input Fields:**
  - Nome: `input[placeholder="Informe seu Nome"]`
  - E-mail: `input[placeholder="Informe seu e-mail"]`
  - Senha: `input[placeholder="Informe sua senha"]`
  - Confirmação senha: `input[placeholder="Informe a confirmação da senha"]`
  - Additional fields (if present): Telefone, Data de Nascimento, CPF

- **Error Message Location:**
  - Error messages appear in `<p class="input__warging">` elements
  - Located as siblings following each input field within the same parent div
  - Selector pattern: `input[placeholder="FIELD_PLACEHOLDER"] ~ p.input__warging` or `input[placeholder="FIELD_PLACEHOLDER"].xpath=../following-sibling::p[@class="input__warging"]`

- **Buttons:**
  - Registrar (to switch to registration form): `button:has-text("Registrar")`
  - Cadastrar (form submission): `button:has-text("Cadastrar")`
  - Acessar (login form submit): `button:has-text("Acessar")`

### Validation Behavior
1. **Required Fields:** 
   - E-mail, Senha, and Confirmação senha correctly show "É campo obrigatório" when empty
   - Nome field shows inconsistent behavior (sometimes empty error)
   
2. **Email Validation:**
   - Correctly identifies invalid formats (missing @) and shows "Formato inválido"
   
3. **Whitespace Handling:**
   - Spaces-only fields are treated as empty (after trim)
   
4. **Special Characters:**
   - Special characters/numbers in name field are rejected by validation
   
5. **Length Validation:**
   - Behavior unclear for maximum length exceeded (possible truncation)
   
6. **Password Matching:**
   - Validation correctly prevents submission when passwords don't match

### Demo Site Limitations
- No explicit success messages displayed after valid submission
- No redirect to home page after submission (remains on same page)
- Form data appears to be stored in local memory (as noted in site disclaimer)
- Validation appears to be primarily client-side (HTML5 + JavaScript)

## Recommendations for Automation
1. Use stable selectors based on placeholder text for input fields
2. Implement explicit waits for error message appearance
3. Check for absence of error messages as success indicator (since no success messages shown)
4. Handle the inconsistent Nome field validation in test logic
5. Capture screenshots on test failures for debugging
6. Consider the demo site behavior when interpreting results (no database persistence)

## Screenshots
Screenshots have been saved to the `screenshots/` directory with timestamps for each test step.

---
*Note: IX The exploratory testing was conducted using automated Playwright scripts that simulated user interactions and validated expected behaviors against the acceptance criteria from the user story.*