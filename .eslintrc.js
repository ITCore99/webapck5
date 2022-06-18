module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    // "airbnb",
    'eslint:recommended',
    // "plugin:vue/essential"
  ],
  'parserOptions': { // 解析器配制酒 把源代码转化为AST
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'parser': '@babel/eslint-parser',
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'indent': ['error', 2],
    'no-console': 'off',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }]
  }
}
