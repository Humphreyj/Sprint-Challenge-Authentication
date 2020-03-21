const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

async function addUser(user) {
    user.password = await bcrypt.hash(user.password, 14)
    const [id] = await db('users').insert(user)

    return findById(id)
}

function findById(id) {
    return db("users")
            .select('username', 'password')
            .where('id', id)
            .first()
}

function findBy(filter) {
    return db('users')
    .select('id','username', 'password')
    .where(filter)
}

module.exports = {
    addUser,
    findById,
    findBy
}