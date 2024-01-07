CREATE TABLE IF NOT EXISTS situations (
    id_situation INT AUTO_INCREMENT PRIMARY KEY,
    situationName VARCHAR(25) NOT NULL
);

INSERT INTO situations (situationName) VALUES ('To do'), ('In progress'), ('Done');

CREATE TABLE IF NOT EXISTS categories (
    id_category INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(25) NOT NULL
);

INSERT INTO categories (categoryName) VALUES ('Work'), ('School'), ('Home');

CREATE TABLE IF NOT EXISTS priorities (
    id_priority INT AUTO_INCREMENT PRIMARY KEY,
    priorityName VARCHAR(10) NOT NULL
);

INSERT INTO priorities (priorityName) VALUES ('High'), ('Medium'), ('Low');

CREATE TABLE IF NOT EXISTS tasks (
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    details VARCHAR(255),
    deadline DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    done_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	situation_id INT,
    category_id INT,
    priority_id INT,
    FOREIGN KEY (situation_id) REFERENCES situations(id_situation),
    FOREIGN KEY (category_id) REFERENCES categories(id_category),
    FOREIGN KEY (priority_id) REFERENCES priorities(id_priority)
);