CREATE TABLE IF NOT EXISTS situations (
    id_situation INT AUTO_INCREMENT PRIMARY KEY,
    situationName VARCHAR(25) NOT NULL
);

INSERT INTO situations (situationName) VALUES ('To do'), ('In progress'), ('Done');

CREATE TABLE IF NOT EXISTS tasks (
    id_task INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    done_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	situation_id INT,    
    FOREIGN KEY (situation_id) REFERENCES situations(id_situation)
);