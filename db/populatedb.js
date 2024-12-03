const {Client} = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    membership_status VARCHAR(50) DEFAULT 'inactive'
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    text TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users(first_name, last_name, username, password)
VALUES
('Alice', 'Smith', 'alice.smith@example.com', 'hashedpassword1'),
('Bob', 'Johnson', 'bob.johnson@example.com', 'hashedpassword2'),
('Charlie', 'Brown', 'charlie.brown@example.com', 'hashedpassword3');

INSERT INTO Messages(title, text, user_id)
VALUES
('Hello World', 'This is my first message!', 1),
('Exciting News', 'I just upgraded to a premium account!', 2),
('Goodbye', 'I am leaving for a while.', 3),
('Holiday Plans', 'Looking forward to the holidays!', 1);
`
require("dotenv").config()
async function main() {
    console.log("seeding...")
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    })

    await client.connect()
    await client.query(SQL)
    await client.end()

    console.log("done")
}

main()