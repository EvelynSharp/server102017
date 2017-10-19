CREATE DATABASE IF NOT EXISTS game;
USE game;
CREATE TABLE IF NOT EXISTS scores
	(username varchar(20) NOT NULL, score BIGINT, time datetime, primary key(username));
-- Enter some sample data --
INSERT INTO scores(username, score, time) VALUES ('user1', 10, NOW());
INSERT INTO scores(username, score, time) VALUES ('user2', 20, NOW());
INSERT INTO scores(username, score, time) VALUES ('user3', 30, NOW());
COMMIT;
