const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  })
  
  module.exports = withPWA({
    typescript: {
      ignoreBuildErrors: true,
    },
    // Adicione outras configurações específicas do seu projeto aqui
  })