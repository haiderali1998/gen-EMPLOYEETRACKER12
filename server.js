
//Import required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
//const chalk = require('chalk');
const connection = require("./config/connection");



//Start prompts
function empprompt(){
    inquirer.prompt([
    {
        type :"list",
        message :"What would you like to do?",
        name : "choices",
        choices: ['View all departments',
                 'View all roles',
                 'View all Employees',
                 'Add a department',
                 'Add a role',
                 'Add an employee',
                 'Update an employee role',
                 'Exit']
    }
    ]).then(function(res)
    {
        switch (res.choices)
        {
            case "View all departments" :
                viewAllDepartments();
                break;

            case "View all roles" :
                viewAllRoles();
                break;

            case "View all Employees" :
                viewAllEmployee();
                break;

            case "Add a department" :
                addDepartment();
                break;

            case "Add a role" :
                addRole();
                break;

            case "Add an employee" :
                addEmployee();
                break;

            case "Update an employee role" :
                updateEmployeeRole();
                break;

            case "Exit" :
              connection.end();
                 break;
            
        }

    });
};


//View all departments
function viewAllDepartments()
{   
    connection.query(
        'SELECT * FROM department',
        function(err, results) {
            if (err) throw err;
           
            empprompt();
        });
};


//View all roles
function viewAllRoles()
{   
    connection.query("select role.id AS role_id,role.title AS job_title,role.salary,department.name as dept_name from role join department on role.department_id = department.id;",
        function(err, results) {
            if (err) throw err;
            
            empprompt();
        });
};



//View all employees
function viewAllEmployee()
{
  connection.query("Select em.id AS emp_id, em.first_name, em.last_name, role.title as job_title, role.salary, department.name as dept_name, CONCAT(ep.first_name, ' ' ,ep.last_name) AS Manager from employee AS em\
    join role on role.id = em.role_id\
    join department on department.id = role.department_id\
    left join employee AS ep on em.manager_id = ep.id\
    order by em.id;",
        function(err, results){
            if (err) throw err;
          
            empprompt();
        });
};

//Add a new department
function addDepartment()
{   
    inquirer.prompt([
    {
        type :"input",
        message :"Please enter department name: ",
        name : "dept_name",
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter department name!');
              return false;
            }
          }
    }
    ]).then(function(res) {
      connection.query("INSERT INTO department SET ?",
        {
            name : res.dept_name
        },    
        function (err, result) {
            if (err) throw err;
         
            empprompt();
          });
    });
   
};


//Select department to add role

function selectDepartment()
{
    const deptname = [];
    connection.query("select * from department;",
        function(err, results) {
            if (err) throw err;
            for(let i=0;i<results.length;i++)
            {
                deptname.push(results[i].name);
            }
            
        })
    return deptname;
};

//Add new role
function addRole()
{
    inquirer.prompt([
        {
            type :"input",
            message :"Please enter role title: ",
            name : "role_title",
            validate: titleInput => {
                if (titleInput) {
                  return true;
                } else {
                  console.log('Please enter role title!');
                  return false;
                }
              }
        },
        {
            type :"input",
            message :"Please enter role salary: ",
            name : "role_salary",
            validate: salaryInput => {
                if (salaryInput) {
                  return true;
                } else {
                  console.log('Please enter role salary!');
                  return false;
                }
              }
        },
        {
            type : "list",
            message: "Please select department",
            name :"dept",
            choices: selectDepartment()
        }
    ]).then(function(res){
        var sq = "select id from department where name = " + mysql.escape(res.dept);
        connection.query(sq, function (err, result) {
            if (err) throw err;
            //console.log(result);         

            connection.query("INSERT INTO role SET ?",
            {
                title :res.role_title,
                salary :res.role_salary,
                department_id:result[0].id
            },
            function (err, result) {
                if (err) throw err;
                
                empprompt();
            });
    });
        
    });
};


//Select roles
function selectEmpRole()
{
    const rolename = [];
    connection.query("select * from role;",
        function(err, results) {
            if (err) throw err;
            for(let i=0;i<results.length;i++)
            {
                rolename.push(results[i].title);
            }
            
        })
    return rolename;
};

//Select manager
function selectManager()
{
    const managername = ['none'];
    connection.query("select * from employee;",
        function(err, results) {
            if (err) throw err;
            for(let i=0;i<results.length;i++)
            {
                let empname = results[i].first_name+' '+results[i].last_name;
                managername.push(empname);
            }
            
        })
    return managername;
};


