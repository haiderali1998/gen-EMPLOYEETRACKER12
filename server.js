// requiring connection to make query
const inquirer = require("inquirer");
//const logo = require("asciirt-logo");
const callTable = require("console.table");
const connection = require("./db/connection");
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
                "Update an Employee Role"]

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


        }




    }); // accept responses from the prompt...run a if depending on selection call function selected



}

function viewDepartments(){
    db.viewDepartments2().then(([rows])=>{
   let departments = rows;
   console.log(departments)
   })
   }

function viewRoles(){
  db.viewRoles2().then(([rows])=>{
    let roles = rows;
    console.log(roles)
    })
    }

function viewEmployees(){
    db.viewEmployees2().then(([rows])=>{let roles = rows})
  
    console.log(roles)
  }

  function addDepartment(){
    db.addDepartment2().then(([rows])=>{let roles = rows})
  
    console.log(roles)
  }
  function addRole(){
    db.addRole2().then(([rows])=>{let roles = rows})
  
    console.log(roles)
  }

  function addEmployee(){
    db.addEmployee2().then(([rows])=>{let roles = rows})
  
    console.log(roles)
  }

  function updateEmployee(){
    db.updateEmployee2().then(([rows])=>{let roles = rows})
  
    console.log(roles)
  }

// Function for view deprtament

// View all Departments
//View all departments
// function viewDepartments()
// {   
//     connection.query(
//         'SELECT * FROM department',
//         function(err, results) {
//             if (err) throw err;
//             console.log("");
//             console.log("--------------------------------");
           
//             console.log("");
//             init();
//         });
// };



init()
