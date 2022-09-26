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
        // Switch statement that calls functions
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

// functions that are called from the switch statement

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
    db.viewDepartments2().then(([rows]) => {
        let departments = rows;
        let choicesDepartments = departments.map(({id, name})=>({
            name: name, value: id
        }))
     
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
        type: "list",
        message: "Please input deparment id",
        choices: choicesDepartments

    },
    

    ]).then(res => {

        console.log(res)



        db.addRole2(res).then(([rows]) => { let roles = rows })


    })
})
}

function addEmployee() {
    db.viewEmployees2().then(([rows]) => {
        let employees = rows;
        let choicesEmployees = employees.map(({id, first_name})=>({
            name: first_name, value: id
        }))
        
     
    inquirer.prompt([{
        name: "first",
        type: "input",
        message: "Please input First Name"

    },
    {
        name: "last",
        type: "input",
        message: "Please input Last Name"

    },
     {
        name: "roleID",
        type: "input",
        message: "Please input role ID",
        

    },
    {
        name: "managerID",
        type: "list",
        message: "Please input Manager",
        choices: choicesEmployees 

    },
   
    

    ]).then(res => {

        console.log(res)



        db.addEmployee2(res).then(([rows]) => { let roles = rows })


    })
})
}

function updateEmployee() {
    db.updateEmployee2().then(([rows]) => { let roles = rows })

    console.log(roles)
}

function quit() {
    console.log("BYE!!!")
    process.exit()
}


init()