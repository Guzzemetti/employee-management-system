const mysql = require("mysql2");
const { prompt } = require("inquirer");
// const db = require("./db");
require("console.table");

const connection = mysql.createconnection({
    host: "localhost",
    user: "root",
    password: "Winnie1285",
    database: "employees"
});

connection.connect(function (err){
    if (err) throw err;
});

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
                    value: "View_Employees"
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
    ]) .then(res => {
        // The below swtich case checks the selected answer to the above prompt, based on the value of the selected, it initiates the appropriate function
        switch(res.choice) {
            case "View_Employees":
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
    })

};


function viewEmployee();

function viewDepartment();

function viewRoles();

function addEmployee();

function addDepartment();

function updateRole();



function quit() {
    console.log("Byeeeeee");
    process.exit;
};


mainMenu();