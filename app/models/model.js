import { Sequelize } from "sequelize";
import database from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

const { DataTypes } = Sequelize;
//Tabel users
const users = database.define('users',{
    id:{
        type:DataTypes.UUID,
        defaultValue:()=> uuidv4(),
        primaryKey:true
    },
    namaDepan:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    namaBelakang:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    role:{
        type:DataTypes.STRING(25),
        defaultValue:"user"
    },
    password:{
        type:DataTypes.STRING(50),
        allowNull:false
    }
},{
    freezeTableName:true
})
// Definisi model Journals
const journals = database.define('journals', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID
    },
    fileJurnal: {
        type: DataTypes.STRING
    },
    deskripsi: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
}, {
    freezeTableName: true
});
// Definisi model Comments
const comments = database.define('comments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true
    },
    journalId: {
        type: DataTypes.UUID
    },
    userId: {
        type: DataTypes.UUID
    },
    pesan: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
}, {
    freezeTableName: true
});
const views = database.define('views',{
    id:{
        type:DataTypes.UUID,
        defaultValue:()=>uuidv4(),
        primaryKey:true
    },
    userId:{
        type:DataTypes.UUID
    },
    journalId:{
        type:DataTypes.UUID
    }
})
// Relasi antara Users Journals dan Comments
//satu user bisa memiliki banyak journal
users.hasMany(journals);
journals.belongsTo(users);
//satu user bisa memiliki banyak komentar
comments.belongsTo(users, { foreignKey: 'userId' });
comments.belongsTo(users, { foreignKey: 'userId', references: { model: 'users', key: 'id' } });
//satu journal bisa memiliki banyak komentar
journals.hasMany(comments);
comments.belongsTo(journals);
//relasi views ke journal
journals.hasMany(views);
views.belongsTo(journals);
//Relasi users ke views
users.hasMany(views);
views.belongsTo(users);

export { journals,comments,users, views};
