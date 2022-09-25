

const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
     viewDepartments2(employeeData){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }
    viewRoles2(){
        return this.connection.promise().query("SELECT role.id, role.title, role.salary, FROM role");
    }
    viewEmployees2(){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }
    addDepartment2(){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }
    addRole2(){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }
    addEmployee2(){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }
    updateEmployee2(){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }

}



module.exports = new DB(connection);