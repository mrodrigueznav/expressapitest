'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  usuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // No permitir valores vacíos
        },
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Correo debe ser único
        validate: {
          isEmail: {
            msg: 'El correo debe ser un correo válido', // Mensaje personalizado
          },
          notEmpty: {
            msg: 'El correo no puede estar vacío', // Mensaje personalizado
          },
        },
      },
      mensaje: {
        type: DataTypes.TEXT,
        allowNull: true, // Este campo es opcional
      },
    },
    {
      sequelize,
      modelName: 'usuario',
    }
  );

  return usuario;
};
