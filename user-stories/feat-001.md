# User Story: SignUp Flow

## 📌 User Story

**Title:** User Registration
**As** an unregistered user,  
**I want** to be able to Register (with name, email, password, etc.) via the Register option,  
**So that** I can gain access to the system.

---

## Application URL

https://bugbank.netlify.app/

---

### 🧾 Acceptance Criteria

1. **Restricted Access:** Unauthenticated users are redirected to the login screen.
2. **Required Fields:** All form fields are required and must be validated on the front-end.
3. **Format Validation:** Fields must respect expected formats (e.g., valid email, name, etc.).
4. **Success:** When all fields are filled correctly and submitted, the system must display a success message.
5. **Errors:** If any required field is empty or invalid, the system must display specific error messages.

# FEATURE: NEW USER REGISTRATION

Feature: New User Registration
As a user without system access
I want to be able to Register via the Register option on the home page
To gain access to the system

Background:
Given the user is on the Register page
And clicks the Register button

# SCENARIO 1 - USER REGISTRATION SUCCESS

Scenario: Registration with valid data
Given the user is on the Register page
When fills all required fields with valid data:
And clicks the Register button
Then the system must display the success message
And is redirected to the home page

# SCENARIO 2 - REQUIRED FIELDS EMPTY

Scenario: Submit form with required fields blank
Given the user is on the Register page
When leaves required fields blank
And clicks the Register button
Then the system must not allow submission
And must display error messages next to each empty field

# SCENARIO 3 - INVALID EMAIL

Scenario: Attempt to register with incorrectly formatted email
Given the user is on the Register page
When fills all required fields with valid data
And fills the Email field without @
And clicks the Register button
Then the system must display the error message
And the form must not be submitted

# SCENARIO 4 - FIELDS WITH ONLY WHITESPACE

Scenario: Fill fields with only whitespace
Given the user is on the Register page
When fills the Name field with (only spaces)
And fills the other required fields with valid data
And clicks the Register button
Then the system must consider the field as empty
And must display the error message "The Name field is required"
And the form must not be submitted

# SCENARIO 5 - SPECIAL CHARACTERS IN NAME

Scenario: Name containing special characters or numbers
Given the user is on the Register page
When fills the Name field with João123!
And fills the other required fields with valid data
And clicks the Register button
Then the system must display the error message
And the form must not be submitted

# SCENARIO 6 - MAXIMUM LENGTH EXCEEDED

Scenario: Exceed character limit in field
Given the user is on the Register page
When fills the Name field with a 300-character text
And fills the other required fields with valid data
And clicks the Register button
Then the system must display the error message
And the form must not be submitted

# ACCEPTANCE CRITERIA

Rule: All fields are required

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
