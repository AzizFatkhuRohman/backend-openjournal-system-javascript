import { Sequelize } from "sequelize";

const database = new Sequelize('openjournalsystem','root','',{
    host:'localhost', dialect:'mysql'
})
export default database