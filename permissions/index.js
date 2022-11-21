const db = require('../models')
const User = db.user
const Role = db.role
const Task = db.task

function canViewTask(User, Task) {
    return {
        User
    }
}