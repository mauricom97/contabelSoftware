import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";

interface CompanyAttributes {
  id: number;
  registerName: string;
  sampleName: string;
  cnpj: string;
  ie: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  cep: string;
  address: string;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, "id"> {}

interface CompanyInstance extends Model<CompanyAttributes, CompanyCreationAttributes>,
  CompanyAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  }

  const Company = sequelize.define<CompanyInstance>(
    'Company',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      registerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sampleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      ie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'companies',
    }
  )

  export default Company;