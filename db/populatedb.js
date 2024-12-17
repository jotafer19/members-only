const {Client} = require("pg")
require("dotenv").config()

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_status BOOLEAN DEFAULT false,
    admin_status BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    text TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
`

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