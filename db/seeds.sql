USE employee_tracker;
INSERT INTO department (name) VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 1000, 1), ("Sales Lead", 1000, 2), ("Sales Lead", 1000, 3), ("Sales Lead", 1000, 4), ("Sales Lead", 1000, 1), ("Sales Lead", 1000, 2), ("Sales Lead", 1000, 3), ("Sales Lead", 1000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Haider", "Ali", 1, 1), ("Haider", "Ali", 1, 1), ("Haider", "Ali", 1, 1), ("Haider", "Ali", 1, 1);

