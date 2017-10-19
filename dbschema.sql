CREATE DATABASE IF NOT EXISTS game;
USE game;
CREATE TABLE IF NOT EXISTS scores
	(username varchar(20) NOT NULL, score BIGINT, time varchar(30), primary key(username));
-- Enter some sample data --
INSERT INTO scores(username, score, time) VALUES ('user1', 10, '2017-10-19T20:02:44.386Z');
INSERT INTO scores(username, score, time) VALUES ('user2', 20, '2017-10-19T20:03:02.289Z');
INSERT INTO scores(username, score, time) VALUES ('user3', 30, '2017-10-19T20:03:25.176Z');
COMMIT;
