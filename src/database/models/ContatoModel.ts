import { DataTypes } from "sequelize"
import { db } from "../db"

// class ContatoModel extends Model {
//   declare id: number
// }


// ContatoModel.init({
//   id : {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   nome: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   sobrenome:{
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   telefone: {
//     type:  DataTypes.INTEGER,
//     allowNull: true,
//   },
//   datanasci: {
//     type: DataTypes.DATEONLY,
//     allowNull: true,
//   },
//   endereco: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     unique: true,
//   }
// }, { 
//   Sequelize, 
// });

// const contatos = new ContatoModel({ id: 1 });

export const ContatoModel = db.define("contacts", {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sobrenome:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefone: {
    type:  DataTypes.STRING,
    allowNull: true,
  },
  datanasci: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  }
}, {
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

// (async () => {
//   try {
//     const resultado = await db.sync()
//     console.log(resultado)
//   } catch (error) {
//     console.log(error)
//   }
// }) ();


