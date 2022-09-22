// requiring connection to make query
const inquirer = require("inquirer");
const logo = require("asciirt-logo");
require("console.table")
const connection = require("./connection");
const { listenerCount } = require("./connection");

// inquirer prompts

function init(){

inquirer.prompt([
    {
// show the menu

name: "menu",
type: list,
message: "",
choices: ["departments", "roles", "employees", "add a department", "add a role", "add an employee", "update an employee role"]


    }
]).then(res => {
    switch(res.menu){
        case "departments":
    viewDepartments();
    break;
case "roles":
    viewRoles();
    case 

}




}); // accept responses from the prompt...run a if depending on selection call function selected



}

function viewDepartments(){}

