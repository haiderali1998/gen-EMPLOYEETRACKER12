

const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }
     viewDepartments2(employeeData){
        return this.connection.promise().query("SELECT department.id, department.name FROM department");
    }
    viewRoles2(){
        return this.connection.promise().query("SELECT role.id, role.title, role.salary FROM role");
    }
    viewEmployees2(){
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee");
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