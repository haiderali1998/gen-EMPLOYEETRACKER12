

const connection = require("./connection");

class DB {
     viewDepartments2(){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }
    viewRoles2(){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }

}



module.exports = new DB