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
    ]).then(res => {
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

function viewEmployee(){
    connection.query('SELECT * FROM employees_db.employees', (err, results) => {
            if(err){
                console.log(err);
            }
            console.table(results)
        }
    );
    mainMenu();
};

function viewDepartment(){

};

function viewRoles(){
    
};

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



function quit() {
    console.log("Byeeeeee");
    process.exit;
};


mainMenu();