const pool = require("./pool")

async function getAllMessages() {
    const {rows} = await pool.query("SELECT u.first_name, u.last_name, m.id AS message_id, m.title, m.text, m.date, m.user_id FROM users u JOIN messages m ON u.id = m.user_id ORDER BY m.date DESC")
    return rows;
}

async function addNewUser({firstName, lastName, username, password}) {
    await pool.query("INSERT INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, password])
}

async function addNewMessage(title, text, userId ) {
    await pool.query("INSERT INTO messages(title, text, user_id) VALUES ($1, $2, $3)", [title, text, userId])
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

async function upgradeMembership(user) {
    await pool.query("UPDATE users SET membership_status = true WHERE id = $1", [user.id])
}

async function upgradeAdmin(user) {
    await pool.query("UPDATE users SET membership_status = true, admin_status = true WHERE id = $1", [user.id])
}

async function getMessagesByUser(userId) {
    const {rows} = await pool.query("SELECT u.first_name, u.last_name, m.id AS message_id, m.title, m.text, m.date, m.user_id FROM users u JOIN messages m ON u.id = m.user_id WHERE m.user_id = $1", [userId])
    return rows;
}

module.exports = {
    getAllMessages,
    addNewUser,
    addNewMessage,
    deleteMessage,
    getAllEmails,
    getUserByEmail,
    getUserById,
    upgradeMembership,
    upgradeAdmin,
    getMessagesByUser
}