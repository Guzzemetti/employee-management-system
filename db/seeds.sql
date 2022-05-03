USE employees_db;

INSERT INTO departments
    (name)
VALUES
    ("Human Resources"),
    ("Public Affairs"),
    ("Risk Management"),
    ("Sustainability"),
    ("Corporate Quality Assurance");
    
INSERT INTO roles
    (title, salary, departments_id)
VALUES
    ("Associate Relations Coordinator", 75000, 1),
    ("Community Relations Manager", 80000, 2),
    ("Claims Adjuster", 55000, 3),
    ("Sustainability Coordinator", 40000, 4),
    ("Lawyer", 78000, 3),
    ("Customer Care Coordinator", 42000, 2),
    ("Quality Assurance Analyst", 47000, 5),
    ("Retail Associate Relations Specialist", 85000, 1),
    ("Sustainability Surveyor", 54000, 4);

INSERT INTO employees
    (first_name, last_name, role_id)
VALUES
    ("Billy", "Thorton", 1),
    ("Joe", "Schmoe", 2),
    ("Miranda", "Keys", 3),
    ("Sargeant", "Johnson", 4),
    ("John", "Halo", 9),
    ("Jennifer", "Goldie", 4),
    ("Madre", "Stacy", 8),
    ("Moshe", "Burr", 5),
    ("Carrie", "Oversalt", 7),
    ("Seth", "Ferrel", 3),
    ("Steve", "Martin", 6),
    ("Will", "Rogan", 5);