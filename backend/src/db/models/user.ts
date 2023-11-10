import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}


interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


interface UserInstance extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
  }


  const User = sequelize.define<UserInstance>(
    'User',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
    }
  )

export default User;