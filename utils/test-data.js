// Test data for registration form
const { faker } = require('@faker-js/faker');
const testData = {
  // Valid registration data
  validUser: {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password({ length: 8, prefix: 'Senha' }),
    confirmacaoSenha: '', // Will be set to match senha below
  },

  // Invalid email formats
  invalidEmails: [
    "joao.silvaexample.com", // missing @
    "joao.silva@example", // missing domain extension
    "@example.com", // missing local part
    "joao.silva@.com", // missing domain name
    "joao.silva@example..com", // double dot in domain
    "", // empty email
  ],

  // Empty or whitespace-only fields
  emptyFields: {
    nome: "",
    espacosNome: "   ",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  },

  // Special characters and numbers in name
  invalidNames: ["João123!", "Maria123", "José@#$%", "Ana1234567890"],

  // Length validation
  longStrings: {
    nome300Chars: "a".repeat(300),
    nome250Chars: "b".repeat(250), // assuming limit might be 250
  },

  // Password mismatch scenarios
  passwordMismatch: [
    { senha: "Senha123!", confirmacao: "Senha456!" },
    { senha: "Senha123!", confirmacao: "senha123!" }, // case difference
    { senha: "Senha123!", confirmacao: "Senha123" }, // missing special char
    { senha: "Senha123!", confirmacao: "" }, // empty confirmation
  ],
};

// Set confirmacaoSenha to match senha for validUser
testData.validUser.confirmacaoSenha = testData.validUser.senha;

module.exports = { testData };
