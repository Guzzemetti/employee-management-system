// Need to make helper functions in separate files
const helpers = require("./helpers/dbHelpers");
const mysql = require("mysql2");
const { prompt } = require("inquirer");
// const db = require("./db");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Winnie1285",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
});

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// Initial prompt, requiring users to select what functions they wish to perform
function mainMenu() {
    prompt([
        {
            type: "list",
            name: "initialChoice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View Departments",
                    value: "View_Departments"
                },
                {
                    name: "View Roles",
                    value: "View_Roles"
                },
                {
                    name: "Add Employee",
                    value: "Add_Employee"
                },
                {
                    name: "Add Department",
                    value: "Add_Department"
                },
                {
                    name: "Update Employee Role",
                    value: "Update_Role"
                },
                {
                    name: "Quit",
                    value: "Quit"
                }
            ]
            
        }
    ]
    ).then(res => {
        // The below swtich case checks the selected answer to the above prompt, based on the value of the selected, it initiates the appropriate function
        switch (res.initialChoice) {
            case "VIEW_EMPLOYEES":
                viewEmployee();
                break;
            case "View_Departments":
                viewDepartment();
                break;
            case "View_Roles":
                viewRoles();
                break;
            case "Add_Employee":
                addEmployee();
                break;
            case "Add_Department":
                addDepartment();
                break;
            case "Update_Role":
                updateRole();
                break;
            case "Quit":
                quit();
                break;
        }
    }
    )
};

// TODO: Add managers to employee list to display in this function
function viewEmployee(){
    console.log("\n")
    connection.query('SELECT employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Title", roles.salary AS "Salary" FROM employees JOIN roles ON employees.role_id = roles.id', (err, results) => {
            if(err){
                console.log(err);
            }
            console.log("\n")
            console.table(results)
        }
    );
    mainMenu();
};

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewDepartment(){

};

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles(){
    
};

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

function addEmployee(){
    prompt([
        {
            type: "input",
            name: "firstName",
            message: "Please enter the new associates's First name:"
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the associate's Last Name:"
        }
    ]).then(addDepartment())
};

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment(){
    prompt([
        {
            type: "list",
            name: "departmentList",
            message: "Please select the department this associate works with:",
            choices: ["Human Resources", "Public Affairs", "Risk Management", "Sustainability", "Add Department"]
        }
    ]).then(updateRole())
};

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateRole(){
    prompt([
        {
            type: "list",
            name: "roleList",
            message: "Please select the associate's role:",
            choices: ["Associate Relations Coordinator", "Community Relations Manager", "Claims Adjuster", "Sustainability Coordinator", "Add Role"]
        }
    ]).then(mainMenu())
};

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// NEED ADD ROLE FUNCTION


function quit() {
    console.log("Byeeeeee");
    process.exit();
};


mainMenu();