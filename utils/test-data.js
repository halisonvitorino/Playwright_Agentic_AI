// Test data for registration form
const testData = {
  // Valid registration data
  validUser: {
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    senha: 'Senha123!',
    confirmacaoSenha: 'Senha123!',
    telefone: '(11) 99999-9999',
    dataNascimento: '01/01/1990',
    cpf: '123.456.789-00'
  },

  // Invalid email formats
  invalidEmails: [
    'joao.silvaexample.com', // missing @
    'joao.silva@example', // missing domain extension
    '@example.com', // missing local part
    'joao.silva@.com', // missing domain name
    'joao.silva@example..com', // double dot in domain
    '' // empty email
  ],

  // Empty or whitespace-only fields
  emptyFields: {
    nome: '',
    espacosNome: '   ',
    email: '',
    senha: '',
    confirmacaoSenha: ''
  },

  // Special characters and numbers in name
  invalidNames: [
    'João123!',
    'Maria123',
    'José@#$%',
    'Ana1234567890'
  ],

  // Length validation
  longStrings: {
    nome300Chars: 'a'.repeat(300),
    nome250Chars: 'b'.repeat(250) // assuming limit might be 250
  },

  // Password mismatch scenarios
  passwordMismatch: [
    { senha: 'Senha123!', confirmacao: 'Senha456!' },
    { senha: 'Senha123!', confirmacao: 'senha123!' }, // case difference
    { senha: 'Senha123!', confirmacao: 'Senha123' }, // missing special char
    { senha: 'Senha123!', confirmacao: '' } // empty confirmation
  ]
};

module.exports = { testData };