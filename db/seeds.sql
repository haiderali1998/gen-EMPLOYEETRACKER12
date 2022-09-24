USE employee_tracker;
INSERT INTO department (name) VALUES ("Sales"), ("Finance"), ("Engineer"), ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 12000, 1), ("Accountant", 15000, 2), ("Lead Engineer", 19000, 3), ("Lawyer", 20000, 4), ("Salesperson", 1000, 1), ("Account Manager", 25000, 2), ("Software Engineer", 30000, 3), ("Legal Team Lead", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Haider", "Ali", 1, 11, ("John", "Smith", 2, 12), ("Bob", "Williams", 3, 13), ("Jane", "Gold", 4, 14);

