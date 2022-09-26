// requiring connection to make query
const inquirer = require("inquirer");
//const logo = require("asciirt-logo");
require("console.table");
const db = require("./db")




// inquirer prompts

function init() {

    inquirer.prompt([
        {

            name: "menu",
            type: "list",
            message: "Please choose from the list",
            choices: ["View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "quit"]

        }
    ]).then(res => {
        switch (res.menu)
        // Change to match read me
        {
            case "View all Departments":
                viewDepartments();
                break;
            case "View all Roles":
                viewRoles();
                break;
            case "View all Employees":
                viewEmployees();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Update an Employee Role":
                updateEmployee();
                break;
            default:
                quit();


        }




    }); // accept responses from the prompt...run a if depending on selection call function selected



}

function viewDepartments() {
    db.viewDepartments2()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => init());
}

function viewRoles() {
    db.viewRoles2()
    .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
    })
    .then(() => init());
}

function viewEmployees() {
    db.viewEmployees2()
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => init());
}

function addDepartment() {
    inquirer.prompt({
        name: "menu",
        type: "input",
        message: "Please input department name"
        
    }).then(res => {

    db.addDepartment2(res.menu).then(([rows]) => { let roles = rows })

    
})
}
function addRole() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "Please input title"
        
    },
    {
        name: "salary",
        type: "input",
        message: "Please input salary"
        
    },
    {
        name: "dID",
        type: "input",
        message: "Please input deparment id"
        
    },

]).then(res => {



    db.addRole2(res).then(([rows]) => { let roles = rows })

    
})
}

function addEmployee() {
    db.addEmployee2().then(([rows]) => { let roles = rows })

    console.log(roles)
}

function updateEmployee() {
    db.updateEmployee2().then(([rows]) => { let roles = rows })

    console.log(roles)
}




init()