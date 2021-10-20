module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    '@indielayer/eslint-config-vue'
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    'no-console': 'off'
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
