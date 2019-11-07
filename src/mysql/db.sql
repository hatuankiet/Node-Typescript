CREATE DATABASE node_mysql_ts;


CREATE TABLE posts(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description text NOT NULL,
    image_url TEXT,
    create_at TIME
)