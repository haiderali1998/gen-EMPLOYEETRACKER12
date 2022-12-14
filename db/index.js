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
    addDepartment2(inputDepartment){
        return this.connection.promise().query(`INSERT INTO department (name) VALUES ("${inputDepartment}")`);
    }
    addRole2(inputRoles){
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${inputRoles.title}", ${inputRoles.salary}, ${inputRoles.dID})`);
    }
    addEmployee2(inputEmployee){
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${inputEmployee.first}", "${inputEmployee.last}", ${inputEmployee.roleID}, ${inputEmployee.managerID})`);
    }
    updateEmployee2(employeeID, roleID){
        return this.connection.promise().query(`UPDATE employee, SET role_id = ${roleID} WHERE id = ${employeeID}`);
    }

}



module.exports = new DB(connection);