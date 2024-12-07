const pool = require("./pool")

async function getAllMessages() {
    const {rows} = await pool.query("SELECT u.first_name, u.last_name, m.title, m.text, m.date FROM users u JOIN messages m ON u.id = m.user_id ORDER BY m.date DESC")
    return rows;
}

async function addNewUser({firstName, lastName, username, password}) {
    await pool.query("INSERT INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, password])
}

async function addNewMessage(userId, {title, text}) {
    await pool.query("INSERT INTO messages(user_id, title, text) VALUES ($1, $2, $3)", [userId, title, text])
}

async function deleteMessage(messageId) {
    await pool.query("DELETE FROM messages WHERE id = ($1)", [messageId])
}

async function getAllEmails() {
    const { rows } = await pool.query("SELECT username FROM users;")
    return rows;
}

async function getUserByEmail(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    return rows[0];
}

async function getUserById(userId) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [userId])
    return rows[0];
}

module.exports = {
    getAllMessages,
    addNewUser,
    addNewMessage,
    deleteMessage,
    getAllEmails,
    getUserByEmail,
    getUserById
}