//Add new employee
function addEmployee()
{
    inquirer.prompt([
        {
            type :"input",
            message :"Please enter first name: ",
            name : "firstname",
            validate: firstInput => {
                if (firstInput) {
                  return true;
                } else {
                  console.log('Please enter first name!');
                  return false;
                }
              }
        },
        {
            type :"input",
            message :"Please enter last name: ",
            name : "lastname",
            validate: lastInput => {
                if (lastInput) {
                  return true;
                } else {
                  console.log('Please enter last name!');
                  return false;
                }
              }
        },
        {
            type : "list",
            message: "Please select employee role: ",
            name :"emprole",
            choices: selectEmpRole()
        },
        {
            type : "list",
            message : "Please select employee manager: ",
            name : "empmanager",
            choices : selectManager()
        }

        ]).then(function(res){
            var roleid;
            var mgrid;
            var sq = "select id from role where title = " + mysql.escape(res.emprole); 
            connection.query(sq, function (err, result) {
                if (err) throw err;
                roleid = result[0].id;
               // console.log(roleid);
               
                if(res.empmanager !=='none')
                {
                    var sqmg = "select id from employee where CONCAT(first_name,' ',last_name) = " + mysql.escape(res.empmanager); 
                    connection.query(sqmg, function (err, result) {
                            if (err) throw err;
                            mgrid = result[0].id;
                           // console.log(mgrid);
                           connection.query("INSERT INTO employee SET ?",
                            {
                                first_name :res.firstname,
                                last_name :res.lastname,
                                role_id:roleid,
                                manager_id : mgrid
                            },
                            function (err, result) {
                                if (err) throw err;
                                console.log("");
                                console.log("----------------------------------------------------");
                                console.log(chalk.yellow("     Number of records inserted: ")+ result.affectedRows);
                                console.log("----------------------------------------------------");
                                console.log("");
                                empprompt();
                            });
                        });
                }
                else
                {   mgrid = null;
                  connection.query("INSERT INTO employee SET ?",
                    {
                        first_name :res.firstname,
                        last_name :res.lastname,
                        role_id :roleid,
                        manager_id : mgrid
                    },
                    function (err, result) {
                        if (err) throw err;
                        console.log("");
                        console.log("----------------------------------------------------");
                        console.log(chalk.yellow("     Number of records inserted: ") + result.affectedRows);
                        console.log("----------------------------------------------------");
                        console.log("");
                        empprompt();
                    });
                }
                });
                       
        });     
           
};


//retuen all employess first and last name

function selectEmployee() {
    var empArr = [];
    connection.query("select * from employee;",
        function(err, results) {
            if (err) throw err;
            for(let i=0;i<results.length;i++)
            {
                let empname = results[i].first_name+' '+results[i].last_name;
                empArr.push(empname);
            }
            
        })
    return empArr;
};

//Update employee role
function updateEmployeeRole()
{   var empArr = [];
  connection.query("select * from employee;",
        function(err, results) 
        {
            if (err) throw err;             
        
    inquirer.prompt([  
        {
            type : "list",
            message : "Please select employee: ",
            name : "employeename",
            choices :function(){
                for(let i=0;i<results.length;i++)
                {
                    let empname = results[i].first_name+' '+results[i].last_name;
                    empArr.push(empname);
                }     
                return empArr;
            }
        },
        {
            type : "list",
            message: "Please select employee role: ",
            name :"employeerole",
            choices: selectEmpRole()
        }           
        ]).then(function(res){
            var sq = "select id from employee where CONCAT(first_name,' ',last_name) = " + mysql.escape(res.employeename); 
            connection.query(sq, function (err, result) {
                if (err) throw err;
                var empid = result[0].id;
               // console.log(empid);
                 var sqrole = "select id from role where title = " + mysql.escape(res.employeerole); 
                 connection.query(sqrole, function (err, result) {
                    if (err) throw err;
                    var roleid = result[0].id;
                   // console.log(roleid);
                   connection.query("UPDATE employee set ? where ? ",
                    [
                        {
                            role_id :roleid
                        },
                        {
                            id : empid
                        }
                    ], 
                    function (err,result) {
                        if (err) throw err;
                        console.log("");
                        console.log("----------------------------------------------------");
                        console.log(chalk.yellow("     Number of records updated: ") + result.affectedRows);
                        console.log("----------------------------------------------------");
                        console.log("");
                        empprompt();
                    });

                });

            });

        });
    });
};


// // requiring connection to make query
// const inquirer = require("inquirer");
// const logo = require("asciirt-logo");
// const callTable = require("console.table");
// const connection = require("./config/connection");
// const {
//   insertDepartment,
//   insertRole,
//   insertEmployee,
//   viewDepartments,
//   viewEmployee,
//   viewRole,
//   changeEmployee,
// } = require("./queries");



// // inquirer prompts

// function init() {

//     inquirer.prompt([
//         {

//             name: "menu",
//             type: "list",
//             message: "Please choose from the list",
//             choices: ["View all Departments",
//                 "View all Roles",
//                 "View all Employees",
//                 "Add a Department",
//                 "Add a Role",
//                 "Add an Employee",
//                 "Update an Employee Role"]

//         }
//     ]).then(res => {
//         switch (res.menu)
//         // Change to match read me
//         {
//             case "View all Departments":
//                 viewDepartments();
//                 break;
//             case "View all Roles":
//                 viewRoles();
//                 break;
//             case "View all Employees":
//                 viewEmployees();
//                 break;
//             case "Add a Department":
//                 addDepartment();
//                 break;
//             case "Add a Role":
//                 addRole();
//                 break;
//             case "Add an Employee":
//                 addEmployee();
//                 break;
//             case "Update an Employee Role":
//                 updateEmployee();
//                 break;


//         }




//     }); // accept responses from the prompt...run a if depending on selection call function selected



// }

// // Function for view deprtament

// // View all Departments
// //View all departments
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



// init()
