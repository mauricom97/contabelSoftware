import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});


async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida');
  } catch (error) {
    console.error('Erro ao conectar:', error);
  }
}

testarConexao();

export { Sequelize, sequelize };
