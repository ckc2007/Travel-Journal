DROP DATABASE IF EXISTS journal_db;
CREATE DATABASE journal_db;

-- CREATE TABLE Comments (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   comments VARCHAR(255),
--   user_id INT,
--   story_id INT,
--   FOREIGN KEY (user_id) REFERENCES Users(id),
--   FOREIGN KEY (story_id) REFERENCES Stories(id)
-- );