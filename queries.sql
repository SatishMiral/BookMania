CREATE TABLE collections(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT
);

INSERT INTO collections
VALUES ('millionare fastlane','mj Demarco','best book to get you started with financial freedom');
