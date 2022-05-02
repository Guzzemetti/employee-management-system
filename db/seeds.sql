USE employees_db;

INSERT INTO departments
    (name)
VALUES
    ("Human Resources"),
    ("Public Affairs"),
    ("Risk Management"),
    ("Sustainability");
    
INSERT INTO roles
    (title, salary, departments_id)
VALUES
    ("Associate Relations Coordinator", 75000, 1),
    ("Community Relations Manager", 80000, 2),
    ("Claims Adjuster", 55000, 3),
    ("Sustainability Coordinator", 40000, 4);

INSERT INTO employees
    (first_name, last_name, roles_id)
VALUES
    ("Billy", "Thorton", 1)
    ("Joe", "Schmoe", 2)
    ("Miranda", "Keys", 3)
    ("Sargeant", "Johnson", 4);
 