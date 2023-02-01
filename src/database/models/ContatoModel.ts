import { DataTypes } from "sequelize"
import { db } from "../db"

export const ContatoModel = db.define("contacts", {
  id : {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sobrenome:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type:  DataTypes.STRING,
    allowNull: false,
  },
  datanasci: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
    tableName: 'contacts',
    timestamps: false,
});


db.authenticate().then(() => {
  console.log(`Connection has been established successfully.`);
})
.then(() => {
  db.sync()
})
.catch((error) => {
  console.log(`Erro de conexão.`, error)
});