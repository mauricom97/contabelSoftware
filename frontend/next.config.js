module.exports = {
  // Configurações adicionais do Next.js...

  // Configuração específica para o TypeScript
  typescript: {
    // Evita a necessidade de instalar @types/react e @types/node manualmente
    ignoreBuildErrors: true,
  },

  // Configuração específica para o Babel
  babel: {
    // Permite a importação de 'next/router' no projeto TypeScript
    presets: ['next/babel'],
  },
};