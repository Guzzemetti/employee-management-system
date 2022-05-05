const helpers = require("./helpers/dbHelpers");
const mysql = require("mysql2");
const { prompt } = require("inquirer");
const art = require("./helpers/dbHelpers");
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

// ascii art for app title
console.log(art)

// Initial prompt, prompting users with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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
                    name: "Add Role",
                    value: "Add_Role"
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
            case "Add_Role":
                addRole();
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
// Function that displays all employees, their names, titles, departments and salaries
function viewEmployee() {
    console.log("\n")
    connection.query('SELECT employees.id AS "ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Title", roles.salary AS "Salary" FROM employees JOIN roles ON employees.role_id = roles.id', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log("\n")
        console.table(results)
        console.log("\n")
    }
    );
    mainMenu();
};

// Function that presents user with a formatted table showing department names and department ids
function viewDepartment() {
    console.log("\n")
    connection.query('SELECT departments.name AS "Department Name", departments.id AS "Department ID" FROM  departments ORDER BY id ASC', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log("\n")
        console.table(results)
        console.log("\n")
    }
    );
    mainMenu();
};

// Function that presents users with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
    console.log("\n")
    connection.query('SELECT roles.id AS "Role ID", roles.title AS "Job Title", departments.name AS "Department", roles.salary AS "Salary" FROM roles JOIN departments ON roles.departments_id = departments.id ORDER BY roles.id ASC', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log("\n")
        console.table(results)
        console.log("\n")
    }
    );
    mainMenu();
};

// Function that promps the user to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
    let roleList = connection.query('SELECT * FROM roles', (err, answers) => {
        if (err) throw err;
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
            },
            {
                type: "list",
                name: "role",
                message: "Please select this associate's job title:",
                choices:
                    answers.map((roleList) => {
                        return {
                            name: roleList.title,
                            value: roleList.id
                        }
                    })
            }
        ]).then(answers => {
            connection.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ("${answers.firstName}", "${answers.lastName}", ${answers.role})`)
            console.log("Employee added successfully!")
            mainMenu()
        });
    })
};

// Function that prompts the user to enter the name of the department and that department is added to the database
function addDepartment() {
    prompt([
        {
            type: "input",
            name: "addDept",
            message: "Please type the name of the department you wish to add:",
        }
    ]).then((answers) => {
        let newDept = answers.addDept;
        connection.query(`INSERT INTO departments (name) VALUES ("${newDept}")`),
            console.log("Department added successfully!")
        mainMenu()
    });
};
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateRole() {
    let roleList = connection.query('SELECT * FROM roles', (err, answers) => {
        if (err) throw err;
        prompt([
            {
                type: "input",
                name: "empId",
                message: "Please enter the ID of the associate you wish to update:",
            },
            {
                type: "list",
                name: "newRole",
                message: "Please select this associate's new role:",
                choices:
                    answers.map((roleList) => {
                        return {
                            name: roleList.title,
                            value: roleList.id
                        }
                    })
            }
        ]).then((answers) => {
        let newRole = answers.newRole;
        let empID = answers.empId;
        connection.query(`UPDATE employees SET role_id = "${newRole}" WHERE id = ${empID}`)
        console.log("Employee updated successfully!")
        mainMenu()
    });
    });
};

// Function that prompts users to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    let deptList = connection.query('SELECT * FROM departments', (err, answers) => {
        if (err) throw err;
            prompt([
                {
                    type: "input",
                    name: "addRole",
                    message: "Please enter the Job Title you wish to add:"
                },
                {
                    type: "list",
                    name: "deptNum",
                    message: "Please select the Department that this role belongs to:",
                    choices: 
                        answers.map((deptList) => {
                            return {
                                name: deptList.name,
                                value: deptList.id
                            }
                        })
                },
                {
                    type: "number",
                    name: "addSalary",
                    message: "Please enter the Salary amount for this role:"
                }
            ]).then((answers) => {
                let newRole = answers.addRole;
                let newSalary = answers.addSalary;
                let deptID = answers.deptNum;
                connection.query(`INSERT INTO roles (title, salary, departments_id) VALUES ("${newRole}", ${newSalary}, ${deptID})`),
                console.log("Role added successfully!")
                mainMenu();
        })
    })
};




function quit() {
    console.log("Byeeeeee");
    process.exit();
};


mainMenu